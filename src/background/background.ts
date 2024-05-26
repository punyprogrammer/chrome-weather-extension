import { getWeatherDataForQuery } from "../utils/apiCalls";
import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({ scale: "metric", homeCity: "", isOverlayEnabled: false });
  // create context menu
  chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Add city to weather extension",
    id: "weatherExtension",
  });
  // for fetching weather data every hour
  chrome.alarms.create("badgeText", { periodInMinutes: 1 / 3600 });
});
// attach listener
chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, event.selectionText]);
  });
});
// attach listener for alarm
chrome?.alarms?.onAlarm.addListener((alarm) => {
  if (alarm.name === "badgeText") {
    getStoredOptions().then((options) => {
      if (options.homeCity === "") {
        return;
      }
      getWeatherDataForQuery(options.homeCity, options.scale).then((data) => {
        debugger;
        chrome.action.setBadgeText({
          text: `${Math.round(data.main.temp)}${
            options.scale === "metric" ? "\u2103" : "\u2109"
          }`,
        });
      });
    });
  }
});
