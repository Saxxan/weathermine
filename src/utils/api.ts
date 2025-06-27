const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export async function getCoordinates(city: string): Promise<{ latitude: number; longitude: number; name: string }> {
  const params = new URLSearchParams({
    name: city,
    count: '1',
    language: 'en',
    format: 'json'
  });

  const response = await fetch(`${GEOCODING_API_URL}?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch coordinates');
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error('City not found');
  }

  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
    name: data.results[0].name
  };
}

export async function searchCities(query: string): Promise<Array<{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  admin2?: string;
}>> {
  if (query.length < 2) return [];

  const params = new URLSearchParams({
    name: query,
    count: '10',
    language: 'en',
    format: 'json'
  });

  const response = await fetch(`${GEOCODING_API_URL}?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch city suggestions');
  }

  const data = await response.json();
  return data.results || [];
}

export async function getWeatherData(latitude: number, longitude: number) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m',
    hourly: 'temperature_2m,precipitation_probability,precipitation,wind_speed_10m,relative_humidity_2m',
    daily: 'temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '1'
  });

  const response = await fetch(`${WEATHER_API_URL}?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return await response.json();
}