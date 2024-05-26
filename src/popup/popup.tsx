import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { Box } from "@mui/material";
import { CityInput, TempScale } from "../common/Utils";
import {
  LocalStorageOptions,
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityQuery, setCityQuery] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions>(null);
  // This function will add new city on add
  const onAdd = (city: string) => {
    const newCities = [...cities, city];
    setStoredCities(newCities).then(() => {
      setCities(newCities);
      // reset query
      setCityQuery("");
    });
  };
  // This function will delete the city
  const onDelete = (index: number) => {
    cities.splice(index, 1);
    const newCities = [...cities];
    setStoredCities(cities).then(() => {
      setCities(newCities);
    });
  };
  // This will handle the change of scale
  const onMetricChange = () => {
    const newOptions: LocalStorageOptions = {
      ...options,
      scale: options.scale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(newOptions).then(() => {
      setOptions(newOptions);
    });
  };
  // on initial mount get from local storage
  useEffect(() => {
    // get cities from local storage
    getStoredCities().then((res) => {
      setCities(res);
    });
    // get options from local storage
    getStoredOptions().then((res) => {
      console.log(res);
      setOptions(res);
    });
  }, []);
  if (!options) return null;
  return (
    <Box px="10px" py="20px">
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <CityInput
          cityQuery={cityQuery}
          onChange={(e) => {
            e.preventDefault();
            setCityQuery(e.target.value);
          }}
          onAdd={onAdd}
        />
        <TempScale tempScale={options?.scale} onMetricChange={onMetricChange} />
      </Box>
      {options?.homeCity && (
        <WeatherCard
          key={options.homeCity}
          city={options.homeCity}
          index={-1}
          onDelete={onDelete}
          tempScale={options.scale}
        />
      )}
      {cities.map((item, index) => (
        <WeatherCard
          key={item}
          city={item}
          index={index}
          onDelete={onDelete}
          tempScale={options.scale}
        />
      ))}
    </Box>
  );
};
const root = document.createElement("div");

document.body.appendChild(root);
ReactDOM.render(<App />, root);
