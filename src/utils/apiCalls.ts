import { OPEN_WEATHER_API_KEY } from "./constants";
export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
}
export type OpenWeatherScale = "metric" | "imperial" | "standard";
export async function getWeatherDataForQuery(
  city: string,
  scale: OpenWeatherScale
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=${scale}`
  );
  if (!res.ok) {
    throw new Error("No City found");
  }

  const data: OpenWeatherData = await res.json();

  return data;
}
export function getImageSrcForWeatherIcon(icon: string): string {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}
