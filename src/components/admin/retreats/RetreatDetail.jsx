import React, { useState, useEffect } from 'react';
import { 
  Card, Badge, Button, Alert, Spinner, Row, Col, 
  ListGroup, ProgressBar, Modal, Form 
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { retreatsAPI, tokensAPI, leadsAPI } from '../../../services/api';

const RetreatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [retreat, setRetreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusWarning, setStatusWarning] = useState(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenCount, setTokenCount] = useState(1);
  const [generatingTokens, setGeneratingTokens] = useState(false);
  const [tokenSuccess, setTokenSuccess] = useState('');
  const [confirmedLeadsCount, setConfirmedLeadsCount] = useState(0);

  useEffect(() => {
    loadRetreat();
  }, [id]);

  const loadRetreat = async () => {
    try {
      setLoading(true);
      setStatusWarning(null);
      const response = await retreatsAPI.getById(id);
      setRetreat(response.data.data);
      
      // Verificar si hay advertencia de estado
      if (response.data.statusWarning) {
        setStatusWarning(response.data.statusWarning);
      }

      // Cargar cantidad de leads confirmados
      const leadsResponse = await leadsAPI.getAll({ retreat: id, status: 'confirmado', limit: 1 });
      setConfirmedLeadsCount(leadsResponse.data.total || 0);
    } catch (err) {
      console.error('Error cargando retiro:', err);
      setError('Error al cargar el retiro');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      draft: 'secondary',
      active: 'success',
      completed: 'primary',
      cancelled: 'danger'
    };
    const labels = {
      draft: 'Borrador',
      active: 'Activo',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };
    return <Badge bg={variants[status]} className="fs-6">{labels[status]}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleGenerateTokens = async () => {
    try {
      setGeneratingTokens(true);
      setError('');
      setTokenSuccess('');
      
      const response = await tokensAPI.generateForRetreat(retreat._id, { quantity: tokenCount });
      
      const { tokensGenerated, emailsSent, emailsFailed } = response.data.data;
      
      let successMessage = `✅ Se generaron ${tokensGenerated} token(es) exitosamente`;
      
      if (emailsSent > 0) {
        successMessage += `\n📧 ${emailsSent} email(s) enviado(s)`;
      }
      
      if (emailsFailed > 0) {
        successMessage += `\n⚠️ ${emailsFailed} email(s) fallaron (revisa la configuración de email)`;
      }
      
      setTokenSuccess(successMessage);
      setShowTokenModal(false);
      setTokenCount(1);
      
      // Recargar el retiro para actualizar estadísticas
      loadRetreat();
    } catch (err) {
      console.error('Error generando tokens:', err);
      setError(err.response?.data?.error || 'Error al generar tokens. Por favor, intenta nuevamente.');
    } finally {
      setGeneratingTokens(false);
    }
  };

  const occupancyPercentage = retreat ? (retreat.currentParticipants / retreat.maxParticipants) * 100 : 0;

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando retiro...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!retreat) {
    return <Alert variant="warning">Retiro no encontrado</Alert>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-2">{retreat.title}</h1>
          {getStatusBadge(retreat.status)}
        </div>
        <div className="d-flex gap-2">
          <Button
            as={Link}
            to={`/admin/retreats/${retreat._id}/edit`}
            variant="primary"
          >
            ✏️ Editar
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/admin/retreats')}
          >
            ← Volver
          </Button>
        </div>
      </div>

      {/* Alerta de estado inconsistente */}
      {statusWarning && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>⚠️ Advertencia de Estado</Alert.Heading>
          <p className="mb-2">{statusWarning.reason}</p>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>Estado actual:</strong> <Badge bg="secondary">{statusWarning.current}</Badge>
              {' → '}
              <strong>Estado sugerido:</strong> <Badge bg="success">{statusWarning.suggested}</Badge>
            </div>
            <Button
              size="sm"
              variant="warning"
              as={Link}
              to={`/admin/retreats/${retreat._id}/edit`}
            >
              Corregir Estado
            </Button>
          </div>
        </Alert>
      )}

      {tokenSuccess && (
        <Alert variant="success" dismissible onClose={() => setTokenSuccess('')}>
          {tokenSuccess}
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          {/* Información principal */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">📋 Información General</h5>
            </Card.Header>
            <Card.Body>
              {retreat.shortDescription && (
                <div className="mb-3">
                  <h6 className="text-muted">Descripción Corta</h6>
                  <p className="lead">{retreat.shortDescription}</p>
                </div>
              )}
              
              <div>
                <h6 className="text-muted">Descripción Completa</h6>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {retreat.description}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Fechas y ubicación */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">📅 Fechas y Ubicación</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6 className="text-muted">Fechas</h6>
                  <p className="mb-1"><strong>Inicio:</strong> {formatDate(retreat.startDate)}</p>
                  <p className="mb-1"><strong>Fin:</strong> {formatDate(retreat.endDate)}</p>
                  <p className="mb-0"><strong>Duración:</strong> {retreat.durationDays} días</p>
                </Col>
                <Col md={6}>
                  <h6 className="text-muted">Ubicación</h6>
                  <p className="mb-1"><strong>{retreat.location.name}</strong></p>
                  <p className="mb-1">{retreat.location.address}</p>
                  {retreat.location.city && (
                    <p className="mb-0">
                      {retreat.location.city}
                      {retreat.location.state && `, ${retreat.location.state}`}
                      {retreat.location.country && ` - ${retreat.location.country}`}
                    </p>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Qué incluye */}
          {retreat.includes && retreat.includes.length > 0 && (
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">✨ Qué Incluye</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {retreat.includes.map((item, index) => (
                    <ListGroup.Item key={index} className="px-0">
                      ✓ {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col lg={4}>
          {/* Estadísticas */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">📊 Estadísticas</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <h2 className="text-primary mb-0">{formatPrice(retreat.price)}</h2>
                <small className="text-muted">Precio por persona</small>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Ocupación</small>
                  <small>{retreat.currentParticipants}/{retreat.maxParticipants}</small>
                </div>
                <ProgressBar 
                  now={occupancyPercentage} 
                  variant={occupancyPercentage >= 90 ? 'danger' : occupancyPercentage >= 70 ? 'warning' : 'success'}
                />
                <small className="text-muted">
                  {retreat.availableSpots} lugares disponibles
                </small>
              </div>

              <Row className="text-center">
                <Col>
                  <div className="border rounded p-2">
                    <h4 className="mb-0 text-success">{retreat.currentParticipants}</h4>
                    <small className="text-muted">Confirmados</small>
                  </div>
                </Col>
                <Col>
                  <div className="border rounded p-2">
                    <h4 className="mb-0 text-info">{retreat.inquiryCount || 0}</h4>
                    <small className="text-muted">Consultas</small>
                  </div>
                </Col>
              </Row>

              {retreat.isFull && (
                <Alert variant="warning" className="mt-3 mb-0">
                  <strong>¡Retiro Completo!</strong><br />
                  No hay más lugares disponibles.
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Información adicional */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">ℹ️ Información Adicional</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>Slug:</strong> <code>{retreat.slug}</code>
              </div>
              
              {retreat.whatsappNumber && (
                <div className="mb-2">
                  <strong>WhatsApp:</strong> {retreat.whatsappNumber}
                </div>
              )}
              
              <div className="mb-2">
                <strong>Creado:</strong> {formatDate(retreat.createdAt)}
              </div>
              
              <div className="mb-0">
                <strong>Actualizado:</strong> {formatDate(retreat.updatedAt)}
              </div>
            </Card.Body>
          </Card>

          {/* Acciones rápidas */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">⚡ Acciones Rápidas</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button
                  as={Link}
                  to={`/admin/leads?retreat=${retreat._id}`}
                  variant="outline-primary"
                >
                  👥 Ver Leads
                </Button>
                
                <Button
                  variant="outline-info"
                  onClick={() => setShowTokenModal(true)}
                  disabled={confirmedLeadsCount === 0}
                >
                  🔗 Generar Tokens ({confirmedLeadsCount})
                </Button>
                
                <Button
                  as={Link}
                  to={`/admin/testimonials?retreat=${retreat._id}`}
                  variant="outline-success"
                >
                  ⭐ Ver Testimonios
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para generar tokens */}
      <Modal show={showTokenModal} onHide={() => setShowTokenModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🔗 Generar Tokens de Testimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tokenSuccess && (
            <Alert variant="success" dismissible onClose={() => setTokenSuccess('')}>
              {tokenSuccess}
            </Alert>
          )}
          
          <Alert variant="info" className="mb-3">
            <strong>ℹ️ Información:</strong><br />
            Los tokens se generan para los participantes <strong>confirmados</strong> del retiro.
            Solo se crearán tokens para participantes que aún no tienen uno.
          </Alert>
          
          <div className="mb-3">
            <p className="mb-2">
              <strong>Retiro:</strong> {retreat?.title}
            </p>
            <p className="mb-0">
              <strong>Participantes confirmados:</strong> {confirmedLeadsCount}
            </p>
          </div>
          
          <Form.Group className="mb-3">
            <Form.Label>Cantidad de tokens a generar</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max={confirmedLeadsCount || 50}
              value={tokenCount}
              onChange={(e) => setTokenCount(parseInt(e.target.value) || 1)}
              disabled={generatingTokens}
            />
            <Form.Text className="text-muted">
              Deja vacío o usa el máximo para generar tokens para todos los participantes sin token.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowTokenModal(false)}
            disabled={generatingTokens}
          >
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleGenerateTokens}
            disabled={generatingTokens || tokenCount < 1}
          >
            {generatingTokens ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Generando...
              </>
            ) : (
              `Generar ${tokenCount} Token(es)`
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RetreatDetail;
