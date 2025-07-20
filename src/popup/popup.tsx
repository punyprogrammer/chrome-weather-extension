import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { Box, Icon } from "@mui/material";
import { CityInput, OverlayOption, TempScale } from "../common/Utils";
import {
  LocalStorageOptions,
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";
import { Messages } from "../utils/messages";

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
  // This will handle the setting of default city
  const onSetDefault = (city: string) => {
    const newOptions: LocalStorageOptions = {
      ...options,
      homeCity: city,
    };
    setStoredOptions(newOptions).then(() => {
      setOptions(newOptions);
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
  // set overlay to true
  const handleOverlay = () => {
    chrome.tabs.query({ active: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY);
      }
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
  // for the case no homecity is present so we set the first entry as home city

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
        {options.isOverlayEnabled && (
          <OverlayOption
            handleOverlay={handleOverlay}
            disabled={options.homeCity === ""}
          />
        )}
      </Box>
      {options?.homeCity && cities.indexOf(options.homeCity) === -1 && (
        <WeatherCard
          key={options.homeCity}
          city={options.homeCity}
          index={-1}
          onDelete={onDelete}
          tempScale={options.scale}
          isHomeCity={true}
        />
      )}
      {cities.map((item, index) => (
        <WeatherCard
          key={item}
          city={item}
          index={index}
          onDelete={onDelete}
          tempScale={options.scale}
          onSetDefault={onSetDefault}
          isHomeCity={options.homeCity === item}
        />
      ))}
    </Box>
  );
};
const root = document.createElement("div");

document.body.appendChild(root);
ReactDOM.render(<App />, root);
