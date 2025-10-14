import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Spinner, Form, Button } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { testimonialsAPI, tokensAPI } from '../services/api';

const PublicTestimonialPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    participantName: '',
    email: '',
    rating: 5,
    comment: '',
    photos: []
  });

  useEffect(() => {
    if (!token) {
      setError('No se proporcionó un token válido');
      setLoading(false);
      return;
    }
    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      setLoading(true);
      const response = await tokensAPI.validate(token);
      
      if (response.data.success) {
        setTokenData(response.data.data);
        setFormData(prev => ({
          ...prev,
          participantName: response.data.data.participantName,
          email: response.data.data.email
        }));
      }
    } catch (err) {
      console.error('Error validando token:', err);
      setError(err.response?.data?.error || 'Token inválido, expirado o ya utilizado');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const testimonialData = {
        ...formData,
        retreat: tokenData.retreat.id,
        token: token
      };

      const response = await testimonialsAPI.createPublic(testimonialData);
      
      setSuccess('¡Gracias por tu testimonio! Será revisado y publicado pronto.');
      
      // Limpiar formulario
      setFormData({
        participantName: tokenData.participantName,
        email: tokenData.email,
        rating: 5,
        comment: '',
        photos: []
      });

      // Scroll al mensaje de éxito
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error enviando testimonio:', err);
      setError(
        err.response?.data?.error || 
        err.response?.data?.messages?.join(', ') || 
        'Error al enviar el testimonio. Por favor, intenta nuevamente.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
          <p className="mt-3">Validando token...</p>
        </div>
      </Container>
    );
  }

  if (error && !tokenData) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={6}>
            <Alert variant="danger">
              <Alert.Heading>❌ Token Inválido</Alert.Heading>
              <p>{error}</p>
              <hr />
              <p className="mb-0">
                Si crees que esto es un error, por favor contacta a Soul Experiences.
              </p>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          {/* Encabezado */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold mb-3" style={{ color: 'var(--color-text)' }}>
              ✨ Comparte tu Experiencia
            </h1>
            <p className="lead mb-2">
              Retiro: <strong>{tokenData?.retreat.title}</strong>
            </p>
            <p className="text-muted">
              {new Date(tokenData?.retreat.startDate).toLocaleDateString('es-ES')} - {' '}
              {new Date(tokenData?.retreat.endDate).toLocaleDateString('es-ES')}
            </p>
          </div>

          {/* Mensajes */}
          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess('')}>
              <Alert.Heading>✅ ¡Testimonio Enviado!</Alert.Heading>
              <p>{success}</p>
            </Alert>
          )}

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Formulario */}
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4 p-md-5">
              <Form onSubmit={handleSubmit}>
                {/* Información del participante (solo lectura) */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tu nombre</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.participantName}
                        disabled
                        style={{ backgroundColor: '#f8f9fa' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tu email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        disabled
                        style={{ backgroundColor: '#f8f9fa' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Rating */}
                <Form.Group className="mb-4">
                  <Form.Label>
                    ⭐ Calificación general *
                  </Form.Label>
                  <div className="d-flex align-items-center gap-3">
                    <Form.Range
                      name="rating"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={handleChange}
                      disabled={submitting}
                    />
                    <div style={{ minWidth: '120px', textAlign: 'center' }}>
                      <span style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>
                        {'⭐'.repeat(formData.rating)}
                      </span>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>
                        {formData.rating} de 5
                      </div>
                    </div>
                  </div>
                </Form.Group>

                {/* Comentario */}
                <Form.Group className="mb-4">
                  <Form.Label>
                    💬 Tu experiencia *
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Comparte tu experiencia en el retiro... ¿Qué te gustó más? ¿Cómo te sentiste? ¿Qué aprendiste?"
                    required
                    disabled={submitting}
                  />
                  <Form.Text className="text-muted">
                    Mínimo 50 caracteres. Tu testimonio ayudará a otros a conocer la experiencia.
                  </Form.Text>
                </Form.Group>

                {/* Botón de envío */}
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={submitting || formData.comment.length < 50}
                    className="py-3"
                  >
                    {submitting ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Enviando...
                      </>
                    ) : (
                      '✨ Enviar Testimonio'
                    )}
                  </Button>
                </div>

                <p className="text-center text-muted mt-3 mb-0">
                  <small>
                    Tu testimonio será revisado antes de ser publicado en nuestro sitio web.
                  </small>
                </p>
              </Form>
            </Card.Body>
          </Card>

          {/* Información adicional */}
          <div className="text-center mt-4">
            <p className="text-muted">
              <small>
                Este token expira el {new Date(tokenData?.expiresAt).toLocaleDateString('es-ES')}
              </small>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicTestimonialPage;
