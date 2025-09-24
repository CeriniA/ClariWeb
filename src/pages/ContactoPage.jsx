import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ContactoPage = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="text-center mb-4">Contacto</h1>
          
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Row>
                <Col md={6}>
                  <h4 className="mb-3">¿Tenés consultas?</h4>
                  <p className="mb-4">
                    Estamos aquí para acompañarte en tu camino de transformación. 
                    No dudes en escribirnos para cualquier consulta sobre nuestros retiros.
                  </p>
                  
                  <div className="contact-info">
                    <div className="mb-3">
                      <h6>📧 Email</h6>
                      <a href="mailto:holasoul.experiences@gmail.com" className="text-decoration-none">
                        holasoul.experiences@gmail.com
                      </a>
                    </div>
                    
                    <div className="mb-3">
                      <h6>📍 Ubicación</h6>
                      <p className="mb-0">Córdoba, Argentina</p>
                    </div>
                    
                    <div className="mb-3">
                      <h6>🌿 Especialidad</h6>
                      <p className="mb-0">Retiros de transformación y autoconocimiento</p>
                    </div>
                  </div>
                </Col>
                
                <Col md={6}>
                  <h4 className="mb-3">Próximo Retiro</h4>
                  <div className="highlight-box p-3 rounded" style={{backgroundColor: 'var(--color-light-gray)'}}>
                    <h5 style={{color: 'var(--color-primary)'}}>AÑO NUEVO 2026</h5>
                    <h6>"Celebración consciente"</h6>
                    <p className="mb-2">
                      <strong>Fechas:</strong> Del lunes 29 de diciembre al viernes 2 de enero
                    </p>
                    <p className="mb-2">
                      <strong>Lugar:</strong> Los Molles - Traslasierra - Córdoba
                    </p>
                    <p className="mb-0">
                      Un espacio tiempo sagrado donde despedir el ciclo que termina con consciencia, 
                      y abrirte con gratitud y claridad a la nueva etapa que comienza.
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          <div className="text-center mt-4">
            <p className="text-muted">
              <em>"Un nuevo año, un nuevo ciclo, una nueva versión de tí."</em>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactoPage;
