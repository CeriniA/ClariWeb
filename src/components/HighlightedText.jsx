import React from 'react';

const HighlightedText = ({ children, highlightColor = 'var(--color-primary)' }) => {
  // Función para procesar texto y resaltar palabras entre comillas
  const processText = (text) => {
    if (typeof text !== 'string') return text;
    
    const parts = text.split(/"([^"]+)"/g);
    
    return parts.map((part, index) => {
      // Los índices impares son las palabras entre comillas
      if (index % 2 === 1) {
        return (
          <span 
            key={index} 
            style={{ 
              color: highlightColor, 
              fontWeight: 600 
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return <>{processText(children)}</>;
};

export default HighlightedText;
