import React, { useState, useEffect } from 'react';
import { 
  Card, Table, Button, Badge, Alert, Spinner, Modal, 
  Form, Row, Col, Pagination 
} from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { testimonialsAPI, retreatsAPI } from '../../../services/api';

const TestimonialList = () => {
  const [searchParams] = useSearchParams();
  const [testimonials, setTestimonials] = useState([]);
  const [retreats, setRetreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [filters, setFilters] = useState({
    isApproved: '',
    isFeatured: '',
    retreat: searchParams.get('retreat') || '', // Leer de URL
    rating: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    loadRetreats();
    // Si hay parámetro retreat en URL, aplicarlo
    const retreatParam = searchParams.get('retreat');
    if (retreatParam) {
      setFilters(prev => ({ ...prev, retreat: retreatParam }));
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [filters]);

  const loadRetreats = async () => {
    try {
      const response = await retreatsAPI.getAll({ limit: 100 });
      setRetreats(response.data.data);
    } catch (err) {
      console.error('Error cargando retiros:', err);
    }
  };

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      
      // Filtrar parámetros vacíos antes de enviar
      const cleanFilters = Object.keys(filters).reduce((acc, key) => {
        if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
          acc[key] = filters[key];
        }
        return acc;
      }, {});
      
      const response = await testimonialsAPI.getAll(cleanFilters);
      setTestimonials(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Error cargando testimonios:', err);
      setError('Error al cargar los testimonios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await testimonialsAPI.delete(testimonialToDelete._id);
      setTestimonials(testimonials.filter(t => t._id !== testimonialToDelete._id));
      setShowDeleteModal(false);
      setTestimonialToDelete(null);
    } catch (err) {
      console.error('Error eliminando testimonio:', err);
      setError('Error al eliminar el testimonio');
    }
  };

  const handleApprovalToggle = async (testimonialId, currentApproval) => {
    try {
      await testimonialsAPI.update(testimonialId, { isApproved: !currentApproval });
      loadTestimonials(); // Recargar para ver cambios
    } catch (err) {
      console.error('Error actualizando aprobación:', err);
      setError('Error al actualizar la aprobación');
    }
  };

  const handleFeaturedToggle = async (testimonialId, currentFeatured) => {
    try {
      await testimonialsAPI.update(testimonialId, { isFeatured: !currentFeatured });
      loadTestimonials(); // Recargar para ver cambios
    } catch (err) {
      console.error('Error actualizando destacado:', err);
      setError('Error al actualizar el estado destacado');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando testimonios...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>⭐ Gestión de Testimonios</h1>
        <div className="d-flex gap-2">
          <Button as={Link} to="/admin/testimonials/new" variant="primary">
            ➕ Nuevo Testimonio
          </Button>
          <Button variant="outline-primary" onClick={loadTestimonials}>
            🔄 Actualizar
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Filtros */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={filters.isApproved}
                  onChange={(e) => setFilters({...filters, isApproved: e.target.value, page: 1})}
                >
                  <option value="">Todos</option>
                  <option value="true">Aprobados</option>
                  <option value="false">Pendientes</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Destacado</Form.Label>
                <Form.Select
                  value={filters.isFeatured}
                  onChange={(e) => setFilters({...filters, isFeatured: e.target.value, page: 1})}
                >
                  <option value="">Todos</option>
                  <option value="true">Destacados</option>
                  <option value="false">No destacados</option>
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
            <Col md={2}>
              <Form.Group>
                <Form.Label>Calificación</Form.Label>
                <Form.Select
                  value={filters.rating}
                  onChange={(e) => setFilters({...filters, rating: e.target.value, page: 1})}
                >
                  <option value="">Todas</option>
                  <option value="5">5 estrellas</option>
                  <option value="4">4+ estrellas</option>
                  <option value="3">3+ estrellas</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
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

      {/* Tabla de testimonios */}
      <Card>
        <Card.Body className="p-0">
          {testimonials.length > 0 ? (
            <>
              <Table responsive hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Participante</th>
                    <th>Retiro</th>
                    <th>Calificación</th>
                    <th>Comentario</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial._id}>
                      <td>
                        <div>
                          <strong>{testimonial.participantName}</strong>
                          {testimonial.participantEmail && (
                            <div className="small text-muted">{testimonial.participantEmail}</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong>{testimonial.retreat?.title}</strong>
                          <div className="small text-muted">
                            {testimonial.retreat && formatDate(testimonial.retreat.startDate)}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          <div style={{ fontSize: '1.2em' }}>
                            {renderStars(testimonial.rating)}
                          </div>
                          <div className="small text-muted">
                            {testimonial.rating}/5
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ maxWidth: '300px' }}>
                          {testimonial.comment.length > 100 
                            ? `${testimonial.comment.substring(0, 100)}...`
                            : testimonial.comment
                          }
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <Badge bg={testimonial.isApproved ? 'success' : 'warning'}>
                            {testimonial.isApproved ? 'Aprobado' : 'Pendiente'}
                          </Badge>
                          {testimonial.isFeatured && (
                            <Badge bg="primary">Destacado</Badge>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="small">
                          <div>{formatDate(testimonial.createdAt)}</div>
                          {testimonial.approvedAt && (
                            <div className="text-muted">
                              Aprobado: {formatDate(testimonial.approvedAt)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <div className="d-flex gap-1">
                            <Button
                              variant={testimonial.isApproved ? "outline-warning" : "outline-success"}
                              size="sm"
                              onClick={() => handleApprovalToggle(testimonial._id, testimonial.isApproved)}
                              title={testimonial.isApproved ? "Desaprobar" : "Aprobar"}
                            >
                              {testimonial.isApproved ? '❌' : '✅'}
                            </Button>
                            <Button
                              variant={testimonial.isFeatured ? "warning" : "outline-warning"}
                              size="sm"
                              onClick={() => handleFeaturedToggle(testimonial._id, testimonial.isFeatured)}
                              title={testimonial.isFeatured ? "Quitar destacado" : "Destacar"}
                            >
                              ⭐
                            </Button>
                          </div>
                          <div className="d-flex gap-1">
                            <Button
                              as={Link}
                              to={`/admin/testimonials/${testimonial._id}`}
                              variant="outline-primary"
                              size="sm"
                            >
                              👁️
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                setTestimonialToDelete(testimonial);
                                setShowDeleteModal(true);
                              }}
                            >
                              🗑️
                            </Button>
                          </div>
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
              <h5 className="text-muted">No hay testimonios</h5>
              <p className="text-muted">Los testimonios aparecerán cuando los participantes los envíen</p>
              <Button as={Link} to="/admin/testimonials/new" variant="primary">
                ➕ Crear Testimonio Manual
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
          ¿Estás seguro de que quieres eliminar el testimonio de <strong>"{testimonialToDelete?.participantName}"</strong>?
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

export default TestimonialList;
