import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Navbar, 
  Nav, 
  NavDropdown, 
  Button, 
  Offcanvas,
  ListGroup
} from 'react-bootstrap';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/retreats', icon: '🏔️', label: 'Retiros' },
    { path: '/admin/leads', icon: '👥', label: 'Leads' },
    { path: '/admin/testimonials', icon: '⭐', label: 'Testimonios' },
    { path: '/admin/settings', icon: '⚙️', label: 'Configuración' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-layout">
      {/* Header */}
      <Navbar style={{ backgroundColor: 'var(--color-accent)' }} variant="dark" expand="lg" className="shadow-sm">
        <Container fluid>
          <Button
            variant="outline-light"
            className="d-lg-none me-2"
            onClick={() => setShowSidebar(true)}
          >
            ☰
          </Button>
          
          <Navbar.Brand as={Link} to="/admin/dashboard" className="fw-bold" style={{ fontFamily: 'var(--font-family-heading)', fontSize: '1.5rem' }}>
            ✨ Clari Admin
          </Navbar.Brand>

          <Nav className="ms-auto">
            <NavDropdown
              title={`👋 ${user?.name || 'Admin'}`}
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/admin/profile">
                👤 Mi Perfil
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/" target="_blank">
                🌐 Ver Landing
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                🚪 Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="p-0">
        <Row className="g-0">
          {/* Sidebar Desktop */}
          <Col lg={2} className="d-none d-lg-block" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 56px)' }}>
            <div className="p-3">
              <ListGroup variant="flush">
                {menuItems.map((item) => (
                  <ListGroup.Item
                    key={item.path}
                    as={Link}
                    to={item.path}
                    className={`border-0 rounded mb-1 ${isActive(item.path) ? 'active' : ''}`}
                    style={{ 
                      backgroundColor: isActive(item.path) ? 'var(--color-primary)' : 'transparent',
                      color: isActive(item.path) ? 'white' : 'inherit'
                    }}
                  >
                    {item.icon} {item.label}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>

          {/* Main Content */}
          <Col lg={10}>
            <div className="p-4">
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Sidebar Mobile */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>✨ Clari Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {menuItems.map((item) => (
              <ListGroup.Item
                key={item.path}
                as={Link}
                to={item.path}
                className={`border-0 rounded mb-1 ${isActive(item.path) ? 'active' : ''}`}
                style={{ 
                  backgroundColor: isActive(item.path) ? 'var(--color-primary)' : 'transparent',
                  color: isActive(item.path) ? 'white' : 'inherit'
                }}
                onClick={() => setShowSidebar(false)}
              >
                {item.icon} {item.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AdminLayout;
