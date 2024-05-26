import { setStoredCities, setStoredOptions } from "../utils/storage";
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({ scale: "metric", homeCity: "", isOverlayEnabled: true });
});
