import React, { useState, useEffect } from 'react';
import { 
  Card, Table, Button, Badge, Alert, Spinner, Modal, 
  Form, Row, Col, Pagination 
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { retreatsAPI } from '../../../services/api';

const RetreatList = () => {
  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [retreatToDelete, setRetreatToDelete] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    loadRetreats();
  }, [filters]);

  const loadRetreats = async () => {
    try {
      setLoading(true);
      const response = await retreatsAPI.getAll(filters);
      setRetreats(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Error cargando retiros:', err);
      setError('Error al cargar los retiros');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await retreatsAPI.delete(retreatToDelete._id);
      setRetreats(retreats.filter(r => r._id !== retreatToDelete._id));
      setShowDeleteModal(false);
      setRetreatToDelete(null);
    } catch (err) {
      console.error('Error eliminando retiro:', err);
      setError('Error al eliminar el retiro');
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
    return <Badge bg={variants[status]}>{labels[status]}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando retiros...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>🏔️ Gestión de Retiros</h1>
        <Button as={Link} to="/admin/retreats/new" variant="primary">
          ➕ Nuevo Retiro
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Filtros */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value, page: 1})}
                >
                  <option value="">Todos los estados</option>
                  <option value="draft">Borrador</option>
                  <option value="active">Activo</option>
                  <option value="completed">Completado</option>
                  <option value="cancelled">Cancelado</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Elementos por página</Form.Label>
                <Form.Select
                  value={filters.limit}
                  onChange={(e) => setFilters({...filters, limit: parseInt(e.target.value), page: 1})}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Tabla de retiros */}
      <Card>
        <Card.Body className="p-0">
          {retreats.length > 0 ? (
            <>
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Título</th>
                    <th>Fechas</th>
                    <th>Precio</th>
                    <th>Participantes</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {retreats.map((retreat) => (
                    <tr key={retreat._id}>
                      <td>
                        <div>
                          <strong>{retreat.title}</strong>
                          {retreat.shortDescription && (
                            <div className="text-muted small">
                              {retreat.shortDescription.length > 50 
                                ? `${retreat.shortDescription.substring(0, 50)}...`
                                : retreat.shortDescription
                              }
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="small">
                          <div><strong>Inicio:</strong> {formatDate(retreat.startDate)}</div>
                          <div><strong>Fin:</strong> {formatDate(retreat.endDate)}</div>
                          <div className="text-muted">{retreat.durationDays} días</div>
                        </div>
                      </td>
                      <td>
                        <strong>{formatPrice(retreat.price)}</strong>
                      </td>
                      <td>
                        <div className="text-center">
                          <div><strong>{retreat.currentParticipants}</strong> / {retreat.maxParticipants}</div>
                          <div className="small text-muted">
                            {retreat.availableSpots} disponibles
                          </div>
                          {retreat.isFull && (
                            <Badge bg="warning" className="mt-1">Lleno</Badge>
                          )}
                        </div>
                      </td>
                      <td>{getStatusBadge(retreat.status)}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            as={Link}
                            to={`/admin/retreats/${retreat._id}`}
                            variant="outline-primary"
                            size="sm"
                          >
                            👁️
                          </Button>
                          <Button
                            as={Link}
                            to={`/admin/retreats/${retreat._id}/edit`}
                            variant="outline-secondary"
                            size="sm"
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              setRetreatToDelete(retreat);
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
              <h5 className="text-muted">No hay retiros</h5>
              <p className="text-muted">Crea tu primer retiro para empezar</p>
              <Button as={Link} to="/admin/retreats/new" variant="primary">
                ➕ Crear Retiro
              </Button>
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
          ¿Estás seguro de que quieres eliminar el retiro <strong>"{retreatToDelete?.title}"</strong>?
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

export default RetreatList;
