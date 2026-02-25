import { useState, useCallback, useEffect } from 'react';

const API_KEY = 'cd22d621f6e02770046117cb8ac68a0f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const HISTORY_KEY = 'weather_search_history';
const MAX_HISTORY = 5;

function celsiusToFahrenheit(c) {
  return Math.round((c * 9) / 5 + 32);
}

export function useWeather() {
  const [query, setQuery] = useState('');
  const [unit, setUnit] = useState('C'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = useCallback((cityName) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (c) => c.toLowerCase() !== cityName.toLowerCase()
      );
      return [cityName, ...filtered].slice(0, MAX_HISTORY);
    });
  }, []);

  const fetchWeather = useCallback(async (cityName) => {
    const city = cityName.trim();
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const res = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        if (res.status === 404) throw new Error('City not found. Please check the spelling.');
        if (res.status === 401) throw new Error('Invalid API key. Please update your API key.');
        throw new Error(`Error ${res.status}: Something went wrong.`);
      }
      const data = await res.json();
      setWeatherData(data);
      addToHistory(data.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [addToHistory]);

  const temperature = weatherData
    ? unit === 'C'
      ? Math.round(weatherData.main.temp)
      : celsiusToFahrenheit(weatherData.main.temp)
    : null;

  const feelsLike = weatherData
    ? unit === 'C'
      ? Math.round(weatherData.main.feels_like)
      : celsiusToFahrenheit(weatherData.main.feels_like)
    : null;

  const toggleUnit = useCallback(() => {
    setUnit((u) => (u === 'C' ? 'F' : 'C'));
  }, []);

  return {
    query,
    setQuery,
    unit,
    toggleUnit,
    loading,
    error,
    weatherData,
    temperature,
    feelsLike,
    history,
    fetchWeather,
  };
}
