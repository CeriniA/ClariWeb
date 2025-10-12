import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { leadsAPI, retreatsAPI } from '../services/api';

const LeadRegistrationForm = ({ retreatId = null, compact = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'consulta',
    retreat: retreatId || ''
  });
  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRetreats, setLoadingRetreats] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadRetreats();
  }, []);

  useEffect(() => {
    if (retreatId) {
      setFormData(prev => ({ ...prev, retreat: retreatId }));
    }
  }, [retreatId]);

  const loadRetreats = async () => {
    try {
      setLoadingRetreats(true);
      const response = await retreatsAPI.getAll({ status: 'active', limit: 100 });
      setRetreats(response.data.data);
      
      // Si solo hay un retiro activo, seleccionarlo automáticamente
      if (response.data.data.length === 1 && !retreatId) {
        setFormData(prev => ({ ...prev, retreat: response.data.data[0]._id }));
      }
    } catch (err) {
      console.error('Error cargando retiros:', err);
    } finally {
      setLoadingRetreats(false);
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
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await leadsAPI.create(formData);
      setSuccess(response.data.message || '¡Gracias por tu consulta! Te contactaremos pronto.');
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        interest: 'consulta',
        retreat: retreatId || (retreats.length === 1 ? retreats[0]._id : '')
      });

      // Scroll al mensaje de éxito
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error enviando consulta:', err);
      setError(
        err.response?.data?.error || 
        err.response?.data?.messages?.join(', ') || 
        'Error al enviar la consulta. Por favor, intenta nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingRetreats) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('¡Hola! Me gustaría saber más sobre los retiros de Soul Experiences.');
    window.open(`https://wa.me/5493468521966?text=${message}`, '_blank');
  };

  // Renderizar el contenido del formulario directamente
  const renderFormContent = () => (
    <>
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                disabled={loading}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                disabled={loading}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono (con código de área) *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+54 9 11 1234-5678"
                required
                disabled={loading}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de consulta *</Form.Label>
              <Form.Select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="consulta">Consulta general</option>
                <option value="info">Solicitar más información</option>
                <option value="reservar">Quiero reservar</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {!retreatId && retreats.length > 0 && (
          <Form.Group className="mb-3">
            <Form.Label>
              Retiro de interés {retreats.length > 1 ? '*' : ''}
            </Form.Label>
            <Form.Select
              name="retreat"
              value={formData.retreat}
              onChange={handleChange}
              required={retreats.length > 1}
              disabled={loading}
            >
              {retreats.length > 1 && <option value="">Selecciona un retiro...</option>}
              {retreats.map(retreat => (
                <option key={retreat._id} value={retreat._id}>
                  {retreat.title} - {new Date(retreat.startDate).toLocaleDateString('es-ES')}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        
        {!retreatId && retreats.length === 0 && (
          <Alert variant="info" className="mb-3">
            <small>
              <strong>ℹ️ Nota:</strong> Actualmente no hay retiros programados, pero puedes hacer una consulta general y te contactaremos cuando tengamos nuevas fechas.
            </small>
          </Alert>
        )}

        <Form.Group className="mb-4">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Cuéntanos qué te gustaría saber o cualquier consulta que tengas..."
            disabled={loading}
          />
          <Form.Text className="text-muted">
            Opcional - Comparte tus dudas o expectativas sobre el retiro
          </Form.Text>
        </Form.Group>

        <div className="d-grid">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            disabled={loading}
            className="py-3"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Enviando...
              </>
            ) : (
              '✨ Enviar Consulta'
            )}
          </Button>
        </div>

        <p className="text-center text-muted mt-3 mb-0">
          <small>
            Al enviar este formulario, aceptas que nos comuniquemos contigo para brindarte información sobre nuestros retiros.
          </small>
        </p>
      </Form>
    </>
  );

  if (compact) {
    return renderFormContent();
  }

  return (
    <section id="registro" className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        {/* Título principal de la sección */}
        <Row className="justify-content-center mb-5">
          <Col lg={10} className="text-center">
            <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--color-text)' }}>
              HABLEMOS
            </h2>
            <p className="lead mb-3">¿Listo para comenzar tu transformación?</p>
            <p className="mb-0" style={{ fontSize: '1.1rem', color: 'var(--color-text)' }}>
              Completa el formulario o contáctame directamente. Estoy aquí para acompañarte en este hermoso camino de autoconocimiento.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {/* Columna del formulario */}
          <Col lg={7} className="mb-4 mb-lg-0">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h3 className="h4 fw-bold mb-3" style={{ color: 'var(--color-text)' }}>
                    📝 Formulario de Consulta
                  </h3>
                  <p className="text-muted mb-0">
                    Te contactaremos para brindarte toda la información que necesites
                  </p>
                </div>

                {renderFormContent()}
              </Card.Body>
            </Card>
          </Col>

          {/* Columna de contacto directo */}
          <Col lg={4}>
            <Card className="shadow-sm border-0 h-100" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              <Card.Body className="p-4 d-flex flex-column justify-content-center">
                <div className="text-center mb-4">
                  <h3 className="h4 fw-bold mb-3">
                    💬 Contacto Directo
                  </h3>
                  <p className="mb-4" style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                    ¿Prefieres hablar directamente? Escríbeme por WhatsApp o email
                  </p>
                </div>

                {/* Botón de WhatsApp */}
                <Button 
                  variant="light" 
                  size="lg"
                  onClick={handleWhatsAppClick}
                  className="mb-3 py-3 rounded-pill shadow-sm"
                  style={{
                    backgroundColor: '#25D366',
                    border: 'none',
                    color: 'white',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}
                >
                  <FaWhatsapp size={24} />
                  WhatsApp
                </Button>

                {/* Información de contacto */}
                <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.3)' }}>
                  <div className="mb-3 d-flex align-items-start">
                    <FaEnvelope size={18} className="me-3 mt-1" style={{ opacity: 0.9 }} />
                    <div>
                      <small style={{ opacity: 0.8, display: 'block', marginBottom: '4px' }}>Email</small>
                      <a 
                        href="mailto:holasoul.experiences@gmail.com" 
                        className="text-white text-decoration-none"
                        style={{ fontSize: '0.9rem', fontWeight: 500 }}
                      >
                        holasoul.experiences@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="d-flex align-items-start">
                    <FaMapMarkerAlt size={18} className="me-3 mt-1" style={{ opacity: 0.9 }} />
                    <div>
                      <small style={{ opacity: 0.8, display: 'block', marginBottom: '4px' }}>Ubicación</small>
                      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                        Valle de Traslasierra<br />
                        Córdoba, Argentina
                      </span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LeadRegistrationForm;
