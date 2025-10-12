import React, { useState, useEffect } from 'react';
import { 
  Card, Form, Button, Alert, Spinner, Row, Col, 
  InputGroup, Badge, Accordion 
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { retreatsAPI } from '../../../services/api';
import ImageUploader from '../ImageUploader';
import {
  BasicInfoSection,
  TargetAudienceSection,
  ExperiencesSection,
  LocationSection,
  PricingSection,
  FoodSection,
  PoliciesSection,
  IncludesSection
} from './RetreatFormSections';

const RetreatForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    targetAudience: [''],
    experiences: [''],
    startDate: '',
    endDate: '',
    location: {
      name: '',
      address: '',
      city: '',
      state: '',
      country: 'Argentina',
      description: '',
      features: [''],
      accommodationType: '',
      howToGetThere: {
        byBus: '',
        byCar: '',
        additionalInfo: ''
      }
    },
    price: '',
    currency: 'ARS',
    pricingTiers: [],
    maxParticipants: 20,
    currentParticipants: 0,
    includes: [''],
    notIncludes: [''],
    foodInfo: {
      foodType: '',
      description: '',
      restrictions: ['']
    },
    policies: {
      substanceFree: false,
      restrictions: [''],
      cancellationPolicy: '',
      additionalPolicies: ['']
    },
    images: [''],
    heroImageIndex: 0, // Índice de la imagen para el hero
    highlightWords: [''], // Palabras a resaltar en el título
    status: 'draft',
    showInHero: false,
    whatsappNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEdit) {
      loadRetreat();
    }
  }, [id, isEdit]);

  const loadRetreat = async () => {
    try {
      setLoading(true);
      const response = await retreatsAPI.getById(id);
      const retreat = response.data.data;
      
      // Formatear fechas para inputs
      const formatDateForInput = (dateString) => {
        console.log('📅 Fecha original:', dateString);
        const formatted = new Date(dateString).toISOString().slice(0, 16);
        console.log('📅 Fecha formateada:', formatted);
        return formatted;
      };

      console.log('📋 Retiro cargado:', retreat);
      console.log('📅 Fechas originales:', {
        startDate: retreat.startDate,
        endDate: retreat.endDate
      });

      setFormData({
        ...retreat,
        startDate: formatDateForInput(retreat.startDate),
        endDate: formatDateForInput(retreat.endDate),
        // Asegurar que los arrays existen
        targetAudience: retreat.targetAudience || [''],
        experiences: retreat.experiences || [''],
        includes: retreat.includes || [''],
        notIncludes: retreat.notIncludes || [''],
        images: retreat.images || [''],
        highlightWords: retreat.highlightWords || [''],
        location: {
          ...retreat.location,
          features: retreat.location?.features || [''],
          howToGetThere: retreat.location?.howToGetThere || {
            byBus: '',
            byCar: '',
            additionalInfo: ''
          }
        },
        foodInfo: {
          ...retreat.foodInfo,
          // Compatibilidad: si existe 'type' lo usa, sino usa 'foodType'
          foodType: retreat.foodInfo?.foodType || retreat.foodInfo?.type || '',
          restrictions: retreat.foodInfo?.restrictions || ['']
        },
        policies: {
          ...retreat.policies,
          restrictions: retreat.policies?.restrictions || [''],
          additionalPolicies: retreat.policies?.additionalPolicies || ['']
        }
      });
    } catch (err) {
      console.error('Error cargando retiro:', err);
      setError('Error al cargar el retiro');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: fieldValue
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: fieldValue
      }));
    }
  };

  const handleArrayChange = (values, field) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: values
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: values
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Limpiar arrays vacíos
      const cleanData = {
        ...formData,
        targetAudience: formData.targetAudience.filter(item => item.trim() !== ''),
        experiences: formData.experiences.filter(item => item.trim() !== ''),
        includes: formData.includes.filter(item => item.trim() !== ''),
        notIncludes: formData.notIncludes.filter(item => item.trim() !== ''),
        images: formData.images.filter(item => item.trim() !== ''),
        highlightWords: formData.highlightWords.filter(item => item.trim() !== ''),
        location: {
          ...formData.location,
          features: formData.location.features.filter(item => item.trim() !== '')
        },
        foodInfo: {
          ...formData.foodInfo,
          restrictions: formData.foodInfo.restrictions.filter(item => item.trim() !== '')
        },
        policies: {
          ...formData.policies,
          restrictions: formData.policies.restrictions.filter(item => item.trim() !== ''),
          additionalPolicies: formData.policies.additionalPolicies.filter(item => item.trim() !== '')
        }
      };

      console.log('📤 Datos a enviar:', JSON.stringify(cleanData, null, 2));
      console.log('🔍 foodInfo específicamente:', cleanData.foodInfo);

      if (isEdit) {
        console.log('🔄 Actualizando retiro ID:', id);
        await retreatsAPI.update(id, cleanData);
        setSuccess('Retiro actualizado exitosamente');
      } else {
        console.log('➕ Creando nuevo retiro');
        await retreatsAPI.create(cleanData);
        setSuccess('Retiro creado exitosamente');
        setTimeout(() => navigate('/admin/retreats'), 2000);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'Error al procesar el retiro');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando retiro...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>🏔️ {isEdit ? 'Editar Retiro' : 'Nuevo Retiro'}</h1>
        <Button variant="outline-secondary" onClick={() => navigate('/admin/retreats')}>
          ← Volver
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={12}>
            {/* Formulario organizado en secciones colapsables */}
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>📝 Información Básica</Accordion.Header>
                <Accordion.Body>
                  <BasicInfoSection 
                    formData={formData} 
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>🎯 Para Quién es Este Retiro</Accordion.Header>
                <Accordion.Body>
                  <TargetAudienceSection 
                    formData={formData} 
                    handleArrayChange={handleArrayChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>✨ Experiencias y Actividades</Accordion.Header>
                <Accordion.Body>
                  <ExperiencesSection 
                    formData={formData} 
                    handleArrayChange={handleArrayChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>📍 Ubicación y Lugar</Accordion.Header>
                <Accordion.Body>
                  <LocationSection 
                    formData={formData} 
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4">
                <Accordion.Header>💰 Precios e Intercambio</Accordion.Header>
                <Accordion.Body>
                  <PricingSection 
                    formData={formData} 
                    handleChange={handleChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="5">
                <Accordion.Header>✅ Qué Incluye / No Incluye</Accordion.Header>
                <Accordion.Body>
                  <IncludesSection 
                    formData={formData} 
                    handleArrayChange={handleArrayChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="6">
                <Accordion.Header>🥗 Alimentación</Accordion.Header>
                <Accordion.Body>
                  <FoodSection 
                    formData={formData} 
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="7">
                <Accordion.Header>📋 Políticas y Restricciones</Accordion.Header>
                <Accordion.Body>
                  <PoliciesSection 
                    formData={formData} 
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="8">
                <Accordion.Header>🖼️ Imágenes del Retiro</Accordion.Header>
                <Accordion.Body>
                  <Card>
                    <Card.Body>
                      <ImageUploader
                        images={formData.images}
                        onImagesChange={(images) => handleArrayChange(images, 'images')}
                        maxImages={10}
                      />
                      <Form.Text className="text-muted">
                        Sube hasta 10 imágenes que representen el retiro, el lugar y las actividades
                      </Form.Text>
                      
                      {/* Selector de imagen para el Hero */}
                      {formData.images && formData.images.length > 1 && formData.images.some(img => img.trim()) && (
                        <div className="mt-4">
                          <Form.Group>
                            <Form.Label>
                              <strong>🎯 Imagen Principal para el Hero</strong>
                            </Form.Label>
                            <Form.Select
                              value={formData.heroImageIndex}
                              onChange={(e) => setFormData({...formData, heroImageIndex: parseInt(e.target.value)})}
                            >
                              {formData.images.map((image, index) => (
                                image.trim() && (
                                  <option key={index} value={index}>
                                    Imagen {index + 1} {index === 0 ? '(por defecto)' : ''}
                                  </option>
                                )
                              ))}
                            </Form.Select>
                            <Form.Text className="text-muted">
                              Selecciona qué imagen se mostrará en la sección principal (Hero) de la landing page
                            </Form.Text>
                          </Form.Group>
                          
                          {/* Vista previa de la imagen seleccionada */}
                          {formData.images[formData.heroImageIndex] && (
                            <div className="mt-3">
                              <small className="text-muted d-block mb-2">Vista previa de imagen del Hero:</small>
                              <img 
                                src={formData.images[formData.heroImageIndex]} 
                                alt="Vista previa Hero" 
                                style={{ 
                                  width: '200px', 
                                  height: '120px', 
                                  objectFit: 'cover', 
                                  borderRadius: '8px',
                                  border: '2px solid var(--color-primary)'
                                }} 
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="9">
                <Accordion.Header>⚙️ Configuración y Estado</Accordion.Header>
                <Accordion.Body>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                            >
                              <option value="draft">Borrador</option>
                              <option value="active">Activo</option>
                              <option value="completed">Completado</option>
                              <option value="cancelled">Cancelado</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Capacidad Máxima *</Form.Label>
                            <Form.Control
                              type="number"
                              name="maxParticipants"
                              value={formData.maxParticipants}
                              onChange={handleChange}
                              min="1"
                              max="100"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Check
                          type="checkbox"
                          name="showInHero"
                          label="Mostrar en Hero de la página principal"
                          checked={formData.showInHero}
                          onChange={handleChange}
                        />
                        <Form.Text className="text-muted">
                          Solo los retiros marcados aparecerán destacados en la página principal
                        </Form.Text>
                      </Form.Group>

                      {/* Palabras a resaltar en el título */}
                      <Form.Group className="mb-3">
                        <Form.Label>🎨 Palabras a resaltar en el título</Form.Label>
                        <div className="mb-2">
                          {formData.highlightWords.map((word, index) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                              <Form.Control
                                type="text"
                                value={word}
                                onChange={(e) => {
                                  const newWords = [...formData.highlightWords];
                                  newWords[index] = e.target.value;
                                  handleArrayChange(newWords, 'highlightWords');
                                }}
                                placeholder="Ej: AÑO NUEVO, TRANSFORMACIÓN, etc."
                                className="me-2"
                              />
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => {
                                  const newWords = formData.highlightWords.filter((_, i) => i !== index);
                                  handleArrayChange(newWords, 'highlightWords');
                                }}
                                disabled={formData.highlightWords.length === 1}
                              >
                                ✕
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            handleArrayChange([...formData.highlightWords, ''], 'highlightWords');
                          }}
                        >
                          + Agregar palabra
                        </Button>
                        <Form.Text className="text-muted d-block mt-2">
                          Las palabras especificadas se mostrarán en color dorado en el título del hero. 
                          Deja vacío si no quieres resaltar ninguna palabra.
                        </Form.Text>
                      </Form.Group>
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Botones de acción */}
            <div className="d-flex justify-content-end gap-3 mt-4 p-4 bg-light rounded">
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate('/admin/retreats')}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    {isEdit ? 'Actualizando...' : 'Creando...'}
                  </>
                ) : (
                  <>
                    {isEdit ? '💾 Actualizar Retiro' : '✨ Crear Retiro'}
                  </>
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RetreatForm;
