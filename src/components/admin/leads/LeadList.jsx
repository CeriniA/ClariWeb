import React, { useState, useEffect } from 'react';
import { 
  Card, Table, Button, Badge, Alert, Spinner, Modal, 
  Form, Row, Col, Pagination, InputGroup 
} from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { leadsAPI, retreatsAPI } from '../../../services/api';

const LeadList = () => {
  const [searchParams] = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [retreats, setRetreats] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    retreat: searchParams.get('retreat') || '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    loadRetreats();
  }, []);

  useEffect(() => {
    loadLeads();
  }, [filters]);

  const loadRetreats = async () => {
    try {
      const response = await retreatsAPI.getAll({ limit: 100 });
      setRetreats(response.data.data);
    } catch (err) {
      console.error('Error cargando retiros:', err);
    }
  };

  const loadLeads = async () => {
    try {
      setLoading(true);
      const [leadsResponse, statsResponse] = await Promise.all([
        leadsAPI.getAll(filters),
        leadsAPI.getStats()
      ]);
      
      setLeads(leadsResponse.data.data);
      setPagination(leadsResponse.data.pagination);
      setStats(statsResponse.data.data);
    } catch (err) {
      console.error('Error cargando leads:', err);
      setError('Error al cargar los leads');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await leadsAPI.delete(leadToDelete._id);
      setLeads(leads.filter(l => l._id !== leadToDelete._id));
      setShowDeleteModal(false);
      setLeadToDelete(null);
      loadLeads(); // Recargar para actualizar stats
    } catch (err) {
      console.error('Error eliminando lead:', err);
      setError('Error al eliminar el lead');
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await leadsAPI.update(leadId, { status: newStatus });
      loadLeads(); // Recargar para ver cambios
    } catch (err) {
      console.error('Error actualizando status:', err);
      setError('Error al actualizar el estado');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      nuevo: 'primary',
      contactado: 'info',
      interesado: 'warning',
      pagado: 'success',
      confirmado: 'success',
      descartado: 'secondary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getPaymentBadge = (paymentStatus) => {
    const variants = {
      pendiente: 'secondary',
      seña: 'warning',
      completo: 'success'
    };
    return <Badge bg={variants[paymentStatus] || 'secondary'}>{paymentStatus}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getWhatsAppLink = (phone, name, retreatTitle) => {
    const message = `Hola ${name}! Te contacto por tu consulta sobre el retiro "${retreatTitle}". ¿Te gustaría que conversemos?`;
    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando leads...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>👥 Gestión de Leads</h1>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={loadLeads}>
            🔄 Actualizar
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{stats.total || 0}</h3>
              <small className="text-muted">Total Leads</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">{stats.nuevos || 0}</h3>
              <small className="text-muted">Nuevos</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">{stats.confirmados || 0}</h3>
              <small className="text-muted">Confirmados</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">{stats.conversionRate?.toFixed(1) || 0}%</h3>
              <small className="text-muted">Conversión</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filtros */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value, page: 1})}
                >
                  <option value="">Todos</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="contactado">Contactado</option>
                  <option value="interesado">Interesado</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="descartado">Descartado</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Pago</Form.Label>
                <Form.Select
                  value={filters.paymentStatus}
                  onChange={(e) => setFilters({...filters, paymentStatus: e.target.value, page: 1})}
                >
                  <option value="">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="seña">Seña</option>
                  <option value="completo">Completo</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Retiro</Form.Label>
                <Form.Select
                  value={filters.retreat}
                  onChange={(e) => setFilters({...filters, retreat: e.target.value, page: 1})}
                >
                  <option value="">Todos</option>
                  {retreats.map(retreat => (
                    <option key={retreat._id} value={retreat._id}>
                      {retreat.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Por página</Form.Label>
                <Form.Select
                  value={filters.limit}
                  onChange={(e) => setFilters({...filters, limit: parseInt(e.target.value), page: 1})}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabla de leads */}
      <Card>
        <Card.Body className="p-0">
          {leads.length > 0 ? (
            <>
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Contacto</th>
                    <th>Retiro</th>
                    <th>Estado</th>
                    <th>Pago</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id}>
                      <td>
                        <div>
                          <strong>{lead.name}</strong>
                          <div className="small text-muted">{lead.email}</div>
                          <div className="small text-muted">{lead.phone}</div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong>{lead.retreat?.title}</strong>
                          <div className="small text-muted">
                            ${lead.retreat?.price?.toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <Form.Select
                          size="sm"
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          style={{ minWidth: '120px' }}
                        >
                          <option value="nuevo">Nuevo</option>
                          <option value="contactado">Contactado</option>
                          <option value="interesado">Interesado</option>
                          <option value="confirmado">Confirmado</option>
                          <option value="descartado">Descartado</option>
                        </Form.Select>
                      </td>
                      <td>
                        {getPaymentBadge(lead.paymentStatus)}
                        {lead.paymentAmount > 0 && (
                          <div className="small text-muted">
                            ${lead.paymentAmount.toLocaleString()}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="small">
                          <div>{formatDate(lead.createdAt)}</div>
                          <div className="text-muted">
                            {lead.source}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            as="a"
                            href={getWhatsAppLink(lead.phone, lead.name, lead.retreat?.title)}
                            target="_blank"
                            variant="success"
                            size="sm"
                            title="Contactar por WhatsApp"
                          >
                            📱
                          </Button>
                          <Button
                            as={Link}
                            to={`/admin/leads/${lead._id}`}
                            variant="outline-primary"
                            size="sm"
                          >
                            👁️
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setLeadToDelete(lead);
                              setShowDeleteModal(true);
                            }}
                          >
                            🗑️
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Paginación */}
              {pagination.pages > 1 && (
                <div className="d-flex justify-content-center p-3">
                  <Pagination>
                    <Pagination.Prev 
                      disabled={pagination.page <= 1}
                      onClick={() => setFilters({...filters, page: pagination.page - 1})}
                    />
                    {[...Array(pagination.pages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === pagination.page}
                        onClick={() => setFilters({...filters, page: index + 1})}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next 
                      disabled={pagination.page >= pagination.pages}
                      onClick={() => setFilters({...filters, page: pagination.page + 1})}
                    />
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <h5 className="text-muted">No hay leads</h5>
              <p className="text-muted">Los leads aparecerán cuando alguien complete el formulario en la landing</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal de confirmación de eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar el lead de <strong>"{leadToDelete?.name}"</strong>?
          <br />
          <small className="text-muted">Esta acción no se puede deshacer.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeadList;
