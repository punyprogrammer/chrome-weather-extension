import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { Box } from "@mui/material";
import { CityInput } from "../common/Utils";
import { getStoredCities, setStoredCities } from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityQuery, setCityQuery] = useState<string>("");
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
  // on initial mount get from local storage
  useEffect(() => {
    getStoredCities().then((res) => {
      setCities(res);
    });
  }, []);
  return (
    <Box px="10px" py="20px">
      <CityInput
        cityQuery={cityQuery}
        onChange={(e) => {
          e.preventDefault();
          setCityQuery(e.target.value);
        }}
        onAdd={onAdd}
      />
      {cities.map((item, index) => (
        <WeatherCard key={item} city={item} index={index} onDelete={onDelete} />
      ))}
    </Box>
  );
};
const root = document.createElement("div");

document.body.appendChild(root);
ReactDOM.render(<App />, root);
