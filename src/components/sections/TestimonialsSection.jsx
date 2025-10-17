import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Illustration from '../Illustration';

const TestimonialsSection = ({ testimonials }) => {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating || 5);
  };

  return (
    <section id="testimonios" className="testimonials-section py-5" style={{ backgroundColor: 'var(--color-background)' }}>
      <Container>
        {testimonials && testimonials.length > 0 && (
          <Row className="mb-5">
            <Col>
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center align-items-center mb-3">
                 
                  <h2 style={{ fontFamily: 'var(--font-family-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.25rem)', margin: 0 }}>
                    Lo que dicen quienes ya vivieron la experiencia
                  </h2>
                  
                </div>
              </div>

              <Row className="g-4">
                {testimonials.slice(0, 3).map((testimonial) => (
                  <Col key={testimonial._id} md={4}>
                    <Card className="h-100 testimonial-card">
                      <Card.Body className="d-flex flex-column">
                        <div className="mb-3">
                          <div className="stars mb-2">{renderStars(testimonial.rating)}</div>
                          <Card.Text className="flex-grow-1 fst-italic">
                            "{testimonial.comment}"
                          </Card.Text>
                        </div>
                        <div className="mt-auto">
                          <strong>— {testimonial.participantName}</strong>
                          {testimonial.retreat && (
                            <div>
                              <small className="text-muted">
                                Retiro: {testimonial.retreat.title}
                              </small>
                            </div>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}

        {/* Elementos decorativos flotantes */}
        <div className="position-relative mt-5">
          <div className="d-none d-lg-flex justify-content-between align-items-center">
            <Illustration
              name="estrella-luz"
              alt="Estrella de luz"
              style={{ width: '40px' }}
              animate={true}
              color="gold"
              opacity={0.4}
            />
            <Illustration
              name="luna-fina-180"
              alt="Luna creciente"
              style={{ width: '35px' }}
              animate={true}
              color="light"
              opacity={0.5}
            />
            <Illustration
              name="red-copo-nieve"
              alt="Copo de nieve"
              style={{ width: '45px' }}
              animate={true}
              color="primary"
              opacity={0.3}
            />
            <Illustration
              name="rombo-pin"
              alt="Rombo espiritual"
              style={{ width: '30px' }}
              animate={true}
              color="gold"
              opacity={0.4}
            />
            <Illustration
              name="estrella-luz-2"
              alt="Estrella brillante"
              style={{ width: '38px' }}
              animate={true}
              color="accent"
              opacity={0.6}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
