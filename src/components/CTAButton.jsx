import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CTAButton = ({ 
  text = "Consultar Disponibilidad", 
  variant = "primary", 
  size = "lg",
  className = "",
  icon = "",
  outline = false,
  to,
  href,
  targetId = 'registro',
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      return onClick(e);
    }
    // Navegación interna
    if (to) {
      e.preventDefault();
      navigate(to);
      return;
    }
    // Navegación externa
    if (href) {
      // Permite comportamiento natural de <a> si se usa como enlace externo en el futuro
      e.preventDefault();
      window.location.assign(href);
      return;
    }
    // Scroll a sección objetivo
    if (targetId) {
      e.preventDefault();
      const scrollToSection = () => {
        const section = document.getElementById(targetId) || document.querySelector(`[name="${targetId}"]`);
        if (section) {
          const offset = 80; // Offset para el navbar fijo
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          return true;
        }
        return false;
      };

      if (!scrollToSection()) {
        // Si aún no está en el DOM, actualizar el hash y reintentar brevemente
        if (window.location.hash !== `#${targetId}`) {
          window.location.hash = `#${targetId}`;
        }
        setTimeout(scrollToSection, 100);
      }
    }
  };

  return (
    <Button
      variant={outline ? `outline-${variant}` : variant}
      size={size}
      onClick={handleClick}
      className={`${className}`}
      style={{
        backgroundColor: "var(--color-secondary)",
        color: 'white'
      }}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </Button>
  );
};

export default CTAButton;
