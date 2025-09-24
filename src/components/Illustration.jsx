import React from 'react';
import PropTypes from 'prop-types';
import './Illustration.css';

// Importar todas las ilustraciones SVG
import ojoEspiritual from '../assets/ILUSTRACIONES/Ojo espiritual.svg';
import broteEsperanza2 from '../assets/ILUSTRACIONES/brote esperanza 2.svg';
import broteEspiritual from '../assets/ILUSTRACIONES/brote espiritual.svg';
import elementoMistico1 from '../assets/ILUSTRACIONES/d78ecc96-5907-4fc8-84b1-1a510ad5b3cf.svg';
import estrellaEsperanza from '../assets/ILUSTRACIONES/estrella esperanza.svg';
import estrellaGuia from '../assets/ILUSTRACIONES/estrella guia.svg';
import estrellaLuz2 from '../assets/ILUSTRACIONES/estrella luz 2.svg';
import estrellaLuz from '../assets/ILUSTRACIONES/estrella luz.svg';
import elementoMistico2 from '../assets/ILUSTRACIONES/fac85d69-aee7-461b-8b3e-a8b21ec0f2b6.svg';
import llamaInterior from '../assets/ILUSTRACIONES/llama interior.svg';
import lunaFina180 from '../assets/ILUSTRACIONES/luna fina 180.svg';
import lunaFina from '../assets/ILUSTRACIONES/luna fina.svg';
import redCopoNieve from '../assets/ILUSTRACIONES/red copo nieve.svg';
import romboPin from '../assets/ILUSTRACIONES/rombo pin.svg';

// Mapeo de ilustraciones con nombres más descriptivos y espirituales
const illustrations = {
  // Ilustraciones espirituales principales
  'ojo-espiritual': ojoEspiritual,
  'brote-esperanza': broteEsperanza2,
  'brote-espiritual': broteEspiritual,
  'estrella-esperanza': estrellaEsperanza,
  'estrella-guia': estrellaGuia,
  'estrella-luz': estrellaLuz,
  'estrella-luz-2': estrellaLuz2,
  'llama-interior': llamaInterior,
  'luna-fina': lunaFina,
  'luna-fina-180': lunaFina180,
  'red-copo-nieve': redCopoNieve,
  'rombo-pin': romboPin,
  'elemento-mistico-1': elementoMistico1,
  'elemento-mistico-2': elementoMistico2,
  
  // Alias para compatibilidad con código existente
  meditation: ojoEspiritual,
  spiritual: llamaInterior,
  nature: broteEspiritual,
  harmony: lunaFina,
  transformation: estrellaGuia,
  element1: estrellaLuz,
  element2: estrellaLuz2,
  element4: broteEsperanza2,
  element5: estrellaEsperanza,
  element6: redCopoNieve,
  element7: romboPin,
  element8: elementoMistico1,
  element9: elementoMistico2,
  element10: lunaFina180,
  element11: ojoEspiritual,
  element12: llamaInterior,
  element13: broteEspiritual,
  element14: estrellaGuia,
  element15: estrellaLuz,
  element16: broteEsperanza2,
};

const Illustration = ({ 
  name, 
  alt, 
  className = '', 
  style = {}, 
  width, 
  height,
  animate = false,
  color = null,
  opacity = 1
}) => {
  const imageSrc = illustrations[name];
  
  if (!imageSrc) {
    console.warn(`Illustration "${name}" not found`);
    return null;
  }

  const animationClass = animate ? 'illustration-animate' : '';
  
  // Estilos para SVG con control de color
  const svgStyles = {
    maxWidth: '100%',
    height: 'auto',
    opacity: opacity,
    ...style
  };

  // Si se especifica un color, aplicar filtro para SVGs
  if (color) {
    // Convertir color a filtro CSS para SVG
    svgStyles.filter = `brightness(0) saturate(100%) ${getColorFilter(color)}`;
  }
  
  return (
    <img
      src={imageSrc}
      alt={alt || `Ilustración ${name}`}
      className={`illustration ${animationClass} ${className}`}
      style={svgStyles}
      width={width}
      height={height}
    />
  );
};

// Función auxiliar para convertir colores a filtros CSS
const getColorFilter = (color) => {
  const colorMap = {
    'primary': 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)',
    'secondary': 'invert(85%) sepia(43%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%)',
    'purple': 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)',
    'gold': 'invert(84%) sepia(78%) saturate(2476%) hue-rotate(2deg) brightness(101%) contrast(107%)',
    'white': 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)',
    'light': 'invert(95%) sepia(3%) saturate(13%) hue-rotate(18deg) brightness(103%) contrast(96%)',
    'dark': 'invert(13%) sepia(9%) saturate(1115%) hue-rotate(210deg) brightness(97%) contrast(86%)'
  };
  
  return colorMap[color] || color;
};

Illustration.propTypes = {
  name: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animate: PropTypes.bool,
  color: PropTypes.string,
  opacity: PropTypes.number,
};

export default Illustration;
