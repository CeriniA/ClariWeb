# 📅 Propuesta: Manejo de Retiros Pasados

## 🎯 Problema Actual

1. ❌ Los retiros pasados muestran "Disponible" en badges
2. ❌ Se muestran junto con retiros activos sin distinción clara
3. ❌ Muestran toda la información (precio, disponibilidad, formulario)
4. ❌ No hay una sección dedicada para "Experiencias Pasadas"

---

## ✅ Propuesta de Solución

### **1. Separar Retiros Activos de Pasados**

#### **En la Landing Page (RetreatsSection)**

**Estructura:**
```
┌─────────────────────────────────────────┐
│  PRÓXIMOS RETIROS                       │
│  (Retiros activos con CTA de reserva)  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  EXPERIENCIAS PASADAS                   │
│  (Galería de fotos + testimonios)       │
└─────────────────────────────────────────┘
```

**Información a Mostrar:**

**Retiros Activos:**
- ✅ Foto principal
- ✅ Título
- ✅ Badge de disponibilidad (Disponible/Quedan X/Completo)
- ✅ Descripción corta
- ✅ Fechas
- ✅ Ubicación
- ✅ Precio
- ✅ Botón "Reservar Mi Lugar"

**Retiros Pasados:**
- ✅ Galería de fotos (3-4 fotos)
- ✅ Título
- ✅ Badge "Experiencia Completada"
- ✅ Fechas (pasadas)
- ✅ Ubicación
- ✅ Número de participantes (ej: "15 personas vivieron esta experiencia")
- ✅ Botón "Ver Testimonios"
- ❌ NO mostrar: Precio, Disponibilidad, Formulario de consulta

---

### **2. Página de Detalle de Retiro Pasado**

**Información Reducida:**

```
┌─────────────────────────────────────────┐
│  GALERÍA DE FOTOS (destacada)           │
│  - Carrusel grande con todas las fotos  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  INFORMACIÓN BÁSICA                      │
│  - Título                                │
│  - Badge "Experiencia Completada"        │
│  - Fechas (del X al Y de [mes])         │
│  - Ubicación                             │
│  - Descripción                           │
│  - Número de participantes               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  TESTIMONIOS DE PARTICIPANTES            │
│  - Testimonios específicos de este      │
│    retiro (si existen)                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ¿TE INTERESA UNA EXPERIENCIA SIMILAR?  │
│  - Botón "Ver Próximos Retiros"         │
│  - Botón "Quiero Más Información"        │
└─────────────────────────────────────────┘
```

**NO Mostrar:**
- ❌ Precio
- ❌ Disponibilidad
- ❌ Countdown
- ❌ Formulario de consulta
- ❌ Botón "Reservar"
- ❌ Precios escalonados
- ❌ Políticas de cancelación

---

### **3. Badges y Estados Visuales**

#### **Retiros Activos:**
```jsx
// Disponible
<Badge bg="success">✅ Disponible</Badge>

// Quedan pocos
<Badge bg="warning">⚠️ Quedan {X} lugares</Badge>

// Completo
<Badge bg="danger">❌ Completo</Badge>

// Próximamente
<Badge bg="info">🔜 Próximamente</Badge>
```

#### **Retiros Pasados:**
```jsx
// Completado
<Badge bg="secondary">📅 Experiencia Completada</Badge>

// Con fecha
<Badge bg="secondary">
  ✨ Realizado en {mes} {año}
</Badge>
```

---

### **4. Sección "Experiencias Pasadas" en Landing**

**Diseño Propuesto:**

```jsx
<section className="past-retreats-section py-5">
  <Container>
    <Row className="mb-4">
      <Col className="text-center">
        <h2>✨ Experiencias Pasadas</h2>
        <p className="lead">
          Revive los momentos mágicos que hemos compartido
        </p>
      </Col>
    </Row>

    <Row className="g-4">
      {pastRetreats.map(retreat => (
        <Col md={4} key={retreat._id}>
          <Card className="past-retreat-card h-100">
            {/* Galería de fotos pequeña */}
            <div className="photo-grid">
              {retreat.images.slice(0, 4).map((img, i) => (
                <img src={img} key={i} />
              ))}
            </div>

            <Card.Body>
              <Badge bg="secondary" className="mb-2">
                📅 {formatMonth(retreat.startDate)} {formatYear(retreat.startDate)}
              </Badge>
              
              <Card.Title>{retreat.title}</Card.Title>
              
              <div className="mb-3">
                <small>📍 {retreat.location}</small><br />
                <small>👥 {retreat.participantCount || retreat.maxParticipants} personas</small>
              </div>

              <Button 
                to={`/retreats/${retreat.slug}`}
                outline="primary"
                size="sm"
                fullWidth
              >
                Ver Galería y Testimonios
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
</section>
```

---

### **5. Filtros y Navegación**

#### **Página /retiros (si existe)**

```
┌─────────────────────────────────────────┐
│  [Próximos] [Pasados] [Todos]           │
└─────────────────────────────────────────┘

// Próximos (default)
- Muestra solo retiros activos
- Ordenados por fecha más cercana
- Con CTA de reserva

// Pasados
- Muestra solo retiros completados
- Ordenados por fecha más reciente primero
- Con CTA de ver testimonios

// Todos
- Muestra ambos con badges distintivos
```

---

### **6. Admin Dashboard**

**Agregar columna "Estado" en lista:**

```
┌─────────────────────────────────────────────────────────┐
│ Título          │ Fechas      │ Estado      │ Acciones │
├─────────────────────────────────────────────────────────┤
│ Retiro Verano   │ 15-20 Feb   │ 🟢 Activo   │ [...]    │
│ Retiro Otoño    │ 10-15 May   │ 🔵 Próximo  │ [...]    │
│ Retiro Invierno │ 5-10 Ago    │ ⚪ Pasado   │ [...]    │
└─────────────────────────────────────────────────────────┘
```

**Estados:**
- 🟢 **Activo**: Fecha inicio <= hoy <= fecha fin
- 🔵 **Próximo**: Fecha inicio > hoy
- ⚪ **Pasado**: Fecha fin < hoy
- 🔴 **Cancelado**: Marcado manualmente

---

## 🎨 Diseño Visual

### **Card de Retiro Pasado**

```css
.past-retreat-card {
  border: 2px solid var(--color-light-gray);
  opacity: 0.95;
  position: relative;
}

.past-retreat-card::before {
  content: "✨";
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  opacity: 0.3;
}

.past-retreat-card .photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  height: 200px;
}

.past-retreat-card .photo-grid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

## 📊 Comparación: Antes vs Después

### **Retiro Activo**

| Elemento | Antes | Después |
|----------|-------|---------|
| Badge | "Disponible" | "✅ Disponible" |
| Precio | Mostrado | Mostrado |
| CTA | "Reservar" | "Reservar Mi Lugar" |
| Formulario | Sí | Sí |

### **Retiro Pasado**

| Elemento | Antes | Después |
|----------|-------|---------|
| Badge | "Disponible" ❌ | "📅 Experiencia Completada" ✅ |
| Precio | Mostrado ❌ | Oculto ✅ |
| CTA | "Reservar" ❌ | "Ver Testimonios" ✅ |
| Formulario | Sí ❌ | No ✅ |
| Galería | Normal | Destacada ✅ |
| Testimonios | Separado | Integrado ✅ |

---

## 🔧 Implementación Técnica

### **1. Función Helper (utils/retreatHelpers.js)**

```javascript
export const getRetreatStatus = (retreat) => {
  const now = new Date();
  const startDate = new Date(retreat.startDate);
  const endDate = new Date(retreat.endDate);

  if (endDate < now) {
    return 'past'; // Pasado
  } else if (startDate <= now && now <= endDate) {
    return 'active'; // En curso
  } else if (startDate > now) {
    return 'upcoming'; // Próximo
  }
  return 'unknown';
};

export const getRetreatBadge = (retreat) => {
  const status = getRetreatStatus(retreat);

  switch (status) {
    case 'past':
      return {
        variant: 'secondary',
        icon: '📅',
        text: 'Experiencia Completada'
      };
    case 'active':
      return {
        variant: 'success',
        icon: '🟢',
        text: 'En Curso'
      };
    case 'upcoming':
      if (retreat.availableSpots === 0) {
        return {
          variant: 'danger',
          icon: '❌',
          text: 'Completo'
        };
      } else if (retreat.availableSpots <= 3) {
        return {
          variant: 'warning',
          icon: '⚠️',
          text: `Quedan ${retreat.availableSpots} lugares`
        };
      } else {
        return {
          variant: 'success',
          icon: '✅',
          text: 'Disponible'
        };
      }
    default:
      return {
        variant: 'secondary',
        icon: '❓',
        text: 'Estado Desconocido'
      };
  }
};
```

### **2. Componente PastRetreatCard**

```jsx
// components/PastRetreatCard.jsx
import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const PastRetreatCard = ({ retreat }) => {
  const formatMonth = (date) => {
    return new Date(date).toLocaleDateString('es-ES', { month: 'long' });
  };

  const formatYear = (date) => {
    return new Date(date).getFullYear();
  };

  return (
    <Card className="past-retreat-card h-100 shadow-sm">
      {/* Galería de fotos */}
      <div className="photo-grid">
        {(retreat.images || []).slice(0, 4).map((img, i) => (
          <div key={i} className="photo-grid-item">
            <img
              src={img}
              alt={`${retreat.title} - Foto ${i + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>

      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="mb-2 align-self-start">
          📅 {formatMonth(retreat.startDate)} {formatYear(retreat.startDate)}
        </Badge>

        <Card.Title>
          <Link
            to={`/retreats/${retreat.slug || retreat._id}`}
            className="text-decoration-none"
          >
            {retreat.title}
          </Link>
        </Card.Title>

        <div className="mb-3 text-muted small">
          <div>📍 {retreat.location?.name || retreat.location}</div>
          <div>
            👥 {retreat.participantCount || retreat.maxParticipants} personas
          </div>
        </div>

        <div className="mt-auto">
          <Button
            to={`/retreats/${retreat.slug || retreat._id}`}
            outline="primary"
            size="sm"
            fullWidth
          >
            Ver Galería y Testimonios
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PastRetreatCard;
```

### **3. Actualizar RetreatDetailPage**

```jsx
// En RetreatDetailPage.jsx

// Agregar al inicio del componente
const status = getRetreatStatus(retreat);
const isPast = status === 'past';

// Modificar el render para ocultar secciones innecesarias
{!isPast && (
  <>
    {/* Precio */}
    {/* Countdown */}
    {/* Precios escalonados */}
    {/* Políticas */}
  </>
)}

{isPast && (
  <>
    {/* Galería destacada */}
    {/* Testimonios del retiro */}
    {/* CTA a próximos retiros */}
  </>
)}
```

---

## 🎯 Prioridades de Implementación

### **Fase 1: Crítico (Hacer Ya)**
1. ✅ Crear función `getRetreatStatus()` y `getRetreatBadge()`
2. ✅ Actualizar badges en RetreatsSection
3. ✅ Ocultar precio/disponibilidad en retiros pasados (RetreatDetailPage)
4. ✅ Cambiar CTA de "Reservar" a "Ver Testimonios" en retiros pasados

### **Fase 2: Importante (Esta Semana)**
1. ✅ Crear componente `PastRetreatCard`
2. ✅ Agregar sección "Experiencias Pasadas" en landing
3. ✅ Mejorar galería de fotos en retiros pasados
4. ✅ Filtrar testimonios por retiro en detalle

### **Fase 3: Mejoras (Próxima Semana)**
1. ✅ Agregar filtros en página /retiros
2. ✅ Agregar columna "Estado" en admin
3. ✅ Crear página dedicada "/experiencias-pasadas"
4. ✅ Agregar estadísticas (X personas, Y retiros realizados)

---

## 📝 Checklist de Verificación

### **Retiro Pasado en Lista**
- [ ] Badge dice "Experiencia Completada"
- [ ] NO muestra precio
- [ ] NO muestra disponibilidad
- [ ] Botón dice "Ver Testimonios"
- [ ] Galería de fotos visible

### **Retiro Pasado en Detalle**
- [ ] Badge dice "Experiencia Completada"
- [ ] NO muestra precio
- [ ] NO muestra countdown
- [ ] NO muestra formulario de consulta
- [ ] NO muestra precios escalonados
- [ ] NO muestra políticas
- [ ] SÍ muestra galería destacada
- [ ] SÍ muestra testimonios
- [ ] SÍ muestra CTA a próximos retiros

### **Retiro Activo (No Cambiar)**
- [ ] Badge dice "Disponible" o "Quedan X"
- [ ] SÍ muestra precio
- [ ] SÍ muestra countdown
- [ ] SÍ muestra formulario
- [ ] Botón dice "Reservar Mi Lugar"

---

## 💡 Recomendación Final

**Empezar con Fase 1** para solucionar el problema inmediato:
1. Badges correctos
2. Ocultar información innecesaria
3. CTAs apropiados

Luego continuar con Fase 2 y 3 para mejorar la experiencia completa.

¿Quieres que implemente la Fase 1 ahora mismo?
