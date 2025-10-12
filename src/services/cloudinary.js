// Servicio para subir imágenes a Cloudinary
class CloudinaryService {
  constructor() {
    // Configuración pública de Cloudinary (segura para el frontend)
    this.cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'tu-cloud-name';
    this.uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default';
    this.apiUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
  }

  /**
   * Sube una imagen a Cloudinary
   * @param {File} file - Archivo de imagen
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<Object>} - Respuesta con URL de la imagen
   */
  async uploadImage(file, options = {}) {
    try {
      const formData = new FormData();
      
      // Datos requeridos
      formData.append('file', file);
      
      // Intentar con preset, si no existe usar configuración básica
      if (this.uploadPreset && this.uploadPreset !== 'ml_default') {
        formData.append('upload_preset', this.uploadPreset);
      } else {
        // Configuración básica sin preset
        formData.append('upload_preset', 'ml_default');
      }
      
      // Opciones adicionales
      if (options.folder) {
        formData.append('folder', options.folder);
      }
      
      if (options.public_id) {
        formData.append('public_id', options.public_id);
      }

      // Las transformaciones se configuran en el preset, no aquí para uploads unsigned

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Cloudinary Error:', response.status, errorData);
        throw new Error(`Error ${response.status}: ${response.statusText} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        url: data.secure_url,
        publicId: data.public_id,
        width: data.width,
        height: data.height,
        format: data.format,
        bytes: data.bytes
      };

    } catch (error) {
      console.error('Error subiendo imagen a Cloudinary:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Genera URL optimizada para diferentes tamaños
   * @param {string} publicId - ID público de la imagen
   * @param {Object} transformations - Transformaciones a aplicar
   * @returns {string} - URL optimizada
   */
  getOptimizedUrl(publicId, transformations = {}) {
    const {
      width = 'auto',
      height = 'auto',
      crop = 'fill',
      quality = 'auto',
      format = 'auto'
    } = transformations;

    return `https://res.cloudinary.com/${this.cloudName}/image/upload/w_${width},h_${height},c_${crop},q_${quality},f_${format}/${publicId}`;
  }

  /**
   * Valida si un archivo es una imagen válida
   * @param {File} file - Archivo a validar
   * @returns {Object} - Resultado de la validación
   */
  validateImage(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Formato no válido. Use JPG, PNG, WebP o GIF.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'La imagen es muy grande. Máximo 10MB.'
      };
    }

    return { valid: true };
  }
}

export default new CloudinaryService();
