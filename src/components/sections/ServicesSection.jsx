import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Illustration from '../Illustration';
import CTAButton from '../CTAButton';
// Iconos de React Icons para un diseño limpio y moderno
import { 
  FaHeart, 
  FaLeaf, 
  FaSun, 
  FaOm, 
  FaMountain, 
  FaWater, 
  FaMusic, 
  FaDove 
} from 'react-icons/fa';
import { 
  GiMeditation, 
  GiLotusFlower, 
  GiSoundWaves 
} from 'react-icons/gi';

const ServicesSection = () => {
  // Video de fondo dividido - archivo en public/ se sirve desde raíz
  const videoUrl = "/soul-experiences.mp4"; // Archivo actual con doble extensión
  const hasVideo = true; // ACTIVADO con video optimizado
  
  // Conceptos principales con video único de fondo
  const mainConcepts = [
    {
      illustration: "ojo-espiritual",
      title: "AUTOCONOCIMIENTO",
      description: "Conecta con tu esencia más auténtica",
      color: "primary"
    },
    {
      illustration: "llama-interior",
      title: "SANACIÓN EMOCIONAL", 
      description: "Libera patrones y sana heridas del alma",
      color: "accent"
    },
    {
      illustration: "brote-esperanza",
      title: "RENOVACIÓN",
      description: "Renace con nueva energía y propósito",
      color: "secondary"
    }
  ];

  // Actividades y experiencias
  const activities = [
    { icon: <GiMeditation />, name: "YOGA", color: "var(--color-primary)" },
    { icon: <GiLotusFlower />, name: "MEDITACIÓN", color: "var(--color-secondary)" },
    { icon: <FaWater />, name: "TEMAZCAL", color: "var(--color-accent)" },
    { icon: <FaLeaf />, name: "CEREMONIA DE CACAO", color: "var(--color-primary)" },
    { icon: <FaOm />, name: "KIRTAN DE MANTRAS", color: "var(--color-secondary)" },
    { icon: <FaDove />, name: "BIODANZA", color: "var(--color-accent)" },
    { icon: <FaMountain />, name: "CAMINATAS", color: "var(--color-primary)" },
    { icon: <GiSoundWaves />, name: "BAÑO DE SONIDOS", color: "var(--color-secondary)" }
  ];

  return (
    <section className="services-section py-5" style={{ backgroundColor: '#ffffff' }}>
      <Container>
        {/* Título de la sección */}
        <Row className="text-center mb-5">
          <Col>
            <div className="d-flex justify-content-center align-items-center mb-4">
              <Illustration
                name="estrella-guia"
                alt="Estrella guía decorativa"
                style={{ width: '45px', marginRight: '12px' }}
                className="illustration-fade-in"
                color="gold"
              />
              <h2 style={{ 
                fontFamily: 'var(--font-family-heading)',
                color: 'var(--color-text)',
                margin: 0
              }}>
                ¿Qué encontrarás en mis retiros?
              </h2>
              <Illustration
                name="luna-fina"
                alt="Luna espiritual decorativa"
                style={{ width: '45px', marginLeft: '12px' }}
                className="illustration-fade-in"
                color="light"
              />
            </div>
          </Col>
        </Row>

        {/* Conceptos principales con video dividido */}
        <Row className="g-4 mb-5">
          {mainConcepts.map((concept, index) => (
            <Col key={index} md={4} className="text-center">
              <div className="concept-card h-100 p-4 d-flex flex-column justify-content-center align-items-center text-center" style={{
                background: 'transparent',
                borderRadius: '15px',
                border: `2px solid ${concept.color === 'primary' ? 'rgba(235, 190, 111, 0.6)' : 
                                     concept.color === 'accent' ? 'rgba(129, 83, 111, 0.6)' : 
                                     'rgba(117, 166, 168, 0.6)'}`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '350px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                const shadowColor = concept.color === 'primary' ? 'rgba(235, 190, 111, 0.3)' : 
                                   concept.color === 'accent' ? 'rgba(129, 83, 111, 0.3)' : 
                                   'rgba(117, 166, 168, 0.3)';
                e.currentTarget.style.boxShadow = `0 10px 25px ${shadowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                {/* Video de fondo dividido */}
                {hasVideo && (
                  <>
                    <video
                      src={videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '300%', // 3 veces el ancho para dividir en 3
                        height: '100%',
                        objectFit: 'cover',
                        transform: `translateX(-${index * 33.33}%)`, // Posiciona la parte del video
                        zIndex: 1,
                        filter: 'brightness(0.8) contrast(1.1)'
                      }}
                    />
                    
                    {/* Overlay de color */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: concept.color === 'primary' ? 'rgba(235, 190, 111, 0.7)' : 
                                 concept.color === 'accent' ? 'rgba(129, 83, 111, 0.7)' : 
                                 'rgba(117, 166, 168, 0.7)',
                      zIndex: 2
                    }}></div>
                  </>
                )}
                  
                  {/* Icono centrado */}
                  <div style={{
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: `${index * 0.5}s`,
                    marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
                    position: 'relative',
                    zIndex: 3
                  }}>
                    <Illustration
                      name={concept.illustration}
                      alt={concept.title}
                      style={{ 
                        width: 'clamp(50px, 8vw, 70px)',
                        maxWidth: '70px'
                      }}
                      color="white"
                      animate={true}
                    />
                  </div>
                  
                  {/* Título centrado */}
                  <h4 style={{
                    fontFamily: 'var(--font-family-heading)',
                    color: 'white',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    letterSpacing: '1px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                    textAlign: 'center',
                    lineHeight: '1.2',
                    position: 'relative',
                    zIndex: 3
                  }}>
                    {concept.title}
                  </h4>
                  
                  {/* Descripción centrada */}
                  <p style={{
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    lineHeight: '1.5',
                    fontStyle: 'italic',
                    textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                    textAlign: 'center',
                    margin: 0,
                    maxWidth: '250px',
                    position: 'relative',
                    zIndex: 3
                  }}>
                    {concept.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>

        {/* Separador visual */}
        <Row className="text-center mb-4">
          <Col>
            <div style={{
              width: '100px',
              height: '2px',
              background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              margin: '0 auto',
              borderRadius: '1px'
            }}></div>
          </Col>
        </Row>

        {/* Actividades y experiencias */}
        <Row className="text-center mb-4">
          <Col>
            <h3 style={{
              fontFamily: 'var(--font-family-heading)',
              color: 'var(--color-secondary)',
              fontSize: '1.5rem',
              fontWeight: '300',
              fontStyle: 'italic',
              marginBottom: '2rem'
            }}>
              Experiencias que transforman
            </h3>
          </Col>
        </Row>

        <Row className="g-3">
          {activities.map((activity, index) => (
            <Col key={index} lg={3} md={4} sm={6} className="text-center">
              <div className="activity-item p-3" style={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                border: '1px solid rgba(117, 166, 168, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(117, 166, 168, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = 'var(--color-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'rgba(117, 166, 168, 0.2)';
              }}>
                <div style={{
                  fontSize: '2rem',
                  color: activity.color,
                  marginBottom: '0.5rem'
                }}>
                  {activity.icon}
                </div>
                <span style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--color-text)',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  {activity.name}
                </span>
              </div>
            </Col>
          ))}
        </Row>

        {/* CTA al final de la sección */}
        <Row className="mt-5">
          <Col className="text-center">
            <p className="lead mb-4" style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>
              ¿Listo para vivir esta experiencia transformadora?
            </p>
            <CTAButton 
              text="Quiero Participar"
              icon="🌟"
              size="lg"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicesSection;
