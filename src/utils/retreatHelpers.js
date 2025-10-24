/**
 * Utilidades para manejar estados y visualización de retiros
 */

/**
 * Determina el estado actual de un retiro
 * Prioriza computedStatus del backend, fallback a cálculo local
 * @param {Object} retreat - Objeto del retiro
 * @returns {string} - 'completed', 'in_progress', 'upcoming', 'draft', 'cancelled'
 */
export const getRetreatStatus = (retreat) => {
  if (!retreat) {
    return 'unknown';
  }

  // Priorizar computedStatus del backend si existe
  if (retreat.computedStatus) {
    return retreat.computedStatus;
  }

  // Fallback: calcular localmente si no viene del backend
  if (!retreat.startDate || !retreat.endDate) {
    return retreat.status || 'unknown';
  }

  const now = new Date();
  const startDate = new Date(retreat.startDate);
  const endDate = new Date(retreat.endDate);

  // Respetar status manual para draft y cancelled
  if (retreat.status === 'draft' || retreat.status === 'cancelled') {
    return retreat.status;
  }

  if (endDate < now) {
    return 'completed'; // Retiro ya terminó
  } else if (startDate <= now && now <= endDate) {
    return 'in_progress'; // Retiro en curso
  } else if (startDate > now) {
    return 'upcoming'; // Retiro próximo
  }
  
  return retreat.status || 'unknown';
};

/**
 * Retorna la configuración del badge según el estado del retiro
 * @param {Object} retreat - Objeto del retiro
 * @returns {Object} - { variant, icon, text }
 */
export const getRetreatBadge = (retreat) => {
  const status = getRetreatStatus(retreat);

  switch (status) {
    case 'completed':
      return {
        variant: 'secondary',
        icon: '',
        text: 'Experiencia Completada'
      };
      
    case 'in_progress':
      return {
        variant: 'info',
        icon: '',
        text: 'En Curso'
      };
      
    case 'upcoming':
      // Para retiros próximos, verificar disponibilidad
      if (retreat.availableSpots === 0 || retreat.isFull) {
        return {
          variant: 'danger',
          icon: '',
          text: 'Completo'
        };
      } else if (retreat.availableSpots <= 3) {
        return {
          variant: 'warning',
          icon: '',
          text: `Quedan ${retreat.availableSpots} lugares`
        };
      } else {
        return {
          variant: 'success',
          icon: '',
          text: 'Disponible'
        };
      }
    
    case 'draft':
      return {
        variant: 'secondary',
        icon: '',
        text: 'Borrador'
      };
    
    case 'cancelled':
      return {
        variant: 'danger',
        icon: '',
        text: 'Cancelado'
      };
      
    default:
      return {
        variant: 'secondary',
        icon: '',
        text: 'Estado Desconocido'
      };
  }
};

/**
 * Verifica si un retiro es pasado (completado)
 * @param {Object} retreat - Objeto del retiro
 * @returns {boolean}
 */
export const isPastRetreat = (retreat) => {
  return getRetreatStatus(retreat) === 'completed';
};

/**
 * Verifica si un retiro está activo (en curso)
 * @param {Object} retreat - Objeto del retiro
 * @returns {boolean}
 */
export const isActiveRetreat = (retreat) => {
  return getRetreatStatus(retreat) === 'in_progress';
};

/**
 * Verifica si un retiro es próximo
 * @param {Object} retreat - Objeto del retiro
 * @returns {boolean}
 */
export const isUpcomingRetreat = (retreat) => {
  return getRetreatStatus(retreat) === 'upcoming';
};

/**
 * Verifica si un retiro está disponible para reservar
 * @param {Object} retreat - Objeto del retiro
 * @returns {boolean}
 */
export const isAvailableForBooking = (retreat) => {
  return getRetreatStatus(retreat) === 'upcoming' && 
         (retreat.availableSpots > 0 || retreat.availableSpots === undefined);
};

/**
 * Formatea la fecha de un retiro pasado (ej: "Marzo 2024")
 * @param {string|Date} date - Fecha del retiro
 * @returns {string}
 */
export const formatPastRetreatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Retorna el texto apropiado para el CTA según el estado del retiro
 * @param {Object} retreat - Objeto del retiro
 * @returns {string}
 */
export const getRetreatCTA = (retreat) => {
  const status = getRetreatStatus(retreat);

  switch (status) {
    case 'completed':
      return 'Ver Detalles';
      
    case 'in_progress':
      return 'Retiro en Curso';
      
    case 'upcoming':
      if (retreat.availableSpots === 0 || retreat.isFull) {
        return 'Sin Cupos Disponibles';
      } else {
        return 'Reservar Mi Lugar';
      }
    
    case 'draft':
      return 'En Preparación';
    
    case 'cancelled':
      return 'Retiro Cancelado';
      
    default:
      return 'Ver Más Información';
  }
};
