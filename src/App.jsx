import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Landing page
import LandingPage from './pages/LandingPage';

// Detail pages (solo para casos específicos)
import RetreatDetailPage from './pages/RetreatDetailPage';
import PublicTestimonialPage from './pages/PublicTestimonialPage';

// Admin components
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './components/admin/Login';
import AdminLayout from './components/admin/Layout';
import Dashboard from './components/admin/Dashboard';

// Admin CRUD components
import RetreatList from './components/admin/retreats/RetreatList';
import RetreatForm from './components/admin/retreats/RetreatForm';
import RetreatDetail from './components/admin/retreats/RetreatDetail';
import LeadList from './components/admin/leads/LeadList';
import LeadDetail from './components/admin/leads/LeadDetail';
import TestimonialList from './components/admin/testimonials/TestimonialList';
import TestimonialForm from './components/admin/testimonials/TestimonialForm';
import TestimonialDetail from './components/admin/testimonials/TestimonialDetail';

import './App.css';

// Layout para la landing page (sin padding, diseño especial)
const LandingLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="landing-page">
      {children}
    </main>
    <Footer />
  </>
);

// Layout para páginas de detalle (con padding estándar)
const DetailLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
      {children}
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* === LANDING PAGE === */}
        
        {/* Landing page principal - Layout especial sin padding */}
        <Route 
          path="/" 
          element={
            <LandingLayout>
              <LandingPage />
            </LandingLayout>
          } 
        />
        
        {/* Páginas de detalle específicas */}
        <Route 
          path="/retiro/:id" 
          element={
            <DetailLayout>
              <RetreatDetailPage />
            </DetailLayout>
          } 
        />
        <Route 
          path="/retreats/:slug" 
          element={
            <DetailLayout>
              <RetreatDetailPage />
            </DetailLayout>
          } 
        />
        
        {/* Página pública para dejar testimonio con token */}
        <Route 
          path="/testimonio" 
          element={
            <DetailLayout>
              <PublicTestimonialPage />
            </DetailLayout>
          } 
        />
        

        {/* === RUTAS DE ADMINISTRACIÓN === */}
        
        {/* Login de administrador - Sin layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Panel de administración - Rutas protegidas */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard principal */}
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* === GESTIÓN DE RETIROS === */}
          <Route path="retreats" element={<RetreatList />} />
          <Route path="retreats/new" element={<RetreatForm />} />
          <Route path="retreats/:id" element={<RetreatDetail />} />
          <Route path="retreats/:id/edit" element={<RetreatForm />} />
          
          {/* === GESTIÓN DE LEADS === */}
          <Route path="leads" element={<LeadList />} />
          <Route path="leads/:id" element={<LeadDetail />} />
          
          {/* === GESTIÓN DE TESTIMONIOS === */}
          <Route path="testimonials" element={<TestimonialList />} />
          <Route path="testimonials/new" element={<TestimonialForm />} />
          <Route path="testimonials/:id" element={<TestimonialDetail />} />
          <Route path="testimonials/:id/edit" element={<TestimonialForm />} />
          
          {/* === FUNCIONES FUTURAS === */}
          <Route 
            path="tokens" 
            element={
              <div className="text-center p-4">
                <h3>Gestión de Tokens</h3>
                <p className="text-muted">Funcionalidad en desarrollo</p>
              </div>
            } 
          />
          <Route 
            path="settings" 
            element={
              <div className="text-center p-4">
                <h3>Configuración del Sistema</h3>
                <p className="text-muted">Funcionalidad en desarrollo</p>
              </div>
            } 
          />
          <Route 
            path="profile" 
            element={
              <div className="text-center p-4">
                <h3>Mi Perfil de Administrador</h3>
                <p className="text-muted">Funcionalidad en desarrollo</p>
              </div>
            } 
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
