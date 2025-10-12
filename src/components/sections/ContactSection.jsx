import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
import Illustration from '../Illustration';

const ContactSection = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('¡Hola! Me gustaría saber más sobre los retiros de Soul Experiences.');
    window.open(`https://wa.me/5493468521966?text=${message}`, '_blank');
  };

  return (
    <section id="contacto" className="contact-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <div className="mb-5">
              <h2 className="display-5 fw-bold mb-4">HABLEMOS</h2>
              <p className="lead mb-4">¿Listo para comenzar tu transformación?</p>
              <p className="mb-5" style={{ fontSize: '1.1rem', color: 'var(--color-text)' }}>
                Escríbeme para conocer más sobre los retiros, resolver tus dudas o reservar tu lugar.
                Estoy aquí para acompañarte en este hermoso camino de autoconocimiento.
              </p>
              
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleWhatsAppClick}
                className="px-5 py-3 rounded-pill shadow"
                style={{
                  backgroundColor: '#25D366',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <FaWhatsapp size={24} />
                Escribir por WhatsApp
              </Button>
              
              <div className="mt-5 pt-4">
                <p className="text-muted mb-1">O escríbeme a</p>
                <a 
                  href="mailto:holasoul.experiences@gmail.com" 
                  className="text-decoration-none"
                  style={{ color: 'var(--color-text)' }}
                >
                  holasoul.experiences@gmail.com
                </a>
                <p className="mt-4 mb-0 text-muted">
                  <small>📍 Valle de Traslasierra, Córdoba, Argentina</small>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ContactSection;