import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import WeatherCard from "../popup/WeatherCard";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";
import "./contentScripts.css";
import { Messages } from "../utils/messages";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions>(null);
  const [isActive, setIsActive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [position, setPosition] = useState({ left: 100, top: 200 });

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
  useEffect(() => {
    getStoredOptions().then((res) => {
      setOptions(res);
    });
  }, []);
  // Listen for messages from the popup
  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, []);
  if (isActive && options.homeCity) {
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
          onDelete={() => setIsActive(false)}
          key="1"
          isOverlay={true}
        />
      </div>
    );
  }
  return null;
};
const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
