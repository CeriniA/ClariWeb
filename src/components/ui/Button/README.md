# 🎨 Button Component - Soul Experiences

Componente de botón estandarizado que sigue el sistema de diseño de Soul Experiences.

## 📦 Importación

```jsx
import Button from '@/components/ui/Button';
// o
import { Button } from '@/components/ui/Button';
```

## 🎯 Uso Básico

```jsx
<Button>Click me</Button>
```

## 🎨 Variantes

### Solid (Relleno completo)

```jsx
<Button variant="primary">Primary (Ocre dorado)</Button>
<Button variant="secondary">Secondary (Verde azulado)</Button>
<Button variant="accent">Accent (Malva)</Button>
<Button variant="success">Success (WhatsApp verde)</Button>
<Button variant="danger">Danger (Rojo)</Button>
<Button variant="dark">Dark (Negro)</Button>
<Button variant="light">Light (Claro)</Button>
```

### Outline (Solo borde)

```jsx
<Button outline="primary">Outline Primary</Button>
<Button outline="secondary">Outline Secondary</Button>
<Button outline="accent">Outline Accent</Button>
<Button outline="success">Outline Success</Button>
<Button outline="danger">Outline Danger</Button>
<Button outline="dark">Outline Dark</Button>
```

### Ghost (Sin borde)

```jsx
<Button variant="ghost">Ghost Button</Button>
```

## 📏 Tamaños

```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

## 🎭 Estados

### Deshabilitado

```jsx
<Button disabled>Deshabilitado</Button>
```

### Cargando

```jsx
<Button loading>Cargando...</Button>
```

### Ancho completo

```jsx
<Button fullWidth>Ancho Completo</Button>
```

## 🔗 Como Links

### Link Interno (React Router)

```jsx
<Button to="/retiros">Ver Retiros</Button>
```

### Link Externo

```jsx
<Button href="https://google.com" external>
  Abrir en nueva pestaña
</Button>
```

## 🎨 Con Iconos

```jsx
<Button icon="✨">Con Icono</Button>
<Button variant="success" icon="💬">WhatsApp</Button>
<Button variant="danger" icon="🗑️">Eliminar</Button>
```

## 📋 Props Completas

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `string` | `'primary'` | Variante del botón: `'primary'`, `'secondary'`, `'accent'`, `'success'`, `'danger'`, `'dark'`, `'light'`, `'ghost'` |
| `outline` | `string` | `null` | Variante outline: `'primary'`, `'secondary'`, `'accent'`, `'success'`, `'danger'`, `'dark'` |
| `size` | `string` | `'md'` | Tamaño: `'sm'`, `'md'`, `'lg'` |
| `fullWidth` | `boolean` | `false` | Botón de ancho completo |
| `loading` | `boolean` | `false` | Estado de carga con spinner |
| `disabled` | `boolean` | `false` | Botón deshabilitado |
| `type` | `string` | `'button'` | Tipo de botón: `'button'`, `'submit'`, `'reset'` |
| `to` | `string` | `null` | Ruta interna (React Router) |
| `href` | `string` | `null` | URL externa |
| `external` | `boolean` | `false` | Abrir link externo en nueva pestaña |
| `onClick` | `function` | `undefined` | Función al hacer clic |
| `icon` | `ReactNode` | `null` | Icono (emoji o componente) |
| `className` | `string` | `''` | Clases CSS adicionales |
| `children` | `ReactNode` | - | Contenido del botón |

## 🎯 Casos de Uso Reales

### CTA (Call to Action)

```jsx
<Button variant="secondary" size="lg" fullWidth>
  Consultar Disponibilidad
</Button>
```

### Formulario

```jsx
<Button type="submit" variant="primary" size="lg" loading={submitting}>
  Enviar Consulta
</Button>

<Button type="button" variant="light" onClick={handleCancel}>
  Cancelar
</Button>
```

### WhatsApp

```jsx
<Button 
  variant="success" 
  icon="💬" 
  href="https://wa.me/5493512345678"
  external
>
  Escribir por WhatsApp
</Button>
```

### Admin Dashboard - Acciones en Tabla

```jsx
<Button size="sm" outline="primary" icon="👁️" to={`/admin/retreats/${id}`}>
  Ver
</Button>

<Button size="sm" outline="secondary" icon="✏️" to={`/admin/retreats/${id}/edit`}>
  Editar
</Button>

<Button size="sm" outline="danger" icon="🗑️" onClick={handleDelete}>
  Eliminar
</Button>
```

### Admin Dashboard - Toggle States

```jsx
<Button 
  size="sm" 
  variant={isApproved ? "success" : "outline-success"}
  icon={isApproved ? "✅" : "❌"}
  onClick={handleToggleApproval}
>
  {isApproved ? 'Aprobado' : 'Aprobar'}
</Button>
```

### Navegación

```jsx
<Button outline="secondary" to="/" icon="←">
  Volver
</Button>
```

## 🎨 Paleta de Colores

El componente usa las variables CSS definidas en `index.css`:

```css
--color-primary: #ebbe6f;    /* Ocre dorado */
--color-secondary: #75a6a8;  /* Verde azulado */
--color-accent: #81536F;     /* Malva */
```

## ♿ Accesibilidad

- ✅ Soporte completo de teclado
- ✅ Estados `:focus` visibles
- ✅ Estados `:disabled` correctos
- ✅ Links externos con `rel="noopener noreferrer"`

## 📱 Responsive

El componente es completamente responsive y ajusta tamaños en mobile:

```css
@media (max-width: 768px) {
  /* Tamaños ajustados automáticamente */
}
```

## 🔄 Migración desde Bootstrap

### Antes (Bootstrap)

```jsx
import { Button } from 'react-bootstrap';

<Button variant="primary" size="lg">Click</Button>
```

### Ahora (Soul Experiences)

```jsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="lg">Click</Button>
```

**Cambios necesarios:**
- `variant="outline-primary"` → `outline="primary"`
- Estilos inline ya no son necesarios
- Colores automáticamente de la paleta

## 🚀 Mejores Prácticas

1. **Usa variantes semánticas:**
   - `primary` para acciones principales
   - `secondary` para CTAs importantes
   - `success` para WhatsApp
   - `danger` para acciones destructivas
   - `outline` para acciones secundarias

2. **Tamaños apropiados:**
   - `lg` para CTAs y formularios
   - `md` para navegación
   - `sm` para acciones en tablas

3. **Estados de carga:**
   ```jsx
   <Button loading={isSubmitting}>
     {isSubmitting ? 'Enviando...' : 'Enviar'}
   </Button>
   ```

4. **Accesibilidad:**
   ```jsx
   <Button type="submit">Enviar</Button>  // ✅ Correcto
   <Button onClick={handleSubmit}>Enviar</Button>  // ❌ Evitar en forms
   ```

## 🐛 Troubleshooting

### El botón no tiene los colores correctos
- Verifica que `index.css` esté importado en `main.jsx`
- Verifica que las variables CSS estén definidas en `:root`

### Los estilos no se aplican
- Asegúrate de importar desde `@/components/ui/Button`
- Verifica que `Button.module.css` esté en la misma carpeta

### El link no funciona
- Para links internos usa `to="/ruta"`
- Para links externos usa `href="https://..." external`
