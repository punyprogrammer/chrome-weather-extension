import React, { useEffect, useState } from "react";
import {
  OpenWeatherData,
  OpenWeatherScale,
  getImageSrcForWeatherIcon,
  getWeatherDataForQuery,
} from "../../utils/apiCalls";
import {
  Box,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { getSymbolForScale } from "../../utils/utilFunctions";

const WeatherCardContainer: React.FC<{ children; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <Box className={className} mx="4px" my="16px">
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};
type WeatherCardState = "loading" | "error" | "ready";
const WeatherCard: React.FC<{
  city: string;
  key: string;
  index: number;
  onDelete?: (index: number) => void;
  onSetDefault?: (city: string) => void;
  tempScale: OpenWeatherScale;
  className?: string;
  isOverlay?: boolean;
  isHomeCity?: boolean;
}> = ({
  city,
  index,
  onDelete,
  tempScale,
  className,
  isOverlay,
  onSetDefault,
  isHomeCity,
}) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [weatherCardState, setWeatherCardState] =
    useState<WeatherCardState>("loading");
  const scaleSymbol: string = getSymbolForScale(tempScale);
  useEffect(() => {
    getWeatherDataForQuery(city, tempScale)
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
  }, [tempScale]);
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
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Typography variant="h5">{weatherData?.name}</Typography>
          <Typography variant="body1">
            Temp:{Math.round(weatherData?.main?.temp)}
            {scaleSymbol}
          </Typography>
          <Typography variant="body1">
            Feels Like:{Math.round(weatherData?.main?.feels_like)}
            {scaleSymbol}
          </Typography>
        </Box>
        <Box>
          {weatherData?.weather[0]?.icon && (
            <Box
              sx={{ display: "flex", flexDirection: "column" }}
              alignItems={"center"}
            >
              <img
                src={getImageSrcForWeatherIcon(weatherData?.weather?.[0]?.icon)}
                style={{ display: "inline-flex" }}
              />
              <Typography
                variant="subtitle2"
                style={{ display: "inline-flex" }}
              >
                {weatherData?.weather?.[0]?.description}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent="space-between"
      >
        {onSetDefault && !isHomeCity && (
          <CardActions
            onClick={() => onSetDefault(city)}
            sx={{ paddingInline: "0px" }}
          >
            <Button variant="contained" color="primary">
              SET AS DEFAULT
            </Button>
          </CardActions>
        )}
        <CardActions sx={{ paddingInline: "0px" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(index)}
          >
            {isOverlay ? "Remove" : "Delete"}
          </Button>
        </CardActions>
      </Box>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
