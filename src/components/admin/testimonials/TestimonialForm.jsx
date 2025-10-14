import React, { useState, useEffect } from 'react';
import { 
  Card, Form, Button, Alert, Spinner, Row, Col, Badge 
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { testimonialsAPI, retreatsAPI } from '../../../services/api';

const TestimonialForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    participantName: '',
    participantEmail: '',
    participantPhoto: '',
    retreat: '',
    rating: 5,
    comment: '',
    isApproved: false,
    isFeatured: false,
    notes: ''
  });

  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRetreats, setLoadingRetreats] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadRetreats();
    if (isEdit) {
      loadTestimonial();
    }
  }, [id, isEdit]);

  const loadRetreats = async () => {
    try {
      setLoadingRetreats(true);
      const response = await retreatsAPI.getAll({ limit: 100 });
      setRetreats(response.data.data);
    } catch (err) {
      console.error('Error cargando retiros:', err);
      setError('Error al cargar los retiros. Por favor, recarga la página.');
    } finally {
      setLoadingRetreats(false);
    }
  };

  const loadTestimonial = async () => {
    try {
      setLoading(true);
      const response = await testimonialsAPI.getById(id);
      const testimonial = response.data.data;
      
      setFormData({
        participantName: testimonial.participantName || '',
        participantEmail: testimonial.participantEmail || '',
        participantPhoto: testimonial.participantPhoto || '',
        retreat: testimonial.retreat?._id || '',
        rating: testimonial.rating || 5,
        comment: testimonial.comment || '',
        isApproved: testimonial.isApproved || false,
        isFeatured: testimonial.isFeatured || false,
        notes: testimonial.notes || ''
      });
    } catch (err) {
      console.error('Error cargando testimonio:', err);
      setError('Error al cargar el testimonio');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const submitData = {
        ...formData,
        rating: parseInt(formData.rating)
      };

      if (isEdit) {
        await testimonialsAPI.update(id, submitData);
        setSuccess('Testimonio actualizado exitosamente');
      } else {
        await testimonialsAPI.create(submitData);
        setSuccess('Testimonio creado exitosamente');
      }

      setTimeout(() => {
        navigate('/admin/testimonials');
      }, 2000);

    } catch (err) {
      console.error('Error guardando testimonio:', err);
      setError(err.response?.data?.error || 'Error al guardar el testimonio');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading && isEdit) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando testimonio...</p>
      </div>
    );
  }

  if (loadingRetreats) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando formulario...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>⭐ {isEdit ? 'Editar Testimonio' : 'Nuevo Testimonio'}</h1>
        <Button variant="outline-secondary" onClick={() => navigate('/admin/testimonials')}>
          ← Volver
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
          <div className="mt-2">
            <Button size="sm" variant="outline-danger" onClick={loadRetreats}>
              🔄 Reintentar
            </Button>
          </div>
        </Alert>
      )}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            {/* Información del participante */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">👤 Información del Participante</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre del Participante *</Form.Label>
                      <Form.Control
                        type="text"
                        name="participantName"
                        value={formData.participantName}
                        onChange={handleChange}
                        required
                        placeholder="Nombre completo"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email del Participante</Form.Label>
                      <Form.Control
                        type="email"
                        name="participantEmail"
                        value={formData.participantEmail}
                        onChange={handleChange}
                        placeholder="email@ejemplo.com"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>URL de Foto del Participante</Form.Label>
                  <Form.Control
                    type="url"
                    name="participantPhoto"
                    value={formData.participantPhoto}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/foto.jpg"
                  />
                  <Form.Text className="text-muted">
                    URL de la foto del participante (opcional)
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Testimonio */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">💬 Testimonio</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Retiro *</Form.Label>
                  <Form.Select
                    name="retreat"
                    value={formData.retreat}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar retiro...</option>
                    {retreats.map(retreat => (
                      <option key={retreat._id} value={retreat._id}>
                        {retreat.title} - {new Date(retreat.startDate).toLocaleDateString('es-ES')}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Calificación *</Form.Label>
                  <div className="d-flex align-items-center gap-3">
                    <Form.Range
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      step="1"
                    />
                    <div style={{ minWidth: '120px', fontSize: '1.2em' }}>
                      {renderStars(parseInt(formData.rating))}
                    </div>
                    <Badge bg="primary">{formData.rating}/5</Badge>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Comentario *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    placeholder="Escribe aquí el testimonio del participante..."
                    maxLength={1000}
                  />
                  <Form.Text className="text-muted">
                    {formData.comment.length}/1000 caracteres
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Notas internas */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">📝 Notas Internas</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Notas (solo para administradores)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Notas internas sobre este testimonio..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            {/* Configuración */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">⚙️ Configuración</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="isApproved"
                    checked={formData.isApproved}
                    onChange={handleChange}
                    label="✅ Testimonio aprobado"
                  />
                  <Form.Text className="text-muted">
                    Solo los testimonios aprobados se muestran en la landing
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    label="⭐ Testimonio destacado"
                  />
                  <Form.Text className="text-muted">
                    Los testimonios destacados aparecen primero en la landing
                  </Form.Text>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Vista previa */}
            {formData.comment && (
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">👁️ Vista Previa</h5>
                </Card.Header>
                <Card.Body>
                  <div className="text-center">
                    <div className="mb-2" style={{ fontSize: '1.2em' }}>
                      {renderStars(parseInt(formData.rating))}
                    </div>
                    <blockquote className="blockquote">
                      <p className="mb-2">"{formData.comment}"</p>
                      <footer className="blockquote-footer">
                        <cite title="Source Title">
                          {formData.participantName || 'Participante'}
                        </cite>
                      </footer>
                    </blockquote>
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Acciones */}
            <Card>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        {isEdit ? 'Actualizando...' : 'Creando...'}
                      </>
                    ) : (
                      <>
                        {isEdit ? '💾 Actualizar Testimonio' : '✨ Crear Testimonio'}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate('/admin/testimonials')}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TestimonialForm;
