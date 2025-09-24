# 🎨 Guía de Ilustraciones SVG

## Ilustraciones Disponibles

### Ilustraciones Principales
- `ojo-espiritual` - Ojo espiritual para autoconocimiento
- `llama-interior` - Llama interior para sanación
- `brote-espiritual` - Brote para crecimiento espiritual
- `brote-esperanza` - Brote de esperanza para transformación
- `estrella-guia` - Estrella guía para dirección
- `estrella-esperanza` - Estrella de esperanza
- `estrella-luz` - Estrella de luz
- `estrella-luz-2` - Estrella brillante alternativa
- `luna-fina` - Luna creciente
- `luna-fina-180` - Luna creciente invertida
- `red-copo-nieve` - Copo de nieve decorativo
- `rombo-pin` - Rombo espiritual
- `elemento-mistico-1` - Elemento místico decorativo
- `elemento-mistico-2` - Elemento místico alternativo

## Cómo Usar

### Uso Básico
```jsx
<Illustration 
  name="ojo-espiritual" 
  alt="Autoconocimiento" 
  style={{ width: '60px' }}
/>
```

### Con Color Personalizado
```jsx
<Illustration 
  name="llama-interior" 
  alt="Llama interior" 
  color="primary"
  style={{ width: '80px' }}
/>
```

### Con Animación
```jsx
<Illustration 
  name="estrella-guia" 
  alt="Estrella guía" 
  animate={true}
  color="gold"
  opacity={0.7}
/>
```

## Colores Disponibles

- `primary` - Color primario del sitio (púrpura)
- `secondary` - Color secundario 
- `purple` - Púrpura
- `gold` - Dorado
- `white` - Blanco
- `light` - Claro
- `dark` - Oscuro

## Props Disponibles

| Prop | Tipo | Descripción | Ejemplo |
|------|------|-------------|---------|
| `name` | string | Nombre de la ilustración (requerido) | `"ojo-espiritual"` |
| `alt` | string | Texto alternativo | `"Autoconocimiento"` |
| `color` | string | Color de la ilustración | `"primary"` |
| `opacity` | number | Opacidad (0-1) | `0.7` |
| `animate` | boolean | Activar animación flotante | `true` |
| `style` | object | Estilos CSS personalizados | `{{ width: '60px' }}` |
| `className` | string | Clases CSS adicionales | `"my-class"` |

## Ejemplos de Uso por Sección

### Hero Section
```jsx
<Illustration 
  name="estrella-esperanza" 
  alt="Estrella de esperanza" 
  animate={true}
  color="gold"
  style={{ width: '80px' }}
  opacity={0.6}
/>
```

### About Section
```jsx
<Illustration 
  name="brote-espiritual" 
  alt="Crecimiento espiritual" 
  color="primary"
  style={{ width: '50px', marginRight: '15px' }}
/>
```

### Services Cards
```jsx
<Illustration 
  name="ojo-espiritual" 
  alt="Autoconocimiento" 
  style={{ width: '80px' }}
  animate={true}
  color="primary"
/>
```

### Elementos Decorativos
```jsx
<Illustration 
  name="luna-fina-180" 
  alt="Luna creciente" 
  style={{ width: '35px' }}
  animate={true}
  color="light"
  opacity={0.5}
/>
```

## Consejos de Diseño

1. **Consistencia de Color**: Usa `primary` y `gold` como colores principales
2. **Tamaños Apropiados**: 
   - Iconos pequeños: 30-40px
   - Iconos medianos: 50-80px
   - Ilustraciones principales: 80-200px
3. **Opacidad para Decorativos**: Usa opacity 0.3-0.7 para elementos de fondo
4. **Animaciones Sutiles**: Usa `animate={true}` con moderación
5. **Responsive**: Oculta elementos decorativos en móviles con `d-none d-lg-block`

## Compatibilidad

El componente mantiene compatibilidad con los nombres antiguos:
- `meditation` → `ojo-espiritual`
- `spiritual` → `llama-interior`
- `nature` → `brote-espiritual`
- `harmony` → `luna-fina`
- `transformation` → `estrella-guia`
