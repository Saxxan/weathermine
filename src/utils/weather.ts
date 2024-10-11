export function getWeatherDescription(code: number): string {
  if (code <= 3) return "Clear";
  if (code <= 48) return "Cloudy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  return "Stormy";
}

export function processWeatherData(weatherData: any, cityName: string) {
  return {
    city: cityName,
    temperature: weatherData.current.temperature_2m,
    weatherCode: weatherData.current.weather_code,
    windSpeed: weatherData.current.wind_speed_10m,
    hourlyPrecipitation: weatherData.hourly.precipitation_probability.slice(0, 24),
    hourlyTime: weatherData.hourly.time.slice(0, 24)
  };
}