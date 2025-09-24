import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoBlanco from '../assets/logo/logotipo-blanco.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="footer-section">
            <div className="footer-logo-section">
              <img 
                src={logoBlanco} 
                alt="Soul Experiences Logo" 
                className="footer-logo"
              />
              <p>
                Acompañándote en tu camino hacia el autoconocimiento y la transformación personal.
              </p>
            </div>
          </Col>
          
          <Col md={4} className="footer-section">
            <h5>Enlaces</h5>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/retiros">Retiros</Link></li>
              <li><Link to="/sobre-mi">Sobre Mí</Link></li>
              <li><Link to="/testimonios">Testimonios</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </Col>
          
          <Col md={4} className="footer-section">
            <h5>Contacto</h5>
            <div className="footer-contact">
              <p>📧 holasoul.experiences@gmail.com</p>
              <p>📍 Córdoba, Argentina</p>
              <p>🌿 Retiros de transformación y autoconocimiento</p>
            </div>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row>
          <Col className="text-center">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Soul Experiences. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
