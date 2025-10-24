import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/**
 * Componente Button estandarizado para Soul Experiences
 * 
 * @param {Object} props
 * @param {string} props.variant - Variante del botón: 'primary', 'secondary', 'accent', 'success', 'danger', 'dark', 'light', 'ghost'
 * @param {string} props.outline - Usar variante outline: 'primary', 'secondary', 'accent', 'success', 'danger', 'dark'
 * @param {string} props.size - Tamaño: 'sm', 'md', 'lg'
 * @param {boolean} props.fullWidth - Botón de ancho completo
 * @param {boolean} props.loading - Estado de carga
 * @param {boolean} props.disabled - Botón deshabilitado
 * @param {string} props.type - Tipo de botón: 'button', 'submit', 'reset'
 * @param {string} props.to - Ruta interna (React Router)
 * @param {string} props.href - URL externa
 * @param {boolean} props.external - Abrir link externo en nueva pestaña
 * @param {Function} props.onClick - Función al hacer clic
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {React.ReactNode} props.icon - Icono (opcional)
 * @param {string} props.className - Clases CSS adicionales
 */
const Button = ({
  variant = 'primary',
  outline = null,
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  to = null,
  href = null,
  external = false,
  onClick,
  children,
  icon = null,
  className = '',
  ...rest
}) => {
  // Determinar la variante (outline tiene prioridad)
  const variantClass = outline 
    ? `outline${outline.charAt(0).toUpperCase() + outline.slice(1)}`
    : variant;

  // Construir clases CSS
  const buttonClasses = [
    styles.button,
    styles[variantClass],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  // Props comunes
  const commonProps = {
    className: buttonClasses,
    disabled: disabled || loading,
    ...rest
  };

  // Contenido del botón
  const buttonContent = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </>
  );

  // Renderizar como Link interno (React Router)
  if (to && !disabled && !loading) {
    return (
      <Link to={to} {...commonProps}>
        {buttonContent}
      </Link>
    );
  }

  // Renderizar como enlace externo
  if (href && !disabled && !loading) {
    return (
      <a
        href={href}
        target={external ? '_blank' : '_self'}
        rel={external ? 'noopener noreferrer' : undefined}
        {...commonProps}
      >
        {buttonContent}
      </a>
    );
  }

  // Renderizar como botón normal
  return (
    <button type={type} onClick={onClick} {...commonProps}>
      {buttonContent}
    </button>
  );
};

export default Button;
