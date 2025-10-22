import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Illustration from '../Illustration';
import CTAButton from '../CTAButton';
import { clariPhotos, getRetreatImage } from '../../utils/imageHelpers';

const RetreatsSection = ({ activeRetreats, pastRetreats }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Obtener imágenes para el fondo (priorizar retiros pasados, luego activos)
  const getBackgroundImages = () => {
    let images = [];

    // Primero intentar con retiros pasados
    if (pastRetreats && pastRetreats.length > 0) {
      pastRetreats.forEach(retreat => {
        if (retreat.images && retreat.images.length > 0) {
          // Agregar hasta 2 imágenes por retiro pasado
          images.push(...retreat.images.slice(0, 2));
        }
      });
    }

    // Si no hay suficientes, agregar de retiros activos
    if (images.length < 3 && activeRetreats && activeRetreats.length > 0) {
      activeRetreats.forEach(retreat => {
        if (retreat.images && retreat.images.length > 0 && images.length < 6) {
          images.push(...retreat.images.slice(0, 2));
        }
      });
    }

    // Fallback a fotos de Clarisa si no hay suficientes
    if (images.length === 0) {
      images = clariPhotos.slice(0, 3);
    }

    return images;
  };

  const backgroundImages = getBackgroundImages();

  const formatLocation = (loc) => {
    if (!loc) return 'Por confirmar';
    if (typeof loc === 'string') return loc;
    try {
      const { name, city, state, country, address } = loc || {};
      const parts = [name, city, state, country].filter(Boolean);
      if (parts.length > 0) return parts.join(', ');
      if (address) return address;
      return 'Por confirmar';
    } catch {
      return 'Por confirmar';
    }
  };

  // Efecto para cambiar imágenes automáticamente
  useEffect(() => {
    if (backgroundImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
      }, 4000); // Cambiar cada 4 segundos

      return () => clearInterval(interval);
    }
  }, [backgroundImages.length]);
  const handleContactClick = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="retiros" className="retreats-section py-5" style={{ backgroundColor: 'var(--color-background)' }}>
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <div className="d-flex justify-content-center align-items-center mb-3">

              <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.25rem)' }}>Mis retiros</h2>

            </div>
            <div className="mt-4 mb-4">
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: 'var(--color-text)',
                fontStyle: 'italic',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                Cada ser humano lleva dentro la semilla de su propia transformación.
                Los retiros son una invitación a detenernos, salir del ruido cotidiano y abrir un espacio de escucha profunda.
              </p>
            </div>
            <blockquote className="text-center mt-4 mb-4" style={{
              fontSize: '1.4rem',
              fontFamily: 'var(--font-family-heading)',
              fontStyle: 'italic',
              color: 'var(--color-primary)',
              fontWeight: '300',
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '2rem auto',
              padding: '1.5rem',
              position: 'relative'
            }}>
              <span style={{
                fontSize: '2rem',
                color: 'var(--color-secondary)',
                opacity: 0.7,
                position: 'absolute',
                left: '-10px',
                top: '-10px'
              }}>"</span>
              No buscamos escapar de la vida, sino volver a ella con más claridad, sentido, presencia y amor.
              <span style={{
                fontSize: '2rem',
                color: 'var(--color-secondary)',
                opacity: 0.7,
                position: 'absolute',
                right: '-10px',
                bottom: '-20px'
              }}>"</span>
            </blockquote>

            {/* Sección DESCUBRE TU BRILLO con fondo de imágenes */}
            <div className="text-center mt-5 mb-5" style={{
              borderRadius: '20px',
              padding: '4rem 2rem',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Fondo de imágenes que cambian */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1
              }}>
                {backgroundImages.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: `url(${getRetreatImage(image, index, 'large')})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: index === currentImageIndex ? 1 : 0,
                      transition: 'opacity 1.5s ease-in-out',
                      borderRadius: '20px'
                    }}
                  />
                ))}
              </div>

              {/* Overlay para contraste */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(67, 48, 74, 0.7) 0%, rgba(129, 83, 111, 0.6) 50%, rgba(235, 190, 111, 0.4) 100%)',
                borderRadius: '20px',
                zIndex: 2
              }}></div>
              {/* Ilustraciones decorativas */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: 'calc(50% )',
                animation: 'float 3s ease-in-out infinite',
                zIndex: 3
              }}>
                <Illustration
                  name="estrella-esperanza"
                  alt="Estrella"
                  style={{ width: '40px', opacity: 0.6 }}
                  color="gold"
                />
              </div>


              {/* Contenido principal */}
              <div style={{
                position: 'relative',
                zIndex: 4
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '3rem',
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  textShadow: '0 4px 8px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
                  animation: 'fadeInUp 1s ease-out',
                  letterSpacing: '2px'
                }}>
                  DESCUBRE TU BRILLO
                </h2>

                <h3 style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '2rem',
                  color: 'var(--color-primary)',
                  fontWeight: '300',
                  fontStyle: 'italic',
                  animation: 'fadeInUp 1s ease-out 0.3s both',
                  textShadow: '0 3px 6px rgba(0,0,0,0.4)',
                  letterSpacing: '1px'
                }}>
                  BIENVENID@ A SOUL
                </h3>
              </div>
            </div>
          </Col>
        </Row>

        {activeRetreats && activeRetreats.length > 0 ? (
          <Row className="g-4">
            {activeRetreats.slice(0, 3).map((retreat) => (
              <Col key={retreat._id} md={4}>
                <Card className="h-100 shadow-sm">
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <Link to={`/retreats/${retreat.slug || retreat._id}`}>
                      <img
                        src={getRetreatImage(retreat.images?.[0], 0, 'medium') || clariPhotos[0]}
                        alt={retreat.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Link>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      <Link to={`/retreats/${retreat.slug || retreat._id}`} className="text-decoration-none">
                        {retreat.title}
                      </Link>
                    </Card.Title>
                    <div className="mb-2">
                      {retreat.availableSpots === 0 ? (
                        <Badge bg="danger">Completo</Badge>
                      ) : retreat.availableSpots <= 3 ? (
                        <Badge bg="warning">¡Quedan {retreat.availableSpots}!</Badge>
                      ) : (
                        <Badge bg="success">Disponible</Badge>
                      )}
                    </div>
                    <Card.Text className="flex-grow-1">
                      {retreat.shortDescription || retreat.description?.substring(0, 100) + '...'}
                    </Card.Text>
                    <div className="mb-3">
                      <small className="text-muted">📅 {new Date(retreat.startDate).toLocaleDateString('es-ES')} - {new Date(retreat.endDate).toLocaleDateString('es-ES')}</small><br />
                      <small className="text-muted">📍 {formatLocation(retreat.location)}</small>
                    </div>
                    <Link
                      to={`/retreats/${retreat.slug || retreat._id}`}
                      className="btn btn-primary w-100"
                      style={{
                        backgroundColor: '#6B46C1',
                        border: 'none',
                        fontWeight: 700
                      }}
                    >
                      Reservar Mi Lugar
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <div className="py-5">
                <div className="mb-4" style={{ fontSize: '4rem', opacity: 0.3 }}>🧘‍♀️</div>
                <h3 className="mb-3">Próximamente nuevos retiros</h3>
                <p className="text-muted mb-4">
                  Estamos preparando experiencias únicas para ti. Mantente informado sobre nuestros próximos retiros.
                </p>
                <CTAButton
                  text="Mantente Informado"
                  icon="📬"
                  size="lg"
                />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default RetreatsSection;
