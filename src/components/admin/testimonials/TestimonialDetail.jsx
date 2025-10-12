import React, { useState, useEffect } from 'react';
import { 
  Card, Badge, Button, Alert, Spinner, Row, Col 
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { testimonialsAPI } from '../../../services/api';

const TestimonialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadTestimonial();
  }, [id]);

  const loadTestimonial = async () => {
    try {
      setLoading(true);
      const response = await testimonialsAPI.getById(id);
      setTestimonial(response.data.data);
    } catch (err) {
      console.error('Error cargando testimonio:', err);
      setError('Error al cargar el testimonio');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updateData) => {
    try {
      setUpdating(true);
      setError('');
      const response = await testimonialsAPI.update(id, updateData);
      setTestimonial(response.data.data);
      setSuccess('Testimonio actualizado exitosamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error actualizando testimonio:', err);
      setError(err.response?.data?.error || 'Error al actualizar el testimonio');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando testimonio...</p>
      </div>
    );
  }

  if (error && !testimonial) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!testimonial) {
    return <Alert variant="warning">Testimonio no encontrado</Alert>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-2">Testimonio de {testimonial.participantName}</h1>
          <div className="d-flex gap-2">
            <Badge bg={testimonial.isApproved ? 'success' : 'warning'} className="fs-6">
              {testimonial.isApproved ? '✅ Aprobado' : '⏳ Pendiente'}
            </Badge>
            {testimonial.isFeatured && (
              <Badge bg="primary" className="fs-6">⭐ Destacado</Badge>
            )}
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button
            as={Link}
            to={`/admin/testimonials/${testimonial._id}/edit`}
            variant="primary"
          >
            ✏️ Editar
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/admin/testimonials')}
          >
            ← Volver
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col lg={8}>
          {/* Vista previa del testimonio */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">💬 Vista Previa (como se ve en la landing)</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                {testimonial.participantPhoto && (
                  <img 
                    src={testimonial.participantPhoto} 
                    alt={testimonial.participantName}
                    className="rounded-circle mb-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                )}
                <div className="mb-3" style={{ fontSize: '1.5em' }}>
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="blockquote">
                  <p className="mb-3" style={{ fontSize: '1.1em', fontStyle: 'italic' }}>
                    "{testimonial.comment}"
                  </p>
                  <footer className="blockquote-footer">
                    <cite title="Source Title" style={{ fontSize: '1em' }}>
                      {testimonial.participantName}
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </Card.Body>
          </Card>

          {/* Información del retiro */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">🏔️ Retiro Relacionado</h5>
            </Card.Header>
            <Card.Body>
              {testimonial.retreat ? (
                <div>
                  <h6 className="text-primary">{testimonial.retreat.title}</h6>
                  <Row>
                    <Col md={6}>
                      <div className="mb-2">
                        <strong>Fechas:</strong> 
                        <div>
                          {new Date(testimonial.retreat.startDate).toLocaleDateString('es-ES')} - 
                          {new Date(testimonial.retreat.endDate).toLocaleDateString('es-ES')}
                        </div>
                      </div>
                      <div className="mb-2">
                        <strong>Lugar:</strong> {testimonial.retreat.location?.name}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-2">
                        <strong>Precio:</strong> ${testimonial.retreat.price?.toLocaleString()} ARS
                      </div>
                      <div className="mb-2">
                        <strong>Participantes:</strong> {testimonial.retreat.currentParticipants}/{testimonial.retreat.maxParticipants}
                      </div>
                    </Col>
                  </Row>
                  <Button
                    as={Link}
                    to={`/admin/retreats/${testimonial.retreat._id}`}
                    variant="outline-primary"
                    size="sm"
                  >
                    Ver Retiro Completo
                  </Button>
                </div>
              ) : (
                <Alert variant="warning">Retiro no encontrado</Alert>
              )}
            </Card.Body>
          </Card>

          {/* Notas internas */}
          {testimonial.notes && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">📝 Notas Internas</h5>
              </Card.Header>
              <Card.Body>
                <div style={{ whiteSpace: 'pre-wrap' }}>{testimonial.notes}</div>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col lg={4}>
          {/* Información del participante */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">👤 Información del Participante</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Nombre:</strong>
                <div>{testimonial.participantName}</div>
              </div>
              
              {testimonial.participantEmail && (
                <div className="mb-3">
                  <strong>Email:</strong>
                  <div>
                    <a href={`mailto:${testimonial.participantEmail}`}>
                      {testimonial.participantEmail}
                    </a>
                  </div>
                </div>
              )}

              {testimonial.participantPhoto && (
                <div className="mb-3">
                  <strong>Foto:</strong>
                  <div className="mt-2">
                    <img 
                      src={testimonial.participantPhoto} 
                      alt={testimonial.participantName}
                      className="img-fluid rounded"
                      style={{ maxWidth: '150px' }}
                    />
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Acciones rápidas */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">⚡ Acciones Rápidas</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button
                  variant={testimonial.isApproved ? "warning" : "success"}
                  onClick={() => handleUpdate({ isApproved: !testimonial.isApproved })}
                  disabled={updating}
                >
                  {testimonial.isApproved ? '❌ Desaprobar' : '✅ Aprobar'}
                </Button>
                
                <Button
                  variant={testimonial.isFeatured ? "outline-warning" : "warning"}
                  onClick={() => handleUpdate({ isFeatured: !testimonial.isFeatured })}
                  disabled={updating}
                >
                  {testimonial.isFeatured ? '⭐ Quitar Destacado' : '⭐ Destacar'}
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Información adicional */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">ℹ️ Información Adicional</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>Calificación:</strong>
                <div>{renderStars(testimonial.rating)} ({testimonial.rating}/5)</div>
              </div>

              {testimonial.token && (
                <div className="mb-2">
                  <strong>Token usado:</strong>
                  <div><code>{testimonial.token}</code></div>
                </div>
              )}
              
              <div className="mb-2">
                <strong>Creado:</strong>
                <div>{formatDate(testimonial.createdAt)}</div>
              </div>
              
              <div className="mb-2">
                <strong>Actualizado:</strong>
                <div>{formatDate(testimonial.updatedAt)}</div>
              </div>

              {testimonial.approvedAt && (
                <div className="mb-0">
                  <strong>Aprobado:</strong>
                  <div>{formatDate(testimonial.approvedAt)}</div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TestimonialDetail;
