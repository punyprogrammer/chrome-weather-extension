import { OpenWeatherScale } from "./apiCalls";

export const getSymbolForScale = (scale: OpenWeatherScale) => {
  switch (scale) {
    case "metric":
      return "°C";
    case "imperial":
      return "°F";
    case "standard":
      return "K";
  }
};
