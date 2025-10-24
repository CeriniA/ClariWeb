# 🔄 Guía de Migración: Botones Estandarizados

Esta guía te ayudará a migrar todos los botones de la aplicación al nuevo sistema estandarizado.

---

## 📊 Resumen de Cambios

### Antes (Bootstrap)
```jsx
import { Button } from 'react-bootstrap';

<Button variant="primary" size="lg" className="w-100">
  Click me
</Button>
```

### Ahora (Soul Experiences)
```jsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="lg" fullWidth>
  Click me
</Button>
```

---

## 🗺️ Mapeo de Variantes

| Bootstrap | Soul Experiences | Uso |
|-----------|------------------|-----|
| `variant="primary"` | `variant="primary"` | Acciones principales (ahora usa ocre dorado) |
| `variant="secondary"` | `variant="secondary"` | CTAs importantes (verde azulado) |
| `variant="success"` | `variant="success"` | WhatsApp, confirmaciones |
| `variant="danger"` | `variant="danger"` | Eliminar, acciones destructivas |
| `variant="warning"` | `variant="accent"` | Destacar, featured |
| `variant="light"` | `variant="light"` | Fondos claros |
| `variant="dark"` | `variant="dark"` | Negro |
| `variant="outline-primary"` | `outline="primary"` | Secundarios con borde |
| `variant="outline-secondary"` | `outline="secondary"` | Volver, cancelar |
| `variant="outline-success"` | `outline="success"` | WhatsApp alternativo |
| `variant="outline-danger"` | `outline="danger"` | Eliminar con confirmación |

---

## 📝 Ejemplos de Migración por Componente

### 1. Login.jsx

#### Antes:
```jsx
<Button
  type="submit"
  variant="primary"
  size="lg"
  className="w-100"
  disabled={loading}
>
  {loading ? (
    <>
      <Spinner as="span" animation="border" size="sm" className="me-2" />
      Iniciando sesión...
    </>
  ) : (
    'Iniciar Sesión'
  )}
</Button>
```

#### Ahora:
```jsx
<Button
  type="submit"
  variant="primary"
  size="lg"
  fullWidth
  loading={loading}
>
  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
</Button>
```

---

### 2. RetreatDetailPage.jsx

#### Antes:
```jsx
<Button
  onClick={handleInquiry}
  variant="primary"
  size="lg"
  className="w-100 mb-3"
  disabled={retreat.availableSpots === 0}
>
  {retreat.availableSpots > 0 ? '📝 Consultar Disponibilidad' : '❌ Sin Cupos'}
</Button>

<Button
  href={`https://wa.me/${retreat.whatsappNumber}`}
  target="_blank"
  variant="outline-success"
  size="sm"
  className="w-100"
>
  💬 Consultar por WhatsApp
</Button>
```

#### Ahora:
```jsx
<Button
  onClick={handleInquiry}
  variant="primary"
  size="lg"
  fullWidth
  disabled={retreat.availableSpots === 0}
  icon={retreat.availableSpots > 0 ? '📝' : '❌'}
>
  {retreat.availableSpots > 0 ? 'Consultar Disponibilidad' : 'Sin Cupos'}
</Button>

<Button
  href={`https://wa.me/${retreat.whatsappNumber}`}
  external
  outline="success"
  size="sm"
  fullWidth
  icon="💬"
>
  Consultar por WhatsApp
</Button>
```

---

### 3. TestimonialList.jsx (Admin)

#### Antes:
```jsx
<Button as={Link} to="/admin/testimonials/new" variant="primary">
  ➕ Nuevo Testimonio
</Button>

<Button variant="outline-primary" onClick={loadTestimonials}>
  🔄 Actualizar
</Button>

<Button
  variant={testimonial.isApproved ? "outline-warning" : "outline-success"}
  size="sm"
  onClick={() => handleApprovalToggle(testimonial._id, testimonial.isApproved)}
>
  {testimonial.isApproved ? '❌' : '✅'}
</Button>

<Button
  as={Link}
  to={`/admin/testimonials/${testimonial._id}`}
  variant="outline-primary"
  size="sm"
>
  👁️
</Button>

<Button
  variant="outline-danger"
  size="sm"
  onClick={() => handleDeleteClick(testimonial._id)}
>
  🗑️
</Button>
```

#### Ahora:
```jsx
<Button to="/admin/testimonials/new" variant="primary" icon="➕">
  Nuevo Testimonio
</Button>

<Button outline="primary" onClick={loadTestimonials} icon="🔄">
  Actualizar
</Button>

<Button
  variant={testimonial.isApproved ? "success" : "outline-success"}
  size="sm"
  onClick={() => handleApprovalToggle(testimonial._id, testimonial.isApproved)}
  icon={testimonial.isApproved ? '✅' : '❌'}
/>

<Button
  to={`/admin/testimonials/${testimonial._id}`}
  outline="primary"
  size="sm"
  icon="👁️"
/>

<Button
  outline="danger"
  size="sm"
  onClick={() => handleDeleteClick(testimonial._id)}
  icon="🗑️"
/>
```

---

### 4. CTAButton.jsx

#### Antes (componente completo):
```jsx
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
  // ... lógica de navegación y scroll
  
  return (
    <Button
      variant={outline ? `outline-${variant}` : variant}
      size={size}
      onClick={handleClick}
      className={className}
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
```

#### Ahora (usar Button directamente):
```jsx
// Ya no necesitas CTAButton, usa Button directamente:
<Button
  variant="secondary"  // Usa secondary para CTAs
  size="lg"
  to={to}
  onClick={onClick}
  icon={icon}
>
  {text}
</Button>

// Para scroll a sección, agrega la lógica en el onClick:
<Button
  variant="secondary"
  size="lg"
  onClick={() => {
    const section = document.getElementById('registro');
    section?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  Consultar Disponibilidad
</Button>
```

---

### 5. LeadRegistrationForm.jsx

#### Antes:
```jsx
<Button
  variant="primary"
  type="submit"
  size="lg"
  disabled={submitting}
  className="w-100"
>
  {submitting ? (
    <>
      <Spinner animation="border" size="sm" className="me-2" />
      Enviando...
    </>
  ) : (
    '📝 Enviar Consulta'
  )}
</Button>
```

#### Ahora:
```jsx
<Button
  variant="primary"
  type="submit"
  size="lg"
  fullWidth
  loading={submitting}
  icon={!submitting && '📝'}
>
  {submitting ? 'Enviando...' : 'Enviar Consulta'}
</Button>
```

---

### 6. AboutSection.jsx

#### Antes:
```jsx
<Button
  style={{
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold'
  }}
  size="lg"
  variant="solid"
  className="mt-4"
  onClick={handleRetreatsClick}
>
  Ver Retiros
</Button>
```

#### Ahora:
```jsx
<Button
  variant="dark"
  size="lg"
  className="mt-4"
  onClick={handleRetreatsClick}
>
  Ver Retiros
</Button>
```

---

## 🎯 Checklist de Migración

### Por Archivo:

- [ ] **Login.jsx**
  - [ ] Botón de submit con loading
  
- [ ] **RetreatDetailPage.jsx**
  - [ ] Botón "Consultar Disponibilidad"
  - [ ] Botón WhatsApp
  - [ ] Botón "Ver Testimonios"
  - [ ] Botón "Volver"

- [ ] **PublicTestimonialPage.jsx**
  - [ ] Botón de submit con loading

- [ ] **AboutSection.jsx**
  - [ ] Botón "Ver Retiros"

- [ ] **LeadRegistrationForm.jsx**
  - [ ] Botón de submit con loading
  - [ ] Botón WhatsApp

- [ ] **TestimonialList.jsx**
  - [ ] Botón "Nuevo Testimonio"
  - [ ] Botón "Actualizar"
  - [ ] Botones de acciones (Ver, Editar, Eliminar)
  - [ ] Botones de toggle (Aprobar, Featured)

- [ ] **TestimonialForm.jsx**
  - [ ] Botón "Volver"
  - [ ] Botón de submit
  - [ ] Botón "Cancelar"

- [ ] **TestimonialDetail.jsx**
  - [ ] Botón "Editar"
  - [ ] Botón "Volver"
  - [ ] Botón "Eliminar"

- [ ] **RetreatList.jsx**
  - [ ] Botón "Nuevo Retiro"
  - [ ] Botón "Actualizar"
  - [ ] Botones de acciones en tabla

- [ ] **RetreatForm.jsx**
  - [ ] Botón de submit
  - [ ] Botón "Cancelar"

- [ ] **LeadList.jsx**
  - [ ] Botón "Actualizar"
  - [ ] Botones de acciones en tabla

- [ ] **SettingsForm.jsx**
  - [ ] Botón "Guardar"
  - [ ] Botón "Resetear"

---

## 🔧 Pasos de Migración

### 1. Instalar el Componente
Ya está creado en `src/components/ui/Button/`

### 2. Actualizar Imports
```jsx
// Buscar y reemplazar en todos los archivos:
// Antes:
import { Button } from 'react-bootstrap';

// Ahora:
import Button from '@/components/ui/Button';
```

### 3. Actualizar Props
- `className="w-100"` → `fullWidth`
- `variant="outline-primary"` → `outline="primary"`
- `as={Link}` → `to="/ruta"`
- `target="_blank"` → `external`
- Remover estilos inline

### 4. Actualizar Loading States
```jsx
// Antes:
{loading ? <Spinner /> : 'Text'}

// Ahora:
loading={loading}
```

### 5. Separar Iconos
```jsx
// Antes:
<Button>✨ Text</Button>

// Ahora:
<Button icon="✨">Text</Button>
```

---

## 🧪 Testing

Después de migrar cada componente:

1. ✅ Verificar que los colores sean correctos
2. ✅ Verificar que los tamaños sean apropiados
3. ✅ Verificar estados hover
4. ✅ Verificar estados disabled
5. ✅ Verificar estados loading
6. ✅ Verificar navegación (links internos/externos)
7. ✅ Verificar responsive en mobile

---

## 📱 Responsive

El nuevo componente ya es responsive. Puedes remover media queries específicas de botones.

---

## 🎨 Personalización Futura

Si necesitas agregar nuevas variantes:

1. Agregar color en `index.css`:
```css
:root {
  --color-custom: #123456;
}
```

2. Agregar variante en `Button.module.css`:
```css
.button.custom {
  background-color: var(--color-custom);
  color: white;
}
```

3. Usar:
```jsx
<Button variant="custom">Custom Button</Button>
```

---

## 🚀 Beneficios Post-Migración

✅ **Consistencia visual** en toda la app  
✅ **Menos código** (sin estilos inline)  
✅ **Mejor mantenibilidad** (cambios centralizados)  
✅ **Mejor accesibilidad** (estados focus, disabled)  
✅ **Mejor DX** (props intuitivas)  
✅ **Colores de la paleta** automáticamente  
✅ **Responsive** por defecto  

---

## 📞 Soporte

Si tienes dudas durante la migración, consulta:
- `Button.stories.jsx` - Ejemplos de uso
- `README.md` - Documentación completa
- `Button.module.css` - Estilos disponibles
