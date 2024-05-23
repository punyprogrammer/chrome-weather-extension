import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { Box } from "@mui/material";
import { CityInput } from "../common/Utils";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityQuery, setCityQuery] = useState<string>("");
  // This function will add new city on add
  const onAdd = (city: string) => {
    setCities([...cities, city]);
    // reset query
    setCityQuery("");
  };
  const onDelete = (index: number) => {
    // This function will delete the city
    cities.splice(index, 1);
    setCities([...cities]);
  };
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
