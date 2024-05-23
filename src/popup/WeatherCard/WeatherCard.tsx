import React, { useEffect, useState } from "react";
import { OpenWeatherData, getWeatherDataForQuery } from "../../utils/apiCalls";
import { Box, Card, CardContent, Typography } from "@mui/material";

const WeatherCardContainer: React.FC<{ children }> = ({ children }) => {
  return (
    <Box mx="4px" my="16px">
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};
type WeatherCardState = "loading" | "error" | "ready";
const WeatherCard: React.FC<{
  city: string;
  index:number;
}> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [weatherCardState, setWeatherCardState] =
    useState<WeatherCardState>("loading");
  useEffect(() => {
    getWeatherDataForQuery(city)
      .then((res) => {
        setWeatherData(res);
        setWeatherCardState("ready");
        if (!res.name) {
          console.log("ERRRORR");
          setWeatherCardState("error");
        }
      })
      .catch((err) => {
        setWeatherCardState("error");
      });
  }, []);
  if (weatherCardState === "loading" || weatherCardState === "error") {
    return (
      <WeatherCardContainer>
        <Typography variant="body1">
          {weatherCardState === "loading"
            ? "Loading"
            : "Could not fetch the weather for the given city"}
        </Typography>
      </WeatherCardContainer>
    );
  }
  return (
    <WeatherCardContainer>
      <Typography variant="h5">{weatherData?.name}</Typography>
      <Typography variant="body1">
        Temp:{Math.round(weatherData?.main?.temp)}
      </Typography>
      <Typography variant="body1">
        Feels Like:{Math.round(weatherData?.main?.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
