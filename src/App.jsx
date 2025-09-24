import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RetirosPage from './pages/RetirosPage';
import SobreMiPage from './pages/SobreMiPage';
import TestimoniosPage from './pages/TestimoniosPage';
import ContactoPage from './pages/ContactoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

// Este componente proporciona el layout para todas las páginas excepto la de inicio
const PageLayout = () => (
  <Container style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
    <Outlet /> {/* Las rutas hijas se renderizarán aquí */}
  </Container>
);

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PageLayout />}>
            <Route path="/retiros" element={<RetirosPage />} />
            <Route path="/sobre-mi" element={<SobreMiPage />} />
            <Route path="/testimonios" element={<TestimoniosPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
