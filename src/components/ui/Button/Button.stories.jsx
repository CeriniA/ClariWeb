import React from 'react';
import Button from './Button';

/**
 * Guía de uso del componente Button
 * Este archivo sirve como documentación y ejemplos de uso
 */

export default {
  title: 'UI/Button',
  component: Button,
};

// ============================================
// EJEMPLOS DE USO
// ============================================

export const AllVariants = () => (
  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h2>Variantes Solid (Relleno)</h2>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary (Ocre)</Button>
      <Button variant="secondary">Secondary (Verde)</Button>
      <Button variant="accent">Accent (Malva)</Button>
      <Button variant="success">Success (WhatsApp)</Button>
      <Button variant="danger">Danger (Eliminar)</Button>
      <Button variant="dark">Dark (Negro)</Button>
      <Button variant="light">Light (Claro)</Button>
    </div>

    <h2>Variantes Outline (Borde)</h2>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button outline="primary">Outline Primary</Button>
      <Button outline="secondary">Outline Secondary</Button>
      <Button outline="accent">Outline Accent</Button>
      <Button outline="success">Outline Success</Button>
      <Button outline="danger">Outline Danger</Button>
      <Button outline="dark">Outline Dark</Button>
    </div>

    <h2>Tamaños</h2>
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium (default)</Button>
      <Button size="lg">Large</Button>
    </div>

    <h2>Con Iconos</h2>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button icon="✨">Con Icono</Button>
      <Button variant="success" icon="💬">WhatsApp</Button>
      <Button variant="danger" icon="🗑️">Eliminar</Button>
      <Button outline="primary" icon="👁️">Ver</Button>
    </div>

    <h2>Estados</h2>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button disabled>Deshabilitado</Button>
      <Button loading>Cargando...</Button>
      <Button fullWidth>Ancho Completo</Button>
    </div>

    <h2>Como Links</h2>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button to="/retiros">Link Interno (React Router)</Button>
      <Button href="https://google.com" external>Link Externo</Button>
    </div>
  </div>
);

// ============================================
// CASOS DE USO REALES
// ============================================

export const CTAButtons = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Botones de Call-to-Action</h2>
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '400px' }}>
      <Button variant="secondary" size="lg" fullWidth>
        Consultar Disponibilidad
      </Button>
      <Button variant="primary" size="lg" fullWidth>
        Reservar Ahora
      </Button>
      <Button outline="secondary" size="lg" fullWidth>
        Ver Más Información
      </Button>
    </div>
  </div>
);

export const FormButtons = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Botones de Formulario</h2>
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button type="submit" variant="primary" size="lg">
        Enviar
      </Button>
      <Button type="button" variant="light">
        Cancelar
      </Button>
    </div>
  </div>
);

export const AdminButtons = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Botones de Admin Dashboard</h2>
    
    <h3>Acciones Principales</h3>
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <Button variant="primary" icon="➕">Nuevo Retiro</Button>
      <Button outline="primary" icon="🔄">Actualizar</Button>
    </div>

    <h3>Acciones en Tabla</h3>
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <Button size="sm" outline="primary" icon="👁️">Ver</Button>
      <Button size="sm" outline="secondary" icon="✏️">Editar</Button>
      <Button size="sm" outline="danger" icon="🗑️">Eliminar</Button>
    </div>

    <h3>Toggle States</h3>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button size="sm" variant="success" icon="✅">Aprobar</Button>
      <Button size="sm" outline="success" icon="❌">Desaprobar</Button>
      <Button size="sm" variant="accent" icon="⭐">Featured</Button>
      <Button size="sm" outline="accent" icon="⭐">No Featured</Button>
    </div>
  </div>
);

export const WhatsAppButtons = () => (
  <div style={{ padding: '2rem' }}>
    <h2>Botones de WhatsApp</h2>
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '400px' }}>
      <Button 
        variant="success" 
        icon="💬" 
        size="lg"
        href="https://wa.me/5493512345678"
        external
      >
        Escribir por WhatsApp
      </Button>
      <Button 
        outline="success" 
        icon="💬"
        href="https://wa.me/5493512345678"
        external
      >
        Consultar por WhatsApp
      </Button>
    </div>
  </div>
);
