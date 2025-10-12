// Sistema híbrido de imágenes: estáticas + dinámicas

// Imágenes estáticas de Clari (no cambian)
import profileImg1 from '../assets/FOTO CLARI/IMG-20220309-WA0134.jpg';
import profileImg2 from '../assets/FOTO CLARI/IMG-20220310-WA0054.jpg';
import profileImg3 from '../assets/FOTO CLARI/IMG-20220426-WA0069.jpg';
import profileImg4 from '../assets/FOTO CLARI/IMG-20230122-WA0115(1).jpg';
import profileImg5 from '../assets/FOTO CLARI/IMG-20230122-WA0118.jpg';

// Imágenes de perfil de Clari (para usar en Settings)
export const clariPhotos = [
  profileImg1,
  profileImg2,
  profileImg3,
  profileImg4,
  profileImg5
];

// Función para manejar imágenes de retiros (dinámicas desde backend)
export const getRetreatImage = (imageUrl, fallbackIndex = 0, size = 'medium') => {
  // Si hay URL de imagen válida del backend, usarla
  if (imageUrl && isValidImageUrl(imageUrl)) {
    // Tamaños optimizados según el uso
    const sizes = {
      small: [300, 240],    // Para thumbnails pequeños
      medium: [800, 600],   // Para cards normales (mejor calidad)
      large: [1200, 900],   // Para hero/destacados
      hero: [1920, 1080]    // Para fondos fullscreen
    };
    
    const [width, height] = sizes[size] || sizes.medium;
    return optimizeImageUrl(imageUrl, width, height);
  }
  
  // Fallback: usar una foto de Clari como placeholder
  return clariPhotos[fallbackIndex % clariPhotos.length];
};

// Función para validar URLs de imágenes
export const isValidImageUrl = (url) => {
  if (!url) return false;
  
  // Verificar si es una URL válida
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Función para obtener fotos de Clarisa (siempre locales)
export const getClariPhotos = () => {
  return clariPhotos.slice(); // Devolver una copia del array
};

// Función para obtener imagen principal de perfil (siempre local)
export const getMainProfileImage = () => {
  return clariPhotos[0]; // Siempre usar la primera foto de Clarisa
};
// Función para generar placeholder de imagen
export const getImagePlaceholder = (width = 400, height = 300, text = 'Imagen') => {
  return `https://via.placeholder.com/${width}x${height}/ebbe6f/43304a?text=${encodeURIComponent(text)}`;
};

// Función para optimizar URLs de imágenes externas
export const optimizeImageUrl = (url, width, height) => {
  if (!url || !isValidImageUrl(url)) return url;

  // Si es una imagen de Unsplash, agregar parámetros de optimización
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&h=${height}&fit=crop&crop=center`;
  }
  
  // Si es una imagen de Cloudinary, agregar transformaciones
  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`);
  }
  
  return url;
};
