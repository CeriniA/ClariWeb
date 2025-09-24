import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Illustration from '../components/Illustration';

const SobreMiPage = () => {
  return (
    <Container className="py-5">
      {/* Header Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <Illustration 
                name="spiritual" 
                alt="Espiritualidad" 
                style={{ width: '80px', marginRight: '20px' }}
                className="illustration-fade-in"
              />
              <h1 className="display-4">Sobre Mí</h1>
              <Illustration 
                name="nature" 
                alt="Naturaleza" 
                style={{ width: '80px', marginLeft: '20px' }}
                className="illustration-fade-in"
              />
            </div>
            <p className="lead">Conoce a la facilitadora detrás de Soul Experiences</p>
          </div>
        </Col>
      </Row>

      {/* Main Content */}
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <div className="position-relative">
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <Illustration 
                    name="meditation" 
                    alt="Meditación" 
                    style={{ width: '40px', marginRight: '15px' }}
                  />
                  <h3>Mi Historia</h3>
                </div>
                <p>
                  Soy Clarisa, una apasionada guía en el camino del autoconocimiento y la sanación. 
                  Mi misión es acompañarte a redescubrir tu poder interior y a vivir una vida más 
                  plena y consciente a través de experiencias transformadoras.
                </p>
                <p>
                  Durante años he explorado diferentes técnicas de sanación, meditación y 
                  crecimiento personal, siempre con el objetivo de crear espacios seguros 
                  donde las personas puedan conectar con su esencia más profunda.
                </p>
              </Card.Body>
            </Card>
            
            {/* Decorative illustration */}
            <div className="position-absolute d-none d-lg-block" style={{ top: '-20px', right: '-20px' }}>
              <Illustration 
                name="element9" 
                alt="Elemento decorativo" 
                style={{ width: '60px', opacity: 0.6 }}
                animate={true}
              />
            </div>
          </div>
        </Col>
        
        <Col md={6}>
          <div className="text-center">
            <Illustration 
              name="transformation" 
              alt="Transformación" 
              style={{ width: '200px' }}
              animate={true}
            />
          </div>
        </Col>
      </Row>

      {/* Values Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center mb-4">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <Illustration 
                name="harmony" 
                alt="Armonía" 
                style={{ width: '50px', marginRight: '15px' }}
              />
              <h3>Mis Valores</h3>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100 border-0 shadow text-center">
            <Card.Body className="p-4">
              <div className="mb-3">
                <Illustration 
                  name="element14" 
                  alt="Autenticidad" 
                  style={{ width: '60px' }}
                  animate={true}
                />
              </div>
              <h5>Autenticidad</h5>
              <p>Creo en la importancia de ser genuino y auténtico en cada encuentro.</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 border-0 shadow text-center">
            <Card.Body className="p-4">
              <div className="mb-3">
                <Illustration 
                  name="element15" 
                  alt="Compasión" 
                  style={{ width: '60px' }}
                  animate={true}
                />
              </div>
              <h5>Compasión</h5>
              <p>Acompaño cada proceso con amor, comprensión y respeto profundo.</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 border-0 shadow text-center">
            <Card.Body className="p-4">
              <div className="mb-3">
                <Illustration 
                  name="element16" 
                  alt="Transformación" 
                  style={{ width: '60px' }}
                  animate={true}
                />
              </div>
              <h5>Transformación</h5>
              <p>Facilito espacios donde la verdadera transformación puede ocurrir.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Decorative elements at bottom */}
      <Row className="mt-5">
        <Col>
          <div className="d-none d-lg-flex justify-content-center align-items-center" style={{ opacity: 0.4 }}>
            <Illustration name="element1" alt="Decorativo" style={{ width: '30px', margin: '0 20px' }} animate={true} />
            <Illustration name="element2" alt="Decorativo" style={{ width: '25px', margin: '0 20px' }} animate={true} />
            <Illustration name="element4" alt="Decorativo" style={{ width: '35px', margin: '0 20px' }} animate={true} />
            <Illustration name="element6" alt="Decorativo" style={{ width: '28px', margin: '0 20px' }} animate={true} />
            <Illustration name="element8" alt="Decorativo" style={{ width: '32px', margin: '0 20px' }} animate={true} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SobreMiPage;
