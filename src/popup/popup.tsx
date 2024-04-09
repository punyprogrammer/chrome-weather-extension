import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import { getWeatherDataForQuery } from "../utils/apiCalls";

const App: React.FC<{}> = () => {
  useEffect(() => {
    getWeatherDataForQuery("Kolkata")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <img src="icon.png" alt="" className="src" />
      <h3>gdfgdfkgdfjgkdjfkgjdfkgjdkfjgkdfjgkdfgjkdfjgkdjfgkdjfgkjdfkgdjkg</h3>
    </div>
  );
};
const root = document.createElement("div");

document.body.appendChild(root);
ReactDOM.render(<App />, root);
