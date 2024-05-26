import {
  getStoredCities,
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
});
// attach listener
chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, event.selectionText]);
  });
});
