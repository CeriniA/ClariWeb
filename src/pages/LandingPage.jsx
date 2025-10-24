import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
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

  // Smooth scroll to section if URL contains a hash (e.g., /#retiros)
  useEffect(() => {
    const scrollToHash = () => {
      const rawHash = location.hash || window.location.hash;
      const hash = rawHash?.replace('#', '');
      if (!hash) return;
      // Defer and retry a few times to ensure DOM (and async content) is ready
      let attempts = 0;
      const maxAttempts = 8;
      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) {
          const headerOffset = 140; // adjust if navbar/hero covers content
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset + rect.top - headerOffset;
          window.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' });
          return;
        }
        if (attempts < maxAttempts) {
          attempts += 1;
          setTimeout(tryScroll, 75);
        }
      };
      setTimeout(tryScroll, 0);
    };

    // Trigger on mount, on hash change, and after loading completes
    if (!loading) {
      scrollToHash();
    }
  }, [location.hash, loading]);

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
      <section id="retiros">
        <RetreatsSection activeRetreats={activeRetreats} pastRetreats={pastRetreats} />
      </section>
      <ServicesSection />
      <section id="testimonios">
        <TestimonialsSection testimonials={testimonials} />
      </section>
      <FaqSection />
      <section id="registro">
        <LeadRegistrationForm />
      </section>
    </>
  );
};

export default LandingPage;
