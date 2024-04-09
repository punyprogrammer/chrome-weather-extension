import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { OpenWeatherData, getWeatherDataForQuery } from "../../utils/apiCalls";
import { Box, Card, CardContent, Typography } from "@mui/material";

const WeatherCard: React.FC<{
  city: string;
}> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  useEffect(() => {
    getWeatherDataForQuery(city)
      .then((res) => setWeatherData(res))
      .catch((err) => console.log(err));
  }, []);
  if (!weatherData) return <div>Loading...</div>;
  return (
    <Box mx="4px" my="16px">
      <Card>
        <CardContent>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography variant="body1">
            Temp:{Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant="body1">
            Feels Like:{Math.round(weatherData.main.feels_like)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherCard;
