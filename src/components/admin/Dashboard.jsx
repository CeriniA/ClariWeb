import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Spinner, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { leadsAPI, retreatsAPI, testimonialsAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [activeRetreats, setActiveRetreats] = useState([]);
  const [pendingTestimonials, setPendingTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar estadísticas de leads
      const statsResponse = await leadsAPI.getStats();
      setStats(statsResponse.data.data);

      // Cargar leads recientes
      const leadsResponse = await leadsAPI.getAll({ limit: 5, sort: '-createdAt' });
      setRecentLeads(leadsResponse.data.data);

      // Cargar retiros activos
      try {
        const retreatsResponse = await retreatsAPI.getAll({ status: 'active' });
        setActiveRetreats(retreatsResponse.data.data || []);
      } catch (err) {
        console.error('Error cargando retiros activos:', err);
        setActiveRetreats([]);
      }

      // Cargar testimonios pendientes
      const testimonialsResponse = await testimonialsAPI.getAll({ 
        isApproved: false, 
        limit: 5 
      });
      setPendingTestimonials(testimonialsResponse.data.data);

    } catch (err) {
      console.error('Error cargando dashboard:', err);
      setError('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const getStatusBadge = (status) => {
    const variants = {
      nuevo: 'primary',
      contactado: 'info',
      interesado: 'warning',
      confirmado: 'success',
      descartado: 'secondary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>📊 Dashboard</h1>
        <Button as={Link} to="/" target="_blank" variant="outline-primary">
          🌐 Ver Landing
        </Button>
      </div>

      {/* Estadísticas principales */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <h2 className="text-primary mb-1">{stats?.total || 0}</h2>
              <p className="text-muted mb-0">Total Leads</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <h2 className="text-success mb-1">{stats?.confirmados || 0}</h2>
              <p className="text-muted mb-0">Confirmados</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <h2 className="text-warning mb-1">{stats?.nuevos || 0}</h2>
              <p className="text-muted mb-0">Nuevos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <h2 className="text-info mb-1">{stats?.esteMes || 0}</h2>
              <p className="text-muted mb-0">Este Mes</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Retiros Activos */}
        <Col lg={6} className="mb-4">
          <Card className="h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">🏔️ Retiros Activos ({activeRetreats.length})</h5>
              <Button as={Link} to="/admin/retreats" variant="outline-primary" size="sm">
                Gestionar
              </Button>
            </Card.Header>
            <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {activeRetreats.length > 0 ? (
                <div className="list-group list-group-flush">
                  {activeRetreats.map((retreat) => (
                    <div key={retreat._id} className="list-group-item px-0 py-3">
                      <h6 className="text-primary mb-2">{retreat.title}</h6>
                      <p className="text-muted small mb-2">
                        {new Date(retreat.startDate).toLocaleDateString('es-ES')} - {new Date(retreat.endDate).toLocaleDateString('es-ES')}
                      </p>
                      <div className="row text-center">
                        <div className="col-4">
                          <strong>{retreat.currentParticipants || 0}</strong>
                          <br />
                          <small className="text-muted">Confirmados</small>
                        </div>
                        <div className="col-4">
                          <strong>{retreat.availableSpots || 0}</strong>
                          <br />
                          <small className="text-muted">Disponibles</small>
                        </div>
                        <div className="col-4">
                          <strong>
                            ${(
                              typeof retreat.effectivePrice === 'number'
                                ? retreat.effectivePrice
                                : retreat.price
                            )?.toLocaleString()} {retreat.currency || 'ARS'}
                          </strong>
                          <br />
                          <small className="text-muted">{retreat.activePricingTier ? 'Precio actual' : 'Precio'}</small>
                          {retreat.activePricingTier && typeof retreat.price === 'number' && retreat.price !== retreat.effectivePrice && (
                            <div className="text-muted small">
                              <span style={{ textDecoration: 'line-through' }}>${retreat.price.toLocaleString()}</span> {retreat.currency || 'ARS'}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-3">
                  <p>No hay retiros activos</p>
                  <Button as={Link} to="/admin/retreats" variant="primary" size="sm">
                    Crear Retiro
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Leads Recientes */}
        <Col lg={6} className="mb-4">
          <Card className="h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">👥 Leads Recientes</h5>
              <Button as={Link} to="/admin/leads" variant="outline-primary" size="sm">
                Ver Todos
              </Button>
            </Card.Header>
            <Card.Body>
              {recentLeads.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentLeads.map((lead) => (
                    <div key={lead._id} className="list-group-item px-0 py-2">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{lead.name}</h6>
                          <p className="mb-1 text-muted small">{lead.email}</p>
                          <small className="text-muted">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                        {getStatusBadge(lead.status)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted py-3">
                  <p>No hay leads recientes</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Testimonios Pendientes */}
      {pendingTestimonials.length > 0 && (
        <Row>
          <Col>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">⭐ Testimonios Pendientes de Aprobación</h5>
                <Button as={Link} to="/admin/testimonials" variant="outline-primary" size="sm">
                  Gestionar
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="row">
                  {pendingTestimonials.map((testimonial) => (
                    <div key={testimonial._id} className="col-md-6 mb-3">
                      <div className="border rounded p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <strong>{testimonial.participantName}</strong>
                          <div>
                            {'⭐'.repeat(testimonial.rating)}
                          </div>
                        </div>
                        <p className="text-muted small mb-0">
                          {testimonial.comment.length > 100 
                            ? `${testimonial.comment.substring(0, 100)}...`
                            : testimonial.comment
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
