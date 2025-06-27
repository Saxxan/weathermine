export function getWeatherDescription(code: number): string {
  if (code <= 3) return "Clear";
  if (code <= 48) return "Cloudy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  return "Stormy";
}

export function processWeatherData(weatherData: any, cityName: string) {
  const current = weatherData?.current ?? {};
  const daily = weatherData?.daily ?? {};
  const hourly = weatherData?.hourly ?? {};

  return {
    city: cityName,
    temperature: Math.round(current.temperature_2m ?? 0),
    minTemperature: Math.round(daily.temperature_2m_min?.[0] ?? 0),
    maxTemperature: Math.round(daily.temperature_2m_max?.[0] ?? 0),
    weatherCode: current.weather_code ?? 0,
    windSpeed: Math.round(current.wind_speed_10m ?? 0),
    hourlyPrecipitation: (hourly.precipitation_probability ?? []).slice(0, 24),
    hourlyTime: (hourly.time ?? []).slice(0, 24),
    hourlyWindSpeed: (hourly.wind_speed_10m ?? []).slice(0, 24).map((speed: number) => Math.round(speed)),
    hourlyPrecipitationAmount: (hourly.precipitation ?? []).slice(0, 24).map((amount: number) => Math.round(amount * 10) / 10),
    hourlyTemperature: (hourly.temperature_2m ?? []).slice(0, 24).map((temp: number) => Math.round(temp)),
    hourlyHumidity: (hourly.relative_humidity_2m ?? []).slice(0, 24)
  };
}