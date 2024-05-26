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
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [position, setPosition] = useState({ left: 100, top: 200 });
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
  // to handle mouseDown
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffsetX(e.clientX - e.target.getBoundingClientRect().left);
    setOffsetY(e.clientY - e.target.getBoundingClientRect().top);
  };
  // to handle mouseMove
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        left: e.clientX - offsetX,
        top: e.clientY - offsetY,
      });
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  if (options?.homeCity && options?.isOverlayEnabled) {
    return (
      <div
        className="overlayCard"
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        style={{ left: `${position.left}px`, top: `${position.top}px` }}
      >
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
