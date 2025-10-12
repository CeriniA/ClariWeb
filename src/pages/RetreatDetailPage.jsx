import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Carousel, ListGroup } from 'react-bootstrap';
import { retreatsAPI } from '../services/api';
import { clariPhotos } from '../utils/imageHelpers';
import Illustration from '../components/Illustration';
import './RetreatDetailPage.css';

const RetreatDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [retreat, setRetreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRetreat();
  }, [id]);

  const loadRetreat = async () => {
    try {
      setLoading(true);
      const response = await retreatsAPI.getById(id);
      setRetreat(response.data.data);
    } catch (err) {
      console.error('Error cargando retiro:', err);
      if (err.response?.status === 404) {
        setError('Retiro no encontrado');
      } else {
        setError('Error al cargar el retiro');
      }
    } finally {
      setLoading(false);
    }
  };

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

  const isPastRetreat = () => {
    return retreat && new Date(retreat.endDate) < new Date();
  };

  const handleInquiry = () => {
    navigate(`/contacto?retiro=${retreat._id}`);
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
          <Button as={Link} to="/retiros" variant="primary">
            Volver a Retiros
          </Button>
        </Alert>
      </Container>
    );
  }

  const images = getRetreatImages();
  const past = isPastRetreat();

  return (
    <div className="retreat-detail-page">
      {/* Hero Section con imágenes */}
      <section className="retreat-hero">
        <div className="retreat-hero-images">
          <Carousel fade interval={5000} controls={true} indicators={true}>
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
        
        <div className="retreat-hero-overlay"></div>
        
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
                  <div className="retreat-hero-info-item">
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
                  </div>
                  
                  {!past && (
                    <div className="retreat-hero-info-item">
                      <span className="icon">💰</span>
                      <div>
                        <small>Precio</small>
                        <div className="text-warning fw-bold">
                          ${retreat.price?.toLocaleString()} ARS
                        </div>
                      </div>
                    </div>
                  )}
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
                  <Illustration
                    name="ojo-espiritual"
                    alt="Descripción"
                    style={{ width: '40px', marginRight: '15px' }}
                    color="primary"
                  />
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
                    <Illustration
                      name="estrella-guia"
                      alt="Incluye"
                      style={{ width: '40px', marginRight: '15px' }}
                      color="gold"
                    />
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
                  <Illustration
                    name="brote-esperanza"
                    alt="Ubicación"
                    style={{ width: '40px', marginRight: '15px' }}
                    color="primary"
                  />
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
                        <div className="price-label">Precio por persona</div>
                        <div className="price-amount">
                          ${retreat.price?.toLocaleString()}
                          <span className="price-currency">ARS</span>
                        </div>
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
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={handleInquiry}
                        variant="primary"
                        size="lg"
                        className="w-100 mb-3"
                        disabled={retreat.availableSpots === 0}
                      >
                        {retreat.availableSpots > 0 ? 'Reservar Plaza' : 'Lista de Espera'}
                      </Button>

                      {retreat.whatsappNumber && (
                        <Button
                          href={`https://wa.me/${retreat.whatsappNumber}?text=Hola! Me interesa el retiro "${retreat.title}"`}
                          target="_blank"
                          variant="outline-success"
                          size="sm"
                          className="w-100"
                        >
                          💬 Consultar por WhatsApp
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="past-retreat-info">
                        <div className="mb-3">
                          <Illustration
                            name="estrella-esperanza"
                            alt="Completado"
                            style={{ width: '60px' }}
                            color="secondary"
                          />
                        </div>
                        <h5 className="mb-3">Experiencia Completada</h5>
                        <p className="text-muted mb-4">
                          Este retiro se realizó del {formatDateShort(retreat.startDate)} al {formatDateShort(retreat.endDate)}.
                        </p>
                        <Button
                          as={Link}
                          to="/testimonios"
                          variant="outline-primary"
                          className="w-100 mb-2"
                        >
                          Ver Testimonios
                        </Button>
                        <Button
                          as={Link}
                          to="/retiros"
                          variant="primary"
                          className="w-100"
                        >
                          Ver Retiros Actuales
                        </Button>
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

        {/* Botón de volver */}
        <Row className="mt-5">
          <Col className="text-center">
            <Button as={Link} to="/retiros" variant="outline-secondary" size="lg">
              ← Volver a Retiros
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RetreatDetailPage;
