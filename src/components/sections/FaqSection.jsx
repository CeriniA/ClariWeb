import React, { useState } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';
import CTAButton from '../CTAButton';
import './FaqSection.css';

const FaqSection = () => {
  const [activeKey, setActiveKey] = useState(null);

  const toggleAccordion = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const faqs = [
    {
      question: '¿Son experiencias para todos los géneros?',
      answer: 'Aquí irá la respuesta detallada sobre la inclusión de géneros en nuestras experiencias.'
    },
    {
      question: '¿Puedo sumarme con mi pareja?',
      answer: 'Aquí irá la respuesta sobre la participación de parejas en los retiros.'
    },
    {
      question: '¿Las actividades son obligatorias?',
      answer: 'Aquí se explicará la flexibilidad de participación en las actividades del retiro.'
    },
    {
      question: '¿Qué incluye el retiro?',
      answer: 'Aquí se detallará todo lo que está incluido en el precio del retiro.'
    },
    {
      question: '¿Qué tengo que llevar?',
      answer: 'Aquí se proporcionará una lista de artículos recomendados para llevar al retiro.'
    }
  ];

  return (
    <section id="faq" className="faq-section py-5">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <div className="position-relative d-inline-block mb-3">
              <FaQuestionCircle className="text-primary me-2" size={28} />
              <h2 className="display-5 fw-bold mb-3 d-inline">
                <span className="font-heading">PREGUNTAS FRECUENTES</span>
              </h2>
            </div>
            <p className="lead text-muted mb-0">Encuentra respuestas a las dudas más comunes</p>
            <div className="divider mx-auto my-4" style={{ width: '80px', height: '3px', backgroundColor: 'var(--color-primary)' }}></div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="faq-accordion">
              <Accordion activeKey={activeKey} className="mb-5">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item mb-3">
                    <div 
                      className="faq-question p-4 d-flex justify-content-between align-items-center"
                      onClick={() => toggleAccordion(index.toString())}
                    >
                      <h3 className="h5 mb-0 font-heading">{faq.question}</h3>
                      {activeKey === index.toString() ? 
                        <FaChevronUp className="text-primary" /> : 
                        <FaChevronDown className="text-primary" />
                      }
                    </div>
                    <Accordion.Collapse eventKey={index.toString()}>
                      <div className="faq-answer p-4">
                        <p className="mb-0">{faq.answer}</p>
                      </div>
                    </Accordion.Collapse>
                  </div>
                ))}
              </Accordion>
            </div>

            {/* CTA después de las FAQs */}
            <div className="text-center mt-5">
              <p className="lead mb-4" style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>
                ¿Aún tienes dudas? Contáctanos directamente
              </p>
              <CTAButton 
                text="Hacer una Consulta"
                icon="💬"
                size="lg"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FaqSection;
