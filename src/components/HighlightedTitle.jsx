import React from 'react';

const HighlightedTitle = ({ title, highlightWords = [], fallbackWords = ['AÑO NUEVO'] }) => {
  if (!title) return null;

  // Función para procesar el título y resaltar palabras específicas
  const processTitle = (text) => {
    let processedText = text;
    const wordsToHighlight = highlightWords.length > 0 ? highlightWords : fallbackWords;
    
    // Crear un array de partes del texto
    let parts = [text];
    
    wordsToHighlight.forEach(word => {
      if (word && word.trim()) {
        const newParts = [];
        parts.forEach(part => {
          if (typeof part === 'string') {
            // Dividir por la palabra a resaltar (case insensitive)
            const regex = new RegExp(`(${word.trim()})`, 'gi');
            const splitParts = part.split(regex);
            
            splitParts.forEach((splitPart, index) => {
              if (splitPart.toLowerCase() === word.trim().toLowerCase()) {
                // Esta es la palabra a resaltar
                newParts.push(
                  <span 
                    key={`${word}-${index}`}
                    style={{ 
                      color: 'var(--color-primary)',
                      fontWeight: 'inherit'
                    }}
                  >
                    {splitPart}
                  </span>
                );
              } else if (splitPart) {
                // Texto normal
                newParts.push(splitPart);
              }
            });
          } else {
            // Ya es un elemento React
            newParts.push(part);
          }
        });
        parts = newParts;
      }
    });
    
    return parts;
  };

  return <>{processTitle(title)}</>;
};

export default HighlightedTitle;
