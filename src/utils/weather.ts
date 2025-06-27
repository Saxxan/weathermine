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
    temperature: Math.round(weatherData.current.temperature_2m),
    minTemperature: Math.round(weatherData.daily.temperature_2m_min[0]),
    maxTemperature: Math.round(weatherData.daily.temperature_2m_max[0]),
    weatherCode: weatherData.current.weather_code,
    windSpeed: Math.round(weatherData.current.wind_speed_10m),
    hourlyPrecipitation: weatherData.hourly.precipitation_probability.slice(0, 24),
    hourlyTime: weatherData.hourly.time.slice(0, 24),
    hourlyWindSpeed: weatherData.hourly.wind_speed_10m.slice(0, 24).map((speed: number) => Math.round(speed)),
    hourlyPrecipitationAmount: weatherData.hourly.precipitation.slice(0, 24).map((amount: number) => Math.round(amount * 10) / 10),
    hourlyTemperature: weatherData.hourly.temperature_2m.slice(0, 24).map((temp: number) => Math.round(temp)),
    hourlyHumidity: weatherData.hourly.relative_humidity_2m.slice(0, 24)
  };
}