import React from 'react';
import { Button, Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import heroImage from '../assets/hero/img2.jpg';
import profileImg1 from '../assets/FOTO CLARI/IMG-20220309-WA0134.jpg';
import profileImg2 from '../assets/FOTO CLARI/IMG-20220310-WA0054.jpg';
import profileImg3 from '../assets/FOTO CLARI/IMG-20220426-WA0069.jpg';
import profileImg4 from '../assets/FOTO CLARI/IMG-20230122-WA0115(1).jpg';
import profileImg5 from '../assets/FOTO CLARI/IMG-20230122-WA0118.jpg';
import { Link } from 'react-router-dom';
import Illustration from '../components/Illustration';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section position-relative">
        {/* Ilustraciones decorativas de fondo */}
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <Card className="hero-image-card">
                <Card.Img src={heroImage} alt="Retiro de año nuevo" />
              </Card>
            </Col>
            <Col md={6} className="hero-text-content">
              <div className="mb-3">
                <h2>Este <span style={{ color: 'var(--color-primary)' }}> AÑO NUEVO</span> regalate una experiencia única.</h2>
              </div>
              <p>Un espacio tiempo sagrado donde despedir el ciclo que termina con consciencia, y abrirte con gratitud y claridad a la nueva etapa que comienza.</p>
              <Button as={Link} to="/retiros" variant="primary" size="lg">Conocer más</Button>
            </Col>
          </Row>
        </Container>

        {/* Ilustración decorativa inferior */}
        <div className="illustration-decorative bottom-right d-none d-md-block">
          <Illustration
            name="element11"
            alt="Elemento decorativo"
            animate={true}
            style={{ width: '100px', opacity: 0.5 }}
          />
        </div>
      </div>

      {/* About Section */}
      <section className="about-section position-relative">
        {/* Ilustraciones decorativas para la sección About */}
        <div className="illustration-decorative top-left d-none d-lg-block">
          <Illustration
            name="element9"
            alt="Elemento decorativo"
            animate={true}
            style={{ width: '70px', opacity: 0.3 }}
          />
        </div>

        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="position-relative">
                <Carousel className="about-carousel">
                  <Carousel.Item>
                    <img className="d-block w-100" src={profileImg1} alt="Clarisa 1" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={profileImg2} alt="Clarisa 2" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={profileImg3} alt="Clarisa 3" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={profileImg4} alt="Clarisa 4" />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img className="d-block w-100" src={profileImg5} alt="Clarisa 5" />
                  </Carousel.Item>
                </Carousel>

              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-center mb-3">
                <Illustration
                  name="brote-espiritual"
                  alt="Crecimiento espiritual"
                  style={{ width: '50px', marginRight: '15px' }}
                  className="illustration-fade-in"
                  color="primary"
                />
                <h2>Conóceme</h2>
              </div>
              <p>
                Soy Clarisa, una apasionada guía en el camino del autoconocimiento y la sanación. Mi misión es acompañarte a redescubrir tu poder interior y a vivir una vida más plena y consciente a través de experiencias transformadoras.
              </p>
              <Button as={Link} to="/sobre-mi" variant="primary" size="lg">Leer más sobre mi historia</Button>
            </Col>
          </Row>
        </Container>


      </section>

      {/* Services/Benefits Section with Illustrations */}
      <section className="services-section py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <Illustration
                  name="estrella-guia"
                  alt="Estrella guía"
                  style={{ width: '45px', marginRight: '12px' }}
                  className="illustration-fade-in"
                  color="gold"
                />
                <h2>¿Qué encontrarás en mis retiros?</h2>
                <Illustration
                  name="luna-fina"
                  alt="Luna espiritual"
                  style={{ width: '45px', marginLeft: '12px' }}
                  className="illustration-fade-in"
                  color="primary"
                />
              </div>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4} className="text-center">
              <div className="service-card h-100 p-4">
                <div className="mb-3">
                  <Illustration
                    name="ojo-espiritual"
                    alt="Autoconocimiento"
                    style={{ width: '80px' }}
                    animate={true}
                    color="primary"
                  />
                </div>
                <h4>Autoconocimiento</h4>
                <p>Conecta con tu esencia más profunda y descubre tu verdadero potencial interior.</p>
              </div>
            </Col>

            <Col md={4} className="text-center">
              <div className="service-card h-100 p-4">
                <div className="mb-3">
                  <Illustration
                    name="llama-interior"
                    alt="Sanación"
                    style={{ width: '80px' }}
                    animate={true}
                    color="gold"
                  />
                </div>
                <h4>Sanación Emocional</h4>
                <p>Libera patrones limitantes y sana heridas emocionales del pasado.</p>
              </div>
            </Col>

            <Col md={4} className="text-center">
              <div className="service-card h-100 p-4">
                <div className="mb-3">
                  <Illustration
                    name="brote-esperanza"
                    alt="Transformación"
                    style={{ width: '80px' }}
                    animate={true}
                    color="primary"
                  />
                </div>
                <h4>Renovación</h4>
                <p>Renuévate y prepárate para recibir el nuevo año con claridad y propósito.</p>
              </div>
            </Col>
          </Row>

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
                color="primary"
                opacity={0.5}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
