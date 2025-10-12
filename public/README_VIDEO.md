# 🎬 Video de YouTube Implementado en las Cards

## ✅ Estado Actual
**Video de YouTube**: https://youtu.be/Xzw0Nx0IzUA
**Estado**: ✅ ACTIVADO con thumbnail de YouTube

## 🎨 Cómo Funciona Actualmente
- Usa la **imagen de vista previa** del video de YouTube
- **Dividida en 3 partes** entre las cards
- **Overlays de colores** específicos para cada concepto
- **Efectos visuales** mejorados con filtros

## 🔄 Para Usar Video Real (Recomendado)
Si quieres el video en movimiento, descarga el video y súbelo localmente:

```javascript
// Cambiar en ServicesSection.jsx:
const backgroundVideoUrl = "/videos/soul-experiences-background.mp4";
// Y reemplazar el div de imagen por:
<video autoPlay muted loop playsInline style={{...}}>
  <source src={backgroundVideoUrl} type="video/mp4" />
</video>
```

## 🎨 Cómo Funciona
- **Un solo video** se reproduce en las 3 cards
- **Card 1 (AUTOCONOCIMIENTO)**: Muestra la parte izquierda (0%)
- **Card 2 (SANACIÓN EMOCIONAL)**: Muestra la parte central (50%)
- **Card 3 (RENOVACIÓN)**: Muestra la parte derecha (100%)

## 🎯 Efectos Visuales
- **Overlay de colores**: Cada card tiene su overlay (dorado, malva, verde azulado)
- **Texto legible**: Automáticamente cambia a blanco con sombra
- **Autoplay**: El video se reproduce automáticamente en loop
- **Responsive**: Funciona en todos los dispositivos

## 📱 Formatos Recomendados
- **Formato**: MP4 (H.264)
- **Resolución**: 1920x1080 o superior
- **Duración**: 10-30 segundos (se reproduce en loop)
- **Orientación**: Horizontal/landscape
- **Peso**: Máximo 10MB para carga rápida

## 🎬 Consejos para el Video
- **Contenido suave**: Movimientos lentos y fluidos
- **Sin texto**: El texto va encima del video
- **Colores neutros**: Para que los overlays funcionen bien
- **Temática**: Naturaleza, meditación, yoga, paisajes serenos
