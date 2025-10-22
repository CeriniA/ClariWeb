import React from 'react';
import { Card, Form, Button, Row, Col, Accordion, InputGroup } from 'react-bootstrap';

// Componente para manejar arrays dinámicos
const DynamicArrayField = ({ label, values, onChange, placeholder, fieldName }) => {
  const addField = () => {
    onChange([...values, '']);
  };

  const removeField = (index) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const updateField = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    onChange(newValues);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {values.map((value, index) => (
        <div key={index} className="mb-2">
          <InputGroup>
            <Form.Control
              type="text"
              value={value}
              onChange={(e) => updateField(index, e.target.value)}
              placeholder={placeholder}
            />
            {values.length > 1 && (
              <Button
                variant="outline-danger"
                onClick={() => removeField(index)}
                size="sm"
              >
                ✕
              </Button>
            )}
          </InputGroup>
        </div>
      ))}
      <Button variant="outline-primary" size="sm" onClick={addField}>
        + Agregar {label.toLowerCase()}
      </Button>
    </Form.Group>
  );
};

// Sección de información básica
export const BasicInfoSection = ({ formData, handleChange, handleArrayChange }) => (
  <Card className="mb-4">
    <Card.Header>
      <h5 className="mb-0">📝 Información Básica</h5>
    </Card.Header>
    <Card.Body>
      <Form.Group className="mb-3">
        <Form.Label>Título del Retiro *</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ej: Retiro de Año Nuevo 2026"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción Corta</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Descripción breve que aparecerá en las cards"
          maxLength={300}
        />
        <Form.Text className="text-muted">
          {formData.shortDescription.length}/300 caracteres
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción Completa *</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción detallada del retiro..."
          required
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Inicio *</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Fin *</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

// Sección de público objetivo
export const TargetAudienceSection = ({ formData, handleArrayChange }) => (
  <Card className="mb-4">
    <Card.Header>
      <h5 className="mb-0">🎯 ¿Para Quién es Este Retiro?</h5>
    </Card.Header>
    <Card.Body>
      <DynamicArrayField
        label="Perfil del Participante Ideal"
        values={formData.targetAudience}
        onChange={(values) => handleArrayChange(values, 'targetAudience')}
        placeholder="Ej: Estás en un camino de autoconocimiento..."
        fieldName="targetAudience"
      />
      <Form.Text className="text-muted">
        Describe el perfil de las personas para quienes está diseñado este retiro
      </Form.Text>
    </Card.Body>
  </Card>
);

// Sección de experiencias
export const ExperiencesSection = ({ formData, handleArrayChange }) => (
  <Card className="mb-4">
    <Card.Header>
      <h5 className="mb-0">✨ Experiencias y Actividades</h5>
    </Card.Header>
    <Card.Body>
      <DynamicArrayField
        label="Actividades del Retiro"
        values={formData.experiences}
        onChange={(values) => handleArrayChange(values, 'experiences')}
        placeholder="Ej: Caminatas en la montaña para conectar con la fuerza del entorno"
        fieldName="experiences"
      />
      <Form.Text className="text-muted">
        Lista todas las actividades y experiencias que se realizarán durante el retiro
      </Form.Text>
    </Card.Body>
  </Card>
);

// Sección de ubicación
export const LocationSection = ({ formData, handleChange, handleArrayChange }) => (
  <Card className="mb-4">
    <Card.Header>
      <h5 className="mb-0">📍 Ubicación y Lugar</h5>
    </Card.Header>
    <Card.Body>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Lugar *</Form.Label>
            <Form.Control
              type="text"
              name="location.name"
              value={formData.location.name}
              onChange={handleChange}
              placeholder="Ej: Ecoposada Madreverde"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Alojamiento</Form.Label>
            <Form.Control
              type="text"
              name="location.accommodationType"
              value={formData.location.accommodationType}
              onChange={handleChange}
              placeholder="Ej: Cabañas compartidas con camas individuales"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Dirección *</Form.Label>
        <Form.Control
          type="text"
          name="location.address"
          value={formData.location.address}
          onChange={handleChange}
          placeholder="Dirección completa"
          required
        />
      </Form.Group>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              placeholder="Los Molles"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Provincia/Estado</Form.Label>
            <Form.Control
              type="text"
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
              placeholder="Córdoba"
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              placeholder="Argentina"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Descripción del Lugar</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="location.description"
          value={formData.location.description}
          onChange={handleChange}
          placeholder="Describe el lugar, su ambiente, características especiales..."
        />
      </Form.Group>

      <DynamicArrayField
        label="Características del Lugar"
        values={formData.location.features}
        onChange={(values) => handleArrayChange(values, 'location.features')}
        placeholder="Ej: Parque de dos hectáreas con estanques"
        fieldName="location.features"
      />

      <Accordion className="mt-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Cómo Llegar</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>En Ómnibus</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="location.howToGetThere.byBus"
                value={formData.location.howToGetThere.byBus}
                onChange={handleChange}
                placeholder="Instrucciones para llegar en ómnibus..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>En Auto Particular</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="location.howToGetThere.byCar"
                value={formData.location.howToGetThere.byCar}
                onChange={handleChange}
                placeholder="Instrucciones para llegar en auto..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Información Adicional</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="location.howToGetThere.additionalInfo"
                value={formData.location.howToGetThere.additionalInfo}
                onChange={handleChange}
                placeholder="Información adicional sobre el traslado..."
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Card.Body>
  </Card>
);

// Sección de precios
export const PricingSection = ({ formData, handleChange, handlePricingTiersChange }) => (
  <Card className="mb-4">
    <Card.Header>
      <h5 className="mb-0">💰 Precios e Intercambio</h5>
    </Card.Header>
    <Card.Body>
      <Row>
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label>Precio Base *</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="1111111"
                required
              />
              <Form.Select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="ARS">ARS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>WhatsApp de Contacto</Form.Label>
            <Form.Control
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="+54 9 11 1234-5678"
            />
          </Form.Group>
        </Col>
      </Row>

      <hr />
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Precios escalonados (opcional)</h6>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => handlePricingTiersChange([...
            (Array.isArray(formData.pricingTiers) ? formData.pricingTiers : []),
            { name: '', price: '', validUntil: '', paymentOptions: [''] }
          ])}
        >
          + Agregar tier
        </Button>
      </div>
      <Form.Text className="text-muted d-block mb-3">
        Define descuentos por fecha. Cada tier puede tener un nombre, un precio y una fecha límite.
      </Form.Text>

      {Array.isArray(formData.pricingTiers) && formData.pricingTiers.length > 0 && (
        <div className="d-flex flex-column gap-3">
          {formData.pricingTiers.map((tier, index) => {
            const updateTier = (field, value) => {
              const tiers = [...formData.pricingTiers];
              tiers[index] = { ...tiers[index], [field]: value };
              handlePricingTiersChange(tiers);
            };
            const updatePaymentOptions = (values) => {
              const tiers = [...formData.pricingTiers];
              tiers[index] = { ...tiers[index], paymentOptions: values };
              handlePricingTiersChange(tiers);
            };
            const removeTier = () => {
              const tiers = formData.pricingTiers.filter((_, i) => i !== index);
              handlePricingTiersChange(tiers);
            };

            return (
              <Card key={index} className="p-3">
                <div className="d-flex justify-content-between align-items-start">
                  <strong>Tier #{index + 1}</strong>
                  <Button variant="outline-danger" size="sm" onClick={removeTier}>
                    Eliminar
                  </Button>
                </div>
                <Row className="mt-2">
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        value={tier.name || ''}
                        onChange={(e) => updateTier('name', e.target.value)}
                        placeholder="Ej: Anticipadas"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Precio</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          type="number"
                          value={tier.price ?? ''}
                          onChange={(e) => updateTier('price', e.target.value)}
                          placeholder="99999"
                          min="0"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Válido hasta</Form.Label>
                      <Form.Control
                        type="date"
                        value={tier.validUntil ? String(tier.validUntil).slice(0, 10) : ''}
                        onChange={(e) => updateTier('validUntil', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <DynamicArrayField
                  label="Opciones de pago"
                  values={Array.isArray(tier.paymentOptions) && tier.paymentOptions.length ? tier.paymentOptions : ['']}
                  onChange={(values) => updatePaymentOptions(values)}
                  placeholder="Ej: Un pago | 3 cuotas de $X"
                  fieldName={`pricingTiers.${index}.paymentOptions`}
                />
              </Card>
            );
          })}
        </div>
      )}
    </Card.Body>
  </Card>
);

// Sección de alimentación
export const FoodSection = ({ formData, handleChange, handleArrayChange }) => (
  <Card className="mb-4">
    <Card.Header>
      <h5 className="mb-0">🥗 Alimentación</h5>
    </Card.Header>
    <Card.Body>
      <Form.Group className="mb-3">
        <Form.Label>Tipo de Alimentación</Form.Label>
        <Form.Control
          type="text"
          name="foodInfo.foodType"
          value={formData.foodInfo.foodType}
          onChange={handleChange}
          placeholder="Ej: Crudivegana, 100% orgánica"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción de la Alimentación</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="foodInfo.description"
          value={formData.foodInfo.description}
          onChange={handleChange}
          placeholder="Describe el tipo de comidas que se servirán..."
        />
      </Form.Group>

      <DynamicArrayField
        label="Restricciones Alimentarias"
        values={formData.foodInfo.restrictions}
        onChange={(values) => handleArrayChange(values, 'foodInfo.restrictions')}
        placeholder="Ej: Sin gluten, Sin lácteos"
        fieldName="foodInfo.restrictions"
      />
    </Card.Body>
  </Card>
);

// Sección de políticas
export const PoliciesSection = ({ formData, handleChange, handleArrayChange }) => (
  <Card className="mb-4">
    <Card.Header>
      <h5 className="mb-0">📋 Políticas y Restricciones</h5>
    </Card.Header>
    <Card.Body>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          name="policies.substanceFree"
          label="Espacio 100% libre de sustancias"
          checked={formData.policies.substanceFree}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Marca si el retiro será libre de alcohol, tabaco y otras sustancias
        </Form.Text>
      </Form.Group>

      <DynamicArrayField
        label="Restricciones del Retiro"
        values={formData.policies.restrictions}
        onChange={(values) => handleArrayChange(values, 'policies.restrictions')}
        placeholder="Ej: Sin tabaco, Sin alcohol, Sin cannabis"
        fieldName="policies.restrictions"
      />

      <Form.Group className="mb-3">
        <Form.Label>Política de Cancelación</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="policies.cancellationPolicy"
          value={formData.policies.cancellationPolicy}
          onChange={handleChange}
          placeholder="Describe las condiciones de cancelación y reembolso..."
        />
      </Form.Group>

      <DynamicArrayField
        label="Políticas Adicionales"
        values={formData.policies.additionalPolicies}
        onChange={(values) => handleArrayChange(values, 'policies.additionalPolicies')}
        placeholder="Ej: Las actividades pueden adaptarse según condiciones climáticas"
        fieldName="policies.additionalPolicies"
      />
    </Card.Body>
  </Card>
);

// Sección de qué incluye
export const IncludesSection = ({ formData, handleArrayChange }) => (
  <Card className="mb-4">
    <Card.Header>
      <h5 className="mb-0">✅ Qué Incluye / No Incluye</h5>
    </Card.Header>
    <Card.Body>
      <Row>
        <Col md={6}>
          <DynamicArrayField
            label="Qué INCLUYE"
            values={formData.includes}
            onChange={(values) => handleArrayChange(values, 'includes')}
            placeholder="Ej: Cuatro noches de alojamiento"
            fieldName="includes"
          />
        </Col>
        <Col md={6}>
          <DynamicArrayField
            label="Qué NO INCLUYE"
            values={formData.notIncludes}
            onChange={(values) => handleArrayChange(values, 'notIncludes')}
            placeholder="Ej: Traslados desde tu lugar de origen"
            fieldName="notIncludes"
          />
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default {
  BasicInfoSection,
  TargetAudienceSection,
  ExperiencesSection,
  LocationSection,
  PricingSection,
  FoodSection,
  PoliciesSection,
  IncludesSection
};
