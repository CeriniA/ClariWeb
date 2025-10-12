import { useState, useEffect } from 'react';
import { settingsAPI } from '../services/api';

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsAPI.getPublic();
        setSettings(response.data.data);
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('No se pudo cargar la configuración del sitio.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};
