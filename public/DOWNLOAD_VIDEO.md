# 🎬 Cómo Descargar y Usar el Video de YouTube

## ✅ Estado Actual
- **Imagen dividida**: ✅ Funcionando en las 3 cards
- **Posiciones corregidas**: 0%, 33.33%, 66.66%
- **Video en movimiento**: ⏳ Pendiente de descarga

## 📥 Paso 1: Descargar el Video
### Opción A: Online (Recomendado)
1. Ve a: https://yt1s.com/en
2. Pega la URL: `https://youtu.be/Xzw0Nx0IzUA`
3. Selecciona **MP4** calidad **720p** o **1080p**
4. Descarga el archivo

### Opción B: Con yt-dlp (Avanzado)
```bash
# Instalar yt-dlp
pip install yt-dlp

# Descargar video
yt-dlp -f "best[height<=1080]" https://youtu.be/Xzw0Nx0IzUA
```

## 📁 Paso 2: Colocar el Video
1. Crea la carpeta: `public/videos/`
2. Renombra el archivo a: `soul-experiences.mp4`
3. Colócalo en: `public/videos/soul-experiences.mp4`

## ⚙️ Paso 3: Activar Video en Movimiento
En `ServicesSection.jsx`, cambia esta línea:
```javascript
// ANTES:
const useMovingVideo = false;

// DESPUÉS:
const useMovingVideo = true; // ✅ ACTIVAR VIDEO
```

## 🎯 Resultado Esperado
- **Video dividido**: Se reproduce en las 3 cards simultáneamente
- **Sincronización**: Mismo video, diferentes partes
- **Loop infinito**: Se repite automáticamente
- **Sin sonido**: Muted para autoplay

## 📱 Especificaciones Recomendadas
- **Formato**: MP4 (H.264)
- **Resolución**: 1920x1080 (Full HD)
- **Duración**: El video completo (se reproduce en loop)
- **Peso**: Máximo 20MB para carga rápida
- **Orientación**: Horizontal/landscape

## 🔧 Troubleshooting
Si el video no se reproduce:
1. Verifica que esté en `public/videos/soul-experiences.mp4`
2. Asegúrate que sea formato MP4
3. Revisa la consola del navegador por errores
4. Prueba con un video más pequeño primero
