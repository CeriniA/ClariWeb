/**
 * Constantes y enums centralizados para el frontend
 * IMPORTANTE: Mantener sincronizados con backend/constants/enums.js
 */

// Estados del Lead
export const LEAD_STATUS = {
  NUEVO: 'nuevo',
  CONTACTADO: 'contactado',
  INTERESADO: 'interesado',
  CONFIRMADO: 'confirmado',
  DESCARTADO: 'descartado'
};

export const LEAD_STATUS_OPTIONS = [
  { value: LEAD_STATUS.NUEVO, label: 'Nuevo' },
  { value: LEAD_STATUS.CONTACTADO, label: 'Contactado' },
  { value: LEAD_STATUS.INTERESADO, label: 'Interesado' },
  { value: LEAD_STATUS.CONFIRMADO, label: 'Confirmado' },
  { value: LEAD_STATUS.DESCARTADO, label: 'Descartado' }
];

// Estados de Pago
export const PAYMENT_STATUS = {
  PENDIENTE: 'pendiente',
  SEÑA: 'seña',
  COMPLETO: 'completo'
};

export const PAYMENT_STATUS_OPTIONS = [
  { value: PAYMENT_STATUS.PENDIENTE, label: 'Pendiente' },
  { value: PAYMENT_STATUS.SEÑA, label: 'Seña' },
  { value: PAYMENT_STATUS.COMPLETO, label: 'Completo' }
];

// Métodos de Pago
export const PAYMENT_METHOD = {
  TRANSFERENCIA: 'transferencia',
  MERCADOPAGO: 'mercadopago',
  EFECTIVO: 'efectivo'
};

export const PAYMENT_METHOD_OPTIONS = [
  { value: '', label: 'Seleccionar...' },
  { value: PAYMENT_METHOD.TRANSFERENCIA, label: 'Transferencia' },
  { value: PAYMENT_METHOD.MERCADOPAGO, label: 'MercadoPago' },
  { value: PAYMENT_METHOD.EFECTIVO, label: 'Efectivo' }
];

// Tipos de Interés
export const INTEREST_TYPE = {
  RESERVAR: 'reservar',
  INFO: 'info',
  CONSULTA: 'consulta'
};

export const INTEREST_TYPE_OPTIONS = [
  { value: INTEREST_TYPE.RESERVAR, label: 'Reservar' },
  { value: INTEREST_TYPE.INFO, label: 'Información' },
  { value: INTEREST_TYPE.CONSULTA, label: 'Consulta' }
];

// Fuentes de Lead
export const LEAD_SOURCE = {
  LANDING: 'landing',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  REFERIDO: 'referido',
  OTRO: 'otro'
};

export const LEAD_SOURCE_OPTIONS = [
  { value: LEAD_SOURCE.LANDING, label: 'Landing Page' },
  { value: LEAD_SOURCE.INSTAGRAM, label: 'Instagram' },
  { value: LEAD_SOURCE.FACEBOOK, label: 'Facebook' },
  { value: LEAD_SOURCE.REFERIDO, label: 'Referido' },
  { value: LEAD_SOURCE.OTRO, label: 'Otro' }
];

// Estados de Retiro
export const RETREAT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const RETREAT_STATUS_OPTIONS = [
  { value: RETREAT_STATUS.DRAFT, label: 'Borrador' },
  { value: RETREAT_STATUS.ACTIVE, label: 'Activo' },
  { value: RETREAT_STATUS.COMPLETED, label: 'Completado' },
  { value: RETREAT_STATUS.CANCELLED, label: 'Cancelado' }
];

// Monedas
export const CURRENCY = {
  ARS: 'ARS',
  USD: 'USD',
  EUR: 'EUR'
};

export const CURRENCY_OPTIONS = [
  { value: CURRENCY.ARS, label: 'Pesos Argentinos (ARS)' },
  { value: CURRENCY.USD, label: 'Dólares (USD)' },
  { value: CURRENCY.EUR, label: 'Euros (EUR)' }
];

// Badges para estados
export const STATUS_BADGE_VARIANTS = {
  [LEAD_STATUS.NUEVO]: 'primary',
  [LEAD_STATUS.CONTACTADO]: 'info',
  [LEAD_STATUS.INTERESADO]: 'warning',
  [LEAD_STATUS.CONFIRMADO]: 'success',
  [LEAD_STATUS.DESCARTADO]: 'secondary'
};

export const PAYMENT_STATUS_BADGE_VARIANTS = {
  [PAYMENT_STATUS.PENDIENTE]: 'secondary',
  [PAYMENT_STATUS.SEÑA]: 'warning',
  [PAYMENT_STATUS.COMPLETO]: 'success'
};

/**
 * Verifica si un lead está completamente confirmado
 */
export const isLeadFullyConfirmed = (status, paymentStatus) => {
  return status === LEAD_STATUS.CONFIRMADO && paymentStatus === PAYMENT_STATUS.COMPLETO;
};
