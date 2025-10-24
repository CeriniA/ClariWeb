import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import HighlightedTitle from '../HighlightedTitle';
import Button from '@/components/ui/Button';
import { getRetreatImage, clariPhotos } from '../../utils/imageHelpers';
import { isPastRetreat } from '../../utils/retreatHelpers';
import { Link } from 'react-router-dom';

const HeroSection = ({ heroData, error }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const formatLocation = (loc) => {
    if (!loc) return 'Por confirmar';
    if (typeof loc === 'string') return loc;
    try {
      const { name, city, state, country, address } = loc || {};
      const parts = [name, city, state, country].filter(Boolean);
      if (parts.length > 0) return parts.join(', ');
      if (address) {
        const cityState = [city, state].filter(Boolean).join(', ');
        return cityState || address;
      }
      return 'Por confirmar';
    } catch {
      return 'Por confirmar';
    }
  };

  // Crear array de retiros con sus imágenes (uno por retiro)
  const getHeroSlides = () => {
    // Si hay retiros activos, filtrar los que no han pasado
    if (heroData?.activeRetreats?.length > 0) {
      const validRetreats = heroData.activeRetreats.filter(retreat => !isPastRetreat(retreat));
      
      if (validRetreats.length > 0) {
        return validRetreats.map(retreat => {
          const heroImageIndex = retreat.heroImageIndex || 0;
          const heroImage = retreat.images?.[heroImageIndex] || retreat.images?.[0];
          return {
            retreat,
            image: heroImage ? getRetreatImage(heroImage, heroImageIndex, 'hero') : clariPhotos[0],
            type: 'active'
          };
        });
      }
    }

    // Si hay un retiro activo individual, verificar que no sea pasado
    if (heroData?.activeRetreat && !isPastRetreat(heroData.activeRetreat)) {
      const heroImageIndex = heroData.activeRetreat.heroImageIndex || 0;
      const heroImage = heroData.activeRetreat.images?.[heroImageIndex] || heroData.activeRetreat.images?.[0];
      return [{
        retreat: heroData.activeRetreat,
        image: heroImage ? getRetreatImage(heroImage, heroImageIndex, 'hero') : clariPhotos[0],
        type: 'active'
      }];
    }

    // Si hay retiros pasados, usar uno por retiro
    if (heroData?.pastRetreats?.length > 0) {
      return heroData.pastRetreats.slice(0, 3).map(retreat => {
        const heroImageIndex = retreat.heroImageIndex || 0;
        const heroImage = retreat.images?.[heroImageIndex] || retreat.images?.[0];
        return {
          retreat,
          image: heroImage ? getRetreatImage(heroImage, heroImageIndex, 'hero') : clariPhotos[0],
          type: 'past'
        };
      });
    }

    // Fallback: usar fotos de Clarisa
    return clariPhotos.slice(0, 3).map((photo, index) => ({
      retreat: null,
      image: photo,
      type: 'empty'
    }));
  };

  const heroSlides = getHeroSlides();
  const currentSlide = heroSlides[currentIndex] || heroSlides[0];

  // Función para obtener contenido del hero según el slide actual
  const getHeroContent = () => {
    switch (currentSlide.type) {
      case 'active':
        return {
          title: currentSlide.retreat.title || "Próximo Retiro",
          subtitle: currentSlide.retreat.shortDescription || currentSlide.retreat.description?.substring(0, 200) + "..." || "Experiencia de transformación",
          showRetreatInfo: true,
          buttonText: "Reservar mi lugar",
          buttonLink: "#contacto",
          retreat: currentSlide.retreat
        };

      case 'past':
        return {
          title: "Soul Experiences",
          subtitle: "Retiros de transformación y autoconocimiento en la naturaleza. Próximamente nuevas experiencias.",
          showRetreatInfo: false,
          buttonText: "Quiero Más Información",
          buttonLink: "#registro"
        };

      default:
        return {
          title: "Soul Experiences",
          subtitle: "Próximamente nuevos retiros de transformación",
          showRetreatInfo: false,
          buttonText: "Mantente Informado",
          buttonLink: "#contacto"
        };
    }
  };

  const heroContent = getHeroContent();

  // Efecto único para cambiar slides (retiro + imagen juntos) cada 5 segundos
  useEffect(() => {
    if (heroSlides.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
      }, 5000); // Cambiar cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [heroSlides.length]);


  const handleContactClick = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {error && <Alert variant="danger" className="m-3">{error}</Alert>}

      {/* SECCIÓN HERO */}
      <section id="inicio" className="hero-section">
        {/* Fondo con imagen del slide actual */}
        <div className="hero-background">
          <img
            src={currentSlide.image}
            alt="Hero background"
            className="hero-background-image active"
          />
        </div>

        {/* Overlay para contraste */}
        <div className="hero-overlay"></div>

        {/* Contenido centrado */}
        <div className="hero-content">
          <h1>
            <HighlightedTitle
              title={heroContent.title}
              highlightWords={currentSlide.retreat?.highlightWords}
            />
          </h1>
          <p>{heroContent.subtitle}</p>

          {/* Información adicional del retiro si es activo */}
          {heroContent.showRetreatInfo && heroContent.retreat && (
            <div className="mb-2 p-2 rounded" style={{
              backgroundColor: 'var(--color-primary)',
              // backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
                <div className="text-center">
                  <small style={{ opacity: 0.8 }}>📅 Fechas</small>
                  <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                    {new Date(heroContent.retreat.startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - {new Date(heroContent.retreat.endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <div className="text-center">
                  <small style={{ opacity: 0.8 }}>📍 Ubicación</small>
                  <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                    {formatLocation(heroContent.retreat.location.city + ', ' + heroContent.retreat.location.state)}
                  </div>
                </div>
                <div className="text-center">
                  <small style={{ opacity: 0.8 }}>👥 Disponibles</small>
                  <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                    {heroContent.retreat.availableSpots} lugares
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            variant="secondary"
            size="lg"
            to={heroContent.showRetreatInfo && heroContent.retreat ? `/retreats/${heroContent.retreat.slug || heroContent.retreat._id}` : null}
            onClick={!(heroContent.showRetreatInfo && heroContent.retreat) ? () => {
              const section = document.getElementById('registro');
              section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } : undefined}
          >
            {heroContent.buttonText}
          </Button>
          {/* {heroContent.showRetreatInfo && heroContent.retreat && (
            <div className="mt-3">
              <Link 
                to={`/retreats/${heroContent.retreat.slug || heroContent.retreat._id}`} 
                className="btn btn-outline-light btn-lg"
                style={{ borderRadius: '50px' }}
              >
                Ver detalle →
              </Link>
            </div>
          )} */}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
