import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { retreatsAPI, settingsAPI, testimonialsAPI } from '../services/api';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import RetreatsSection from '../components/sections/RetreatsSection';
import ServicesSection from '../components/sections/ServicesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FaqSection from '../components/sections/FaqSection';
import LeadRegistrationForm from '../components/LeadRegistrationForm';
import './LandingPage.css';

const LandingPage = () => {
  const [heroData, setHeroData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [activeRetreats, setActiveRetreats] = useState([]);
  const [pastRetreats, setPastRetreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar datos de la landing page
  const loadLandingData = async () => {
    try {
      setLoading(true);

      // Cargar datos en paralelo
      const [heroResponse, settingsResponse, testimonialsResponse, activeRetreatsResponse, pastRetreatsResponse] = await Promise.allSettled([
        retreatsAPI.getHeroData(),
        settingsAPI.getPublic(),
        testimonialsAPI.getFeatured(),
        retreatsAPI.getAll({ status: 'active' }),
        retreatsAPI.getAll({ status: 'completed', limit: 6 }) // Cargar retiros pasados
      ]);

      if (heroResponse.status === 'fulfilled') {
        const data = heroResponse.value.data.data;
        setHeroData(data);
      }

      // Procesar testimonios
      if (testimonialsResponse.status === 'fulfilled') {
        setTestimonials(testimonialsResponse.value.data.data);
      }

      // Procesar retiros activos
      if (activeRetreatsResponse.status === 'fulfilled') {
        setActiveRetreats(activeRetreatsResponse.value.data.data);
      }

      // Procesar retiros pasados
      if (pastRetreatsResponse.status === 'fulfilled') {
        setPastRetreats(pastRetreatsResponse.value.data.data);
      }

    } catch (err) {
      setError('Error al cargar la información');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLandingData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
        <p className="mt-2">Cargando...</p>
      </Container>
    );
  }

  const heroDataWithFallback = {
    ...(heroData || {}),
    activeRetreats: (heroData?.activeRetreats && heroData.activeRetreats.length > 0)
      ? heroData.activeRetreats
      : activeRetreats
  };

  return (
    <>
      <HeroSection heroData={heroDataWithFallback} error={error} />
      <AboutSection />
      <RetreatsSection activeRetreats={activeRetreats} pastRetreats={pastRetreats} />
      <ServicesSection />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection />
      <LeadRegistrationForm />
    </>
  );
};

export default LandingPage;
