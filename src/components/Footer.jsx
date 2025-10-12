import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import logoBlanco from '../assets/logo/logotipo-blanco.svg';
import './Footer.css';

const Footer = () => {
  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = 'holasoul.experiences@gmail.com';
    
    // Intentar abrir el cliente de correo
    window.location.href = `mailto:${email}`;
    
    // También copiar al portapapeles como respaldo
    navigator.clipboard.writeText(email).then(() => {
      alert('Email copiado al portapapeles: ' + email);
    }).catch(() => {
      // Si falla, mostrar el email
      alert('Email: ' + email);
    });
  };

  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center py-4">
          {/* Logo */}
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <img 
              src={logoBlanco} 
              alt="Soul Experiences Logo" 
              className="footer-logo"
              style={{ maxWidth: '180px', height: 'auto' }}
            />
          </Col>
          
          {/* Redes sociales */}
          <Col md={4} className="text-center mb-3 mb-md-0">
            <div className="d-flex justify-content-center gap-3">
              <a 
                href="mailto:holasoul.experiences@gmail.com" 
                onClick={handleEmailClick}
                className="footer-icon-link"
                aria-label="Email"
                style={{ cursor: 'pointer' }}
              >
                <FaEnvelope size={24} />
              </a>
              <a 
                href="https://www.instagram.com/soul.experiences/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-icon-link"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://wa.me/5493468521966" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-icon-link"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </Col>
          
          {/* Copyright */}
          <Col md={4} className="text-center text-md-end">
            <p className="footer-copyright mb-0" style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              © {new Date().getFullYear()} Soul Experiences
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
