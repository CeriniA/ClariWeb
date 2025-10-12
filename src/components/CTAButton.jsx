import React from 'react';
import { Button } from 'react-bootstrap';

const CTAButton = ({ 
  text = "Consultar Disponibilidad", 
  variant = "primary", 
  size = "lg",
  className = "",
  icon = "✨",
  outline = false
}) => {
  const scrollToForm = (e) => {
    e.preventDefault();
    const formSection = document.getElementById('registro');
    if (formSection) {
      const offset = 80; // Offset para el navbar fijo
      const elementPosition = formSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Button
      variant={outline ? `outline-${variant}` : variant}
      size={size}
      onClick={scrollToForm}
      className={`cta-button ${className}`}
      style={{
        fontWeight: 600,
        borderRadius: '50px',
        padding: size === 'lg' ? '0.75rem 2rem' : '0.5rem 1.5rem',
        boxShadow: outline ? 'none' : '0 4px 15px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </Button>
  );
};

export default CTAButton;
