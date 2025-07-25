import { getTranslation, getCurrentLanguage, type Language } from './i18n';

export function getWeatherDescription(code: number, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  
  if (code <= 3) return getTranslation("clear", currentLang);
  if (code <= 48) return getTranslation("cloudy", currentLang);
  if (code <= 67) return getTranslation("rainy", currentLang);
  if (code <= 77) return getTranslation("snowy", currentLang);
  return getTranslation("stormy", currentLang);
}

export function getSeason(date: Date, latitude: number, lang?: Language): string {
  const currentLang = lang || getCurrentLanguage();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  
  // Determine hemisphere
  const isNorthernHemisphere = latitude >= 0;
  
  let season: string;
  
  if (isNorthernHemisphere) {
    // Northern Hemisphere seasons
    if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 20)) {
      season = "winter";
    } else if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) {
      season = "spring";
    } else if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 22)) {
      season = "summer";
    } else {
      season = "autumn";
    }
  } else {
    // Southern Hemisphere seasons (opposite)
    if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 20)) {
      season = "summer";
    } else if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day < 21)) {
      season = "autumn";
    } else if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 22)) {
      season = "winter";
    } else {
      season = "spring";
    }
  }
  
  return getTranslation(season, currentLang);
}

export function isDayTime(currentTime: Date, sunrise: Date, sunset: Date): boolean {
  const currentHour = currentTime.getTime();
  const sunriseTime = sunrise.getTime();
  const sunsetTime = sunset.getTime();
  
  return currentHour >= sunriseTime && currentHour <= sunsetTime;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
}

export function processWeatherData(weatherData: any, cityName: string, latitude: number = 0): object {
  const current = weatherData?.current ?? {};
  const daily = weatherData?.daily ?? {};
  const hourly = weatherData?.hourly ?? {};
  const currentLang = getCurrentLanguage();
  
  // Get current time in the location's timezone
  const currentTime = new Date();
  
  // Parse sunrise and sunset times
  const sunrise = daily.sunrise?.[0] ? new Date(daily.sunrise[0]) : new Date();
  const sunset = daily.sunset?.[0] ? new Date(daily.sunset[0]) : new Date();
  
  // Determine if it's day or night
  const isDay = isDayTime(currentTime, sunrise, sunset);
  
  // Get season
  const season = getSeason(currentTime, latitude, currentLang);

  return {
    city: cityName,
    temperature: Math.round(current.temperature_2m ?? 0),
    minTemperature: Math.round(daily.temperature_2m_min?.[0] ?? 0),
    maxTemperature: Math.round(daily.temperature_2m_max?.[0] ?? 0),
    weatherCode: current.weather_code ?? 0,
    windSpeed: Math.round(current.wind_speed_10m ?? 0),
    humidity: Math.round(current.relative_humidity_2m ?? 0),
    currentTime: formatTime(currentTime),
    season: season,
    isDay: isDay,
    dayNight: isDay ? getTranslation('day', currentLang) : getTranslation('night', currentLang),
    sunrise: formatTime(sunrise),
    sunset: formatTime(sunset),
    hourlyPrecipitation: (hourly.precipitation_probability ?? []).slice(0, 24),
    hourlyTime: (hourly.time ?? []).slice(0, 24),
    hourlyWindSpeed: (hourly.wind_speed_10m ?? []).slice(0, 24).map((speed: number) => Math.round(speed)),
    hourlyPrecipitationAmount: (hourly.precipitation ?? []).slice(0, 24).map((amount: number) => Math.round(amount * 10) / 10),
    hourlyTemperature: (hourly.temperature_2m ?? []).slice(0, 24).map((temp: number) => Math.round(temp)),
    hourlyHumidity: (hourly.relative_humidity_2m ?? []).slice(0, 24)
  };
}