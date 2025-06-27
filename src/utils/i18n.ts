export const translations = {
  en: {
    // App title and main UI
    appTitle: "WeatherMine",
    searchPlaceholder: "Enter city or village",
    searchButton: "Search",
    useCurrentLocation: "Use current location",
    
    // Weather conditions
    clear: "Clear",
    cloudy: "Cloudy",
    rainy: "Rainy",
    snowy: "Snowy",
    stormy: "Stormy",
    
    // Weather details
    wind: "Wind",
    humidity: "Humidity",
    feelsLike: "Feels Like",
    sunrise: "Sunrise",
    sunset: "Sunset",
    
    // Time and seasons
    day: "Day",
    night: "Night",
    spring: "Spring",
    summer: "Summer",
    autumn: "Autumn",
    winter: "Winter",
    
    // Hourly forecast
    hourlyForecast: "24-Hour Forecast",
    rain: "Rain",
    
    // Location modal
    enableLocationTitle: "Enable Location Access",
    enableLocationText: "Allow WeatherMine to access your location to show weather for your current area.",
    allow: "Allow",
    notNow: "Not Now",
    
    // Loading and error states
    gettingLocation: "Getting your location...",
    loadingWeather: "Loading weather for your location...",
    loadingWeatherData: "Loading weather data...",
    
    // Error messages
    locationDenied: "Location access denied. Please enable location permissions.",
    locationUnavailable: "Location information unavailable.",
    locationTimeout: "Location request timed out.",
    unableToGetLocation: "Unable to get your location",
    failedToGetWeather: "Failed to get weather for your location",
    cityNotFound: "City not found",
    failedToFetch: "Failed to fetch weather data",
    
    // Settings
    settings: "Settings",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    english: "English",
    spanish: "Spanish"
  },
  es: {
    // App title and main UI
    appTitle: "WeatherMine",
    searchPlaceholder: "Ingresa ciudad o pueblo",
    searchButton: "Buscar",
    useCurrentLocation: "Usar ubicación actual",
    
    // Weather conditions
    clear: "Despejado",
    cloudy: "Nublado",
    rainy: "Lluvioso",
    snowy: "Nevado",
    stormy: "Tormentoso",
    
    // Weather details
    wind: "Viento",
    humidity: "Humedad",
    feelsLike: "Sensación",
    sunrise: "Amanecer",
    sunset: "Atardecer",
    
    // Time and seasons
    day: "Día",
    night: "Noche",
    spring: "Primavera",
    summer: "Verano",
    autumn: "Otoño",
    winter: "Invierno",
    
    // Hourly forecast
    hourlyForecast: "Pronóstico de 24 Horas",
    rain: "Lluvia",
    
    // Location modal
    enableLocationTitle: "Habilitar Acceso a Ubicación",
    enableLocationText: "Permite a WeatherMine acceder a tu ubicación para mostrar el clima de tu área actual.",
    allow: "Permitir",
    notNow: "Ahora No",
    
    // Loading and error states
    gettingLocation: "Obteniendo tu ubicación...",
    loadingWeather: "Cargando clima para tu ubicación...",
    loadingWeatherData: "Cargando datos del clima...",
    
    // Error messages
    locationDenied: "Acceso a ubicación denegado. Por favor habilita los permisos de ubicación.",
    locationUnavailable: "Información de ubicación no disponible.",
    locationTimeout: "Tiempo de espera de ubicación agotado.",
    unableToGetLocation: "No se puede obtener tu ubicación",
    failedToGetWeather: "Error al obtener el clima para tu ubicación",
    cityNotFound: "Ciudad no encontrada",
    failedToFetch: "Error al obtener datos del clima",
    
    // Settings
    settings: "Configuración",
    theme: "Tema",
    language: "Idioma",
    light: "Claro",
    dark: "Oscuro",
    english: "Inglés",
    spanish: "Español"
  }
};

export type Language = 'en' | 'es';

export function getTranslation(key: string, lang: Language = 'en'): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('language') as Language) || 'en';
  }
  return 'en';
}

export function setLanguage(lang: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
}

export function getCurrentTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  }
  return 'light';
}

export function setTheme(theme: 'light' | 'dark'): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}