import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logoBlanco from '../assets/logo/logotipo-blanco.svg';
import logoNegro from '../assets/logo/logotipo-negro.svg';
import './Navbar.css';

const Navbar = () => {
  const [navClass, setNavClass] = useState('navbar-transparent');
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const location = useLocation();

  // Función para hacer scroll suave a una sección
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Ajuste para navbar fijo
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      // Cambiar estilo del navbar
      if (window.scrollY > 50) {
        setNavClass('navbar-solid');
      } else {
        setNavClass('navbar-transparent');
      }

      // Detectar sección activa solo en la landing page
      if (location.pathname === '/') {
        const sections = ['inicio', 'sobre-mi', 'retiros', 'testimonios', 'faq', 'registro'];
        const scrollPosition = window.scrollY + 150;

        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i]);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Check mobile on mount and resize
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      // Set initial state based on scroll position
      handleScroll();
    } else {
      setNavClass('navbar-solid');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [location]);

  return (
    <BootstrapNavbar expand="lg" className={navClass} variant={navClass === 'navbar-transparent' ? 'dark' : 'light'} fixed="top">
      <Container>
        <BootstrapNavbar.Brand 
          as={location.pathname === '/' ? 'button' : Link} 
          to={location.pathname === '/' ? undefined : "/"}
          onClick={location.pathname === '/' ? () => scrollToSection('inicio') : undefined}
          style={location.pathname === '/' ? { cursor: 'pointer', background: 'none', border: 'none' } : {}}
        >
          <img
            src={navClass === 'navbar-transparent' ? logoBlanco : logoNegro}
            alt="Soul Experiences Logo"
            className="navbar-logo"
          />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {location.pathname === '/' ? (
              // Enlaces de scroll suave para la landing page
              <>
                <Nav.Link 
                  onClick={() => scrollToSection('inicio')}
                  className={activeSection === 'inicio' ? 'active' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  Inicio
                </Nav.Link>
                
                <Nav.Link 
                  onClick={() => scrollToSection('sobre-mi')}
                  className={activeSection === 'sobre-mi' ? 'active' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  Sobre Mí
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('retiros')}
                  className={activeSection === 'retiros' ? 'active' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  Retiros
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('testimonios')}
                  className={activeSection === 'testimonios' ? 'active' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  Testimonios
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('faq')}
                  className={activeSection === 'faq' ? 'active' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  FAQ
                </Nav.Link>
                <Nav.Link 
                  onClick={() => scrollToSection('registro')}
                  className={activeSection === 'registro' ? 'active' : ''}
                  style={{ cursor: 'pointer' }}
                >
                  Hablemos
                </Nav.Link>
              </>
            ) : (
              // Enlaces normales para otras páginas
              <>
                <Nav.Link as={Link} to="/">Volver al Inicio</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
