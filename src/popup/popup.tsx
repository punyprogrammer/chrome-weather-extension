import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { Box } from "@mui/material";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([
    "London",
    "Kolkata",
    "Error",
  ]);
  const [cityQuery, setCityQuery] = useState<string>("");
  return (
    <Box px="10px" py="20px">
      
      {cities.map((item, index) => (
        <WeatherCard city={item} index={index} />
      ))}
    </Box>
  );
};
const root = document.createElement("div");

document.body.appendChild(root);
ReactDOM.render(<App />, root);
