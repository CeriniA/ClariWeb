import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Badge, Carousel, ListGroup } from 'react-bootstrap';
import Button from '@/components/ui/Button';
import { retreatsAPI } from '../services/api';
import { clariPhotos } from '../utils/imageHelpers';
import { getRetreatStatus, getRetreatBadge, isPastRetreat } from '../utils/retreatHelpers';
import './RetreatDetailPage.css';
import LeadRegistrationForm from '../components/LeadRegistrationForm';
import { Helmet } from 'react-helmet-async';

const RetreatDetailPage = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [retreat, setRetreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRetreat();
  }, [id, slug]);

  const loadRetreat = async () => {
    try {
      setLoading(true);
      const identifier = id || slug;
      const response = await retreatsAPI.getById(identifier);
      setRetreat(response.data.data);
    } catch (err) {
      console.error('Error cargando retiro:', err);
      const f = err?.friendly;
      if (f) setError(`${f.title}: ${f.description}`);
      else if (err.response?.status === 404) setError('Retiro no encontrado');
      else setError('Error al cargar el retiro');
    } finally {
      setLoading(false);
    }
  };

  // Countdown to startDate: days and minutes remaining (hooks must be declared before any early return)
  const getRemaining = (target) => {
    const now = new Date().getTime();
    const t = target ? new Date(target).getTime() : 0;
    const diff = Math.max(0, t - now);
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;
    const second = 1000;
    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / hour);
    const minutes = Math.floor((diff % hour) / minute);
    const seconds = Math.floor((diff % minute) / second);
    return { days, hours, minutes, seconds, ms: diff };
  };

  const pad2 = (n) => String(n ?? 0).padStart(2, '0');

  const [remaining, setRemaining] = useState(() => getRemaining(retreat?.startDate));

  useEffect(() => {
    if (!retreat?.startDate) return;
    setRemaining(getRemaining(retreat.startDate));
    const id = setInterval(() => {
      setRemaining(getRemaining(retreat.startDate));
    }, 1000);
    return () => clearInterval(id);
  }, [retreat?.startDate]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateShort = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getRetreatImages = () => {
    return retreat?.images && retreat.images.length > 0 ? retreat.images : clariPhotos;
  };

  const handleInquiry = () => {
    const el = document.getElementById('consulta-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate(`/contacto?retiro=${retreat._id}`);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
        <p className="mt-2">Cargando retiro...</p>
      </Container>
    );
  }

  if (error || !retreat) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h4>¡Oops!</h4>
          <p>{error || 'No se pudo cargar el retiro'}</p>
          <Button to="/#retiros" variant="primary">
            Volver a Retiros
          </Button>
        </Alert>
      </Container>
    );
  }

  const images = getRetreatImages();
  const past = isPastRetreat(retreat);
  const status = getRetreatStatus(retreat);
  const badge = getRetreatBadge(retreat);


  return (
    <div className="retreat-detail-page">
      <Helmet>
        <title>{retreat.title} | Soul Experiences</title>
        <meta name="description" content={retreat.shortDescription || retreat.description?.substring(0, 160)} />
        <link rel="canonical" href={`${window.location.origin}/retreats/${retreat.slug || retreat._id}`} />
      </Helmet>
      {/* Hero Section con imágenes */}
      <section className="retreat-hero">
        <div className="retreat-hero-images">
          <Carousel fade interval={5000} controls={false} indicators={false}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 retreat-hero-image"
                  src={image}
                  alt={`${retreat.title} - ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* <div className="retreat-hero-overlay"></div> */}

        <div className="retreat-hero-content">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center text-white">
                <Badge
                  bg={past ? 'secondary' : 'success'}
                  className="mb-3 px-3 py-2"
                  style={{ fontSize: '0.9rem' }}
                >
                  {past ? 'Experiencia Pasada' : 'Disponible Ahora'}
                </Badge>

                <h1 className="retreat-hero-title mb-4">
                  {retreat.title}
                </h1>

                <p className="retreat-hero-subtitle mb-4">
                  {retreat.shortDescription || retreat.description?.substring(0, 200) + '...'}
                </p>

                <div className="retreat-hero-info">
                  {/* <div className="retreat-hero-info-item">
                    <span className="icon">📅</span>
                    <div>
                      <small>Fechas</small>
                      <div>{formatDateShort(retreat.startDate)} - {formatDateShort(retreat.endDate)}</div>
                    </div>
                  </div>

                  <div className="retreat-hero-info-item">
                    <span className="icon">📍</span>
                    <div>
                      <small>Ubicación</small>
                      <div>{retreat.location?.name}</div>
                    </div>
                  </div> */}

                  <div className="retreat-hero-info-item text-center">
                    {past ? (
                      <>
                        <span className="icon">✨</span>
                        <div className="text-center">
                          <Badge bg={badge.variant} className="fs-6 px-3 py-2">
                            {badge.icon} {badge.text}
                          </Badge>
                          <div className="mt-2 text-white">
                            <small>
                              {formatDate(retreat.startDate)} - {formatDate(retreat.endDate)}
                            </small>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="icon">⏳</span>
                        <div className="text-center">
                          <small>Comienza en</small>
                          {remaining?.ms === 0 ? (
                            <div className="fw-bold">¡Comienza hoy!</div>
                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                marginTop: '6px'
                              }}
                            >
                              {[
                                { v: pad2(remaining?.days), l: 'días' },
                                { v: pad2(remaining?.hours), l: 'horas' },
                                { v: pad2(remaining?.minutes), l: 'min' },
                                { v: pad2(remaining?.seconds), l: 'seg' }
                              ].map((item, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    background: 'rgba(255,255,255,0.72)',
                                    border: '1px solid rgba(255,255,255,0.25)',
                                    borderRadius: '12px',
                                    padding: '8px 10px',
                                    minWidth: '64px',
                                    textAlign: 'center',
                                    backdropFilter: 'blur(6px)'
                                  }}
                                >
                                  <div style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1 }}>
                                    {item.v}
                                  </div>
                                  <div style={{ color: 'var(--color-primary)', fontSize: '0.7rem', opacity: 0.85 }}>{item.l}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="mt-2">
                            <Badge bg={badge.variant}>
                              {badge.icon} {badge.text}
                            </Badge>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Contenido Principal */}
      <Container className="py-5">
        <Row>
          {/* Columna Principal */}
          <Col lg={8}>
            {/* Descripción */}
            <Card className="retreat-section-card mb-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <h2 className="section-title mb-0">Sobre esta experiencia</h2>
                </div>
                <div className="retreat-description">
                  {retreat.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3">{paragraph}</p>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Qué incluye */}
            {retreat.includes && retreat.includes.length > 0 && (
              <Card className="retreat-section-card mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <h2 className="section-title mb-0">¿Qué incluye?</h2>
                  </div>
                  <ListGroup variant="flush">
                    {retreat.includes.map((item, index) => (
                      <ListGroup.Item key={index} className="border-0 px-0 py-2">
                        <span className="text-success me-2">✓</span>
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {/* Ubicación */}
            <Card className="retreat-section-card mb-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <h2 className="section-title mb-0">Ubicación</h2>
                </div>
                <div className="location-info">
                  <h5 className="mb-2">{retreat.location?.name}</h5>
                  <p className="text-muted mb-2">{retreat.location?.address}</p>
                  <p className="text-muted">
                    {retreat.location?.city}, {retreat.location?.state}, {retreat.location?.country}
                  </p>
                </div>
              </Card.Body>
            </Card>

            {retreat.targetAudience && retreat.targetAudience.length > 0 && (
              <Card className="retreat-section-card mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <h2 className="section-title mb-0">Este Retiro es para vos , si:</h2>
                  </div>
                  <ListGroup variant="flush">
                    {retreat.targetAudience.map((item, index) => (
                      <ListGroup.Item key={index} className="border-0 px-0 py-2">
                        <span className="text-primary me-2">•</span>
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {retreat.experiences && retreat.experiences.length > 0 && (
              <Card className="retreat-section-card mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <h2 className="section-title mb-0">Experiencias y actividades</h2>
                  </div>
                  <ListGroup variant="flush">
                    {retreat.experiences.map((item, index) => (
                      <ListGroup.Item key={index} className="border-0 px-0 py-2">
                        <span className="text-success me-2">✓</span>
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {retreat.notIncludes && retreat.notIncludes.length > 0 && (
              <Card className="retreat-section-card mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <h2 className="section-title mb-0">No incluye</h2>
                  </div>
                  <ListGroup variant="flush">
                    {retreat.notIncludes.map((item, index) => (
                      <ListGroup.Item key={index} className="border-0 px-0 py-2">
                        <span className="text-danger me-2">✗</span>
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {!past && retreat.pricingTiers && retreat.pricingTiers.length > 0 && (
              <Card className="retreat-section-card mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <h2 className="section-title mb-0">Precios escalonados</h2>
                  </div>
                  <ListGroup variant="flush">
                    {retreat.pricingTiers.map((tier, index) => (
                      <ListGroup.Item key={index} className="border-0 px-0 py-2">
                        <div className="d-flex justify-content-between flex-wrap gap-2">
                          <div>
                            <strong>{tier.name}</strong>
                            {tier.validUntil && (
                              <span className="text-muted ms-2">hasta {formatDateShort(tier.validUntil)}</span>
                            )}
                          </div>
                          {typeof tier.price === 'number' && (
                            <div className="text-primary fw-bold">
                              ${tier.price.toLocaleString()} {retreat.currency || 'ARS'}
                            </div>
                          )}
                        </div>
                        {tier.paymentOptions && tier.paymentOptions.length > 0 && (
                          <div className="text-muted small mt-1">{tier.paymentOptions.join(' · ')}</div>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {retreat.foodInfo && (retreat.foodInfo.foodType || retreat.foodInfo.description || (retreat.foodInfo.restrictions && retreat.foodInfo.restrictions.length > 0)) && (
              <Card className="retreat-section-card mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <h2 className="section-title mb-0">Alimentación</h2>
                  </div>
                  {retreat.foodInfo.foodType && (
                    <p className="mb-2"><strong>Tipo:</strong> {retreat.foodInfo.foodType}</p>
                  )}
                  {retreat.foodInfo.description && (
                    <p className="text-muted">{retreat.foodInfo.description}</p>
                  )}
                  {retreat.foodInfo.restrictions && retreat.foodInfo.restrictions.length > 0 && (
                    <div className="mt-2">
                      <strong>Restricciones:</strong>
                      <div className="text-muted">{retreat.foodInfo.restrictions.join(' · ')}</div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}

            {!past && retreat.policies && (
              <Card className="retreat-section-card mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <h2 className="section-title mb-0">Políticas</h2>
                  </div>
                  <ListGroup variant="flush">
                    {typeof retreat.policies.substanceFree === 'boolean' && (
                      <ListGroup.Item className="border-0 px-0 py-2">
                        <span className="text-primary me-2">•</span>
                        Espacio libre de sustancias: {retreat.policies.substanceFree ? 'Sí' : 'No'}
                      </ListGroup.Item>
                    )}
                    {retreat.policies.restrictions && retreat.policies.restrictions.length > 0 && (
                      <ListGroup.Item className="border-0 px-0 py-2">
                        <span className="text-primary me-2">•</span>
                        Restricciones: {retreat.policies.restrictions.join(' · ')}
                      </ListGroup.Item>
                    )}
                    {retreat.policies.cancellationPolicy && (
                      <ListGroup.Item className="border-0 px-0 py-2">
                        <span className="text-primary me-2">•</span>
                        Cancelación: {retreat.policies.cancellationPolicy}
                      </ListGroup.Item>
                    )}
                    {retreat.policies.additionalPolicies && retreat.policies.additionalPolicies.length > 0 && (
                      <ListGroup.Item className="border-0 px-0 py-2">
                        <span className="text-primary me-2">•</span>
                        Adicionales: {retreat.policies.additionalPolicies.join(' · ')}
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}

            {retreat.location && (retreat.location.features?.length > 0 || retreat.location.howToGetThere?.byBus || retreat.location.howToGetThere?.byCar || retreat.location.howToGetThere?.additionalInfo) && (
              <Card className="retreat-section-card mb-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <h2 className="section-title mb-0">Más del lugar</h2>
                  </div>
                  {retreat.location.features && retreat.location.features.length > 0 && (
                    <div className="mb-3">
                      <strong>Características:</strong>
                      <div className="text-muted">{retreat.location.features.join(' · ')}</div>
                    </div>
                  )}
                  {(retreat.location.howToGetThere?.byBus || retreat.location.howToGetThere?.byCar || retreat.location.howToGetThere?.additionalInfo) && (
                    <div className="mb-2">
                      <strong>Cómo llegar:</strong>
                      {retreat.location.howToGetThere?.byBus && (
                        <div className="text-muted">Bus: {retreat.location.howToGetThere.byBus}</div>
                      )}
                      {retreat.location.howToGetThere?.byCar && (
                        <div className="text-muted">Auto: {retreat.location.howToGetThere.byCar}</div>
                      )}
                      {retreat.location.howToGetThere?.additionalInfo && (
                        <div className="text-muted">Info: {retreat.location.howToGetThere.additionalInfo}</div>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <div className="retreat-sidebar">
              {/* Card de Reserva/Info */}
              <Card className="retreat-booking-card sticky-top mb-4">
                <Card.Body className="text-center">
                  {!past ? (
                    <>
                      <div className="price-section mb-4">
                        <div className="price-label">{retreat.activePricingTier ? 'Precio actual' : 'Precio por persona'}</div>
                        <div className="price-amount">
                          ${(
                            typeof retreat.effectivePrice === 'number' 
                              ? retreat.effectivePrice 
                              : retreat.price
                          )?.toLocaleString()}
                          <span className="price-currency">{retreat.currency || 'ARS'}</span>
                        </div>
                        {retreat.activePricingTier && (
                          <div className="text-muted small mt-1">
                            {(retreat.activePricingTier.name || 'Promoción')}{' '}
                            {retreat.activePricingTier.validUntil && (
                              <>hasta {formatDateShort(retreat.activePricingTier.validUntil)}</>
                            )}
                          </div>
                        )}
                        {retreat.activePricingTier && typeof retreat.price === 'number' && retreat.price !== retreat.effectivePrice && (
                          <div className="text-muted small">
                            Precio regular: <span style={{ textDecoration: 'line-through' }}>${retreat.price.toLocaleString()}</span> {retreat.currency || 'ARS'}
                          </div>
                        )}
                      </div>

                      <div className="availability-section mb-4">
                        <div className="availability-item">
                          <span className="availability-label">Duración</span>
                          <span className="availability-value">{retreat.durationDays} días</span>
                        </div>
                        <div className="availability-item">
                          <span className="availability-label">Capacidad</span>
                          <span className="availability-value">{retreat.maxParticipants} personas</span>
                        </div>
                        <div className="availability-item">
                          <span className="availability-label">Disponibles</span>
                          <span className={`availability-value ${retreat.availableSpots > 0 ? 'text-success' : 'text-danger'}`}>
                            {retreat.availableSpots} lugares
                            {retreat.availableSpots === 0 ? (
                              <Badge bg="danger" className="ms-2">Completo</Badge>
                            ) : retreat.availableSpots <= 3 ? (
                              <Badge bg="warning" className="ms-2">¡Quedan pocos!</Badge>
                            ) : null}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={handleInquiry}
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={retreat.availableSpots === 0}
                        icon={retreat.availableSpots > 0 ? '📝' : '❌'}
                        className="mb-3"
                      >
                        {retreat.availableSpots > 0 ? 'Consultar Disponibilidad' : 'Sin Cupos'}
                      </Button>

                      {retreat.whatsappNumber && (
                        <Button
                          href={`https://wa.me/${retreat.whatsappNumber}?text=${encodeURIComponent(`Hola! Me interesa el retiro "${retreat.title}"`)}`}
                          external
                          outline="success"
                          size="sm"
                          fullWidth
                          icon="💬"
                        >
                          Consultar por WhatsApp
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="past-retreat-info">
                        <div className="mb-3">
                          <h5 className="mb-3">Experiencia Completada</h5>
                          <p className="text-muted mb-4">
                            Este retiro se realizó del {formatDateShort(retreat.startDate)} al {formatDateShort(retreat.endDate)}.
                          </p>
                          <Button
                            to="/#testimonios"
                            outline="primary"
                            fullWidth
                            className="mb-2"
                          >
                            Ver Testimonios
                          </Button>
                          <Button
                            to="/#retiros"
                            variant="primary"
                            fullWidth
                          >
                            Ver Retiros Actuales
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>

              {/* Información adicional */}
              <Card className="retreat-info-card">
                <Card.Body>
                  <h5 className="mb-3">Información del Retiro</h5>
                  <div className="info-item">
                    <strong>Inicio:</strong>
                    <span>{formatDate(retreat.startDate)}</span>
                  </div>

                  <div className="info-item">
                    <strong>Finalización:</strong>
                    <span>{formatDate(retreat.endDate)}</span>
                  </div>

                  <div className="info-item">
                    <strong>Duración:</strong>
                    <span>{retreat.durationDays} días</span>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        {/* Sección de consulta / formulario */}
        {!past && (
          <Row className="mt-5">
            <Col lg={10} className="mx-auto">
              <Card className="retreat-section-card">
                <Card.Body>
                  <div id="consulta-form" className="mb-3">
                    <h2 className="section-title mb-3">¿Tenés dudas o querés reservar?</h2>
                    {retreat.isFull ? (
                      <Alert variant="warning" className="mb-4">
                        Este retiro está completo. Podés ver otros retiros o escribirnos por WhatsApp.
                        {retreat.whatsappNumber && (
                          <div className="mt-3">
                            <Button
                              href={`https://wa.me/${retreat.whatsappNumber}?text=Hola! Me interesa el retiro "${retreat.title}"`}
                              external
                              variant="success"
                              icon="💬"
                            >
                              Escribir por WhatsApp
                            </Button>
                          </div>
                        )}
                      </Alert>
                    ) : (
                      <LeadRegistrationForm retreatId={retreat._id} compact />
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Botón de volver */}
        <Row className="mt-5">
          <Col className="text-center">
            <Button to="/" outline="secondary" size="lg" icon="←">
              Volver
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RetreatDetailPage;
