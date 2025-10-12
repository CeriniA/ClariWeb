import React, { useState, useEffect } from 'react';
import { 
  Card, Badge, Button, Alert, Spinner, Row, Col, 
  Form, InputGroup, Modal 
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { leadsAPI } from '../../../services/api';
import {
  LEAD_STATUS_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
  STATUS_BADGE_VARIANTS,
  PAYMENT_STATUS_BADGE_VARIANTS
} from '../../../constants/enums';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    paymentStatus: '',
    paymentAmount: 0,
    paymentMethod: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadLead();
  }, [id]);

  const loadLead = async () => {
    try {
      setLoading(true);
      const response = await leadsAPI.getById(id);
      const leadData = response.data.data;
      setLead(leadData);
      setFormData({
        status: leadData.status || '',
        paymentStatus: leadData.paymentStatus || '',
        paymentAmount: leadData.paymentAmount || 0,
        paymentMethod: leadData.paymentMethod || '',
        notes: leadData.notes || ''
      });
      setHasChanges(false);
    } catch (err) {
      console.error('Error cargando lead:', err);
      setError('Error al cargar el lead');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setUpdating(true);
      setError('');
      const response = await leadsAPI.update(id, formData);
      setLead(response.data.data);
      setHasChanges(false);
      setSuccess('Lead actualizado exitosamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error actualizando lead:', err);
      setError(err.response?.data?.error || 'Error al actualizar el lead');
    } finally {
      setUpdating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      status: lead.status || '',
      paymentStatus: lead.paymentStatus || '',
      paymentAmount: lead.paymentAmount || 0,
      paymentMethod: lead.paymentMethod || '',
      notes: lead.notes || ''
    });
    setHasChanges(false);
  };

  const handleNotesUpdate = () => {
    setFormData(prev => ({ ...prev, notes: formData.notes }));
    setHasChanges(true);
    setShowNotesModal(false);
  };

  const getStatusBadge = (status) => {
    const variant = STATUS_BADGE_VARIANTS[status] || 'secondary';
    const label = LEAD_STATUS_OPTIONS.find(opt => opt.value === status)?.label || status;
    return <Badge bg={variant} className="fs-6">{label}</Badge>;
  };

  const getPaymentBadge = (paymentStatus) => {
    const variant = PAYMENT_STATUS_BADGE_VARIANTS[paymentStatus] || 'secondary';
    const label = PAYMENT_STATUS_OPTIONS.find(opt => opt.value === paymentStatus)?.label || paymentStatus;
    return <Badge bg={variant} className="fs-6">{label}</Badge>;
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

  const getWhatsAppLink = (phone, name, retreatTitle) => {
    const message = `Hola ${name}! Te contacto por tu consulta sobre el retiro "${retreatTitle}". ¿Te gustaría que conversemos?`;
    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando lead...</p>
      </div>
    );
  }

  if (error && !lead) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!lead) {
    return <Alert variant="warning">Lead no encontrado</Alert>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-2">{lead.name}</h1>
          <div className="d-flex gap-2">
            {getStatusBadge(lead.status)}
            {getPaymentBadge(lead.paymentStatus)}
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button
            as="a"
            href={getWhatsAppLink(lead.phone, lead.name, lead.retreat?.title)}
            target="_blank"
            variant="success"
          >
            📱 WhatsApp
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/admin/leads')}
          >
            ← Volver
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col lg={8}>
          {/* Información de contacto */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">📞 Información de Contacto</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Nombre:</strong>
                    <div>{lead.name}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong>
                    <div>
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>Teléfono:</strong>
                    <div>
                      <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Fuente:</strong>
                    <div className="text-capitalize">{lead.source}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Tipo de interés:</strong>
                    <div className="text-capitalize">{lead.interest}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Fecha de consulta:</strong>
                    <div>{formatDate(lead.createdAt)}</div>
                  </div>
                </Col>
              </Row>

              {lead.message && (
                <div className="mt-3">
                  <strong>Mensaje:</strong>
                  <div className="p-3 bg-light rounded mt-2">
                    {lead.message}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Información del retiro */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">🏔️ Retiro de Interés</h5>
            </Card.Header>
            <Card.Body>
              {lead.retreat ? (
                <div>
                  <h6 className="text-primary">{lead.retreat.title}</h6>
                  <Row>
                    <Col md={6}>
                      <div className="mb-2">
                        <strong>Precio:</strong> ${lead.retreat.price?.toLocaleString()} ARS
                      </div>
                      <div className="mb-2">
                        <strong>Inicio:</strong> {new Date(lead.retreat.startDate).toLocaleDateString('es-ES')}
                      </div>
                      <div className="mb-2">
                        <strong>Fin:</strong> {new Date(lead.retreat.endDate).toLocaleDateString('es-ES')}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-2">
                        <strong>Lugar:</strong> {lead.retreat.location?.name}
                      </div>
                      <div className="mb-2">
                        <strong>Participantes:</strong> {lead.retreat.currentParticipants}/{lead.retreat.maxParticipants}
                      </div>
                      <div className="mb-2">
                        <strong>Disponibles:</strong> {lead.retreat.availableSpots}
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : (
                <Alert variant="warning">Retiro no encontrado</Alert>
              )}
            </Card.Body>
          </Card>

          {/* Notas */}
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">📝 Notas Internas</h5>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowNotesModal(true)}
              >
                ✏️ Editar
              </Button>
            </Card.Header>
            <Card.Body>
              {formData.notes ? (
                <div style={{ whiteSpace: 'pre-wrap' }}>{formData.notes}</div>
              ) : (
                <div className="text-muted">No hay notas</div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Gestión de estado */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">⚡ Gestión Rápida</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Estado del Lead</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  disabled={updating}
                >
                  {LEAD_STATUS_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Estado del Pago</Form.Label>
                <Form.Select
                  value={formData.paymentStatus}
                  onChange={(e) => handleChange('paymentStatus', e.target.value)}
                  disabled={updating}
                >
                  {PAYMENT_STATUS_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Monto Pagado</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={formData.paymentAmount || ''}
                    onChange={(e) => handleChange('paymentAmount', parseFloat(e.target.value) || 0)}
                    disabled={updating}
                    min="0"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Método de Pago</Form.Label>
                <Form.Select
                  value={formData.paymentMethod}
                  onChange={(e) => handleChange('paymentMethod', e.target.value)}
                  disabled={updating}
                >
                  {PAYMENT_METHOD_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Botones de acción */}
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  onClick={handleSave}
                  disabled={!hasChanges || updating}
                >
                  {updating ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Guardando...
                    </>
                  ) : (
                    '💾 Guardar Cambios'
                  )}
                </Button>
                
                {hasChanges && (
                  <Button 
                    variant="outline-secondary" 
                    onClick={handleReset}
                    disabled={updating}
                  >
                    🔄 Descartar Cambios
                  </Button>
                )}
              </div>

              {hasChanges && (
                <Alert variant="info" className="mt-3 mb-0">
                  <small>📝 Tienes cambios sin guardar</small>
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Información adicional */}
          <Card>
            <Card.Header>
              <h5 className="mb-0">ℹ️ Información Adicional</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-2">
                <strong>ID:</strong> <code>{lead._id}</code>
              </div>
              
              <div className="mb-2">
                <strong>Creado:</strong> {formatDate(lead.createdAt)}
              </div>
              
              <div className="mb-2">
                <strong>Actualizado:</strong> {formatDate(lead.updatedAt)}
              </div>

              {lead.contactedAt && (
                <div className="mb-2">
                  <strong>Contactado:</strong> {formatDate(lead.contactedAt)}
                </div>
              )}

              {lead.confirmedAt && (
                <div className="mb-0">
                  <strong>Confirmado:</strong> {formatDate(lead.confirmedAt)}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para editar notas */}
      <Modal show={showNotesModal} onHide={() => setShowNotesModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Notas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Notas internas sobre {lead.name}</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Agregar notas sobre el seguimiento, conversaciones, etc..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotesModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleNotesUpdate} disabled={updating}>
            {updating ? 'Guardando...' : 'Guardar Notas'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeadDetail;
