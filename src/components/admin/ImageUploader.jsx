import React, { useState, useRef } from 'react';
import { Button, Alert, Spinner, Card, Form } from 'react-bootstrap';
import cloudinaryService from '../../services/cloudinary';

const ImageUploader = ({ 
  images = [], 
  onImagesChange, 
  onImageUploaded, 
  folder = 'retiros', 
  className = '',
  maxImages = 10 
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar imagen
    const validation = cloudinaryService.validateImage(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setError('');
    setSuccess('');
    setUploading(true);

    try {
      // Subir a Cloudinary
      const result = await cloudinaryService.uploadImage(file, {
        folder: folder,
        public_id: `${folder}_${Date.now()}`
      });

      if (result.success) {
        setSuccess('¡Imagen subida exitosamente!');
        
        // Agregar nueva imagen al array
        if (onImagesChange) {
          const newImages = [...images.filter(img => img.trim() !== ''), result.url];
          onImagesChange(newImages);
        }
        
        // Callback legacy para compatibilidad
        if (onImageUploaded) {
          onImageUploaded(result.url, result);
        }

        // Limpiar input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.error || 'Error al subir la imagen');
      }
    } catch (err) {
      setError('Error inesperado al subir la imagen');
      console.error('Error:', err);
    } finally {
      setUploading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (indexToRemove) => {
    if (onImagesChange) {
      const newImages = images.filter((_, index) => index !== indexToRemove);
      onImagesChange(newImages);
    }
  };

  return (
    <div className={className}>
      <Card className="border-2 border-dashed" style={{ borderColor: '#dee2e6' }}>
        <Card.Body className="text-center p-4">
          <div className="mb-3">
            <i className="bi bi-cloud-upload" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
          </div>
          
          <h6 className="mb-2">Subir Imagen a Cloudinary</h6>
          <p className="text-muted small mb-3">
            Arrastra una imagen aquí o haz clic para seleccionar
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <Button
            variant="outline-primary"
            onClick={triggerFileSelect}
            disabled={uploading}
            className="mb-3"
          >
            {uploading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Subiendo...
              </>
            ) : (
              <>
                📁 Seleccionar Imagen
              </>
            )}
          </Button>

          <div className="small text-muted">
            <strong>Formatos:</strong> JPG, PNG, WebP, GIF<br />
            <strong>Tamaño máximo:</strong> 10MB
          </div>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mt-3 mb-0">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mt-3 mb-0">
          <i className="bi bi-check-circle me-2"></i>
          {success}
        </Alert>
      )}

      {/* Vista previa de imágenes */}
      {images && images.length > 0 && images.some(img => img.trim() !== '') && (
        <div className="mt-3">
          <h6>Imágenes actuales:</h6>
          <div className="row">
            {images.filter(img => img.trim() !== '').map((imageUrl, index) => (
              <div key={index} className="col-md-3 mb-3">
                <div className="position-relative">
                  <img 
                    src={imageUrl} 
                    alt={`Imagen ${index + 1}`}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0 m-1"
                    onClick={() => removeImage(index)}
                    style={{ borderRadius: '50%', width: '30px', height: '30px', padding: '0' }}
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
