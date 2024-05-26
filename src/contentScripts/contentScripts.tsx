import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import WeatherCard from "../popup/WeatherCard";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";
import "./contentScripts.css";
import { Card } from "@mui/material";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions>(null);
  useEffect(() => {
    getStoredOptions().then((res) => {
      setOptions(res);
    });
  }, []);
  const onDelete = () => {
    const newOptions: LocalStorageOptions = {
      ...options,
      isOverlayEnabled: false,
    };
    setStoredOptions(newOptions).then(() => {
      setOptions(newOptions);
    });
  };
  if (options?.homeCity && options?.isOverlayEnabled) {
    return (
      <div className="overlayCard">
        <WeatherCard
          city={options.homeCity}
          tempScale={options.scale}
          index={1}
          onDelete={onDelete}
          key="1"
        />
      </div>
    );
  }
  return null;
};
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
