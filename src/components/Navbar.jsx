import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logoBlanco from '../assets/logo/logotipo-blanco.svg';
import logoNegro from '../assets/logo/logotipo-negro.svg';
import './Navbar.css';

const Navbar = () => {
  const [navClass, setNavClass] = useState('navbar-transparent');
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavClass('navbar-solid');
      } else {
        setNavClass('navbar-transparent');
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
        <BootstrapNavbar.Brand as={Link} to="/">
          <img
            src={navClass === 'navbar-transparent' ? logoBlanco : logoNegro}
            alt="Soul Experiences Logo"
            className="navbar-logo"
          />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/retiros">Retiros</Nav.Link>
            <Nav.Link as={Link} to="/sobre-mi">Sobre Mí</Nav.Link>
            <Nav.Link as={Link} to="/testimonios">Testimonios</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
