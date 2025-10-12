import React from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import HighlightedText from '../HighlightedText';
import Illustration from '../Illustration';
import { clariPhotos } from '../../utils/imageHelpers';

const AboutSection = () => {
  // Función para formatear la biografía con párrafos y palabras resaltadas
  const getFormattedBio = () => {
    const bioText = `Hola, soy Clarissa. 
Me apasiona la búsqueda del bienestar y la creación de experiencias que inviten a transformar la vida "desde adentro hacia afuera".
En mi camino me formé en yoga, terapias holísticas y alimentación natural, herramientas que hoy integro con amor en todo lo que comparto.
Vivo en el Valle de Traslasierra, Córdoba, un lugar que me inspira a conectar con la naturaleza y con lo esencial de la vida.
Como fundadora de "Soul Experiences", mi propósito es diseñar experiencias que nos recuerden quiénes somos, acompañando procesos de autoconocimiento y abriendo puertas hacia una vida más plena y consciente.`;

    // Dividir en párrafos y usar componente seguro
    return bioText.split('\n').map((paragraph, index) => {
      if (paragraph.trim()) {
        return (
          <p key={index}>
            <HighlightedText>{paragraph}</HighlightedText>
          </p>
        );
      }
      return null;
    }).filter(Boolean);
  };

  const handleRetreatsClick = () => {
    const element = document.getElementById('retiros');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="sobre-mi" className="about-section position-relative">
      {/* Ilustraciones decorativas para la sección About */}
      <div className="illustration-decorative top-left d-none d-lg-block">
        <Illustration
          name="element9"
          alt="Elemento decorativo"
          animate={true}
          style={{ width: '120px', opacity: 0.1 }}
          color="primary"
        />
      </div>

      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <Carousel className="about-carousel" indicators={false} controls={true} interval={4000}>
              {clariPhotos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 rounded"
                    src={photo}
                    alt={`Clarisa ${index + 1}`}
                    style={{ height: '450px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center mb-3">
              <Illustration
                name="brote-espiritual"
                alt="Crecimiento espiritual"
                style={{ width: '50px', marginRight: '15px' }}
                color="primary"
                animate={true}
              />
              <h2>Conóceme</h2>
            </div>
            <div className="bio-content">
              {getFormattedBio()}
            </div>
            <Button
              variant="primary"
              size="lg"
              className="mt-4"
              onClick={handleRetreatsClick}
            >
              Conoce mis retiros
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
