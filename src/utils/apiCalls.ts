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

export async function getWeatherDataForQuery(
  query: string
): Promise<OpenWeatherData> {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
    );
    if (!res.ok) {
      throw new Error("No City found");
    }
    const data: OpenWeatherData = await res.json();

    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}
