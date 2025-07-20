import { OpenWeatherScale } from "./apiCalls";
// Interface for local storage
export interface LocalStorage {
  cities?: string[];
  options?: LocalStorageOptions;
}
export interface LocalStorageOptions {
  scale: OpenWeatherScale;
  homeCity: string;
  isOverlayEnabled?: boolean;
}
export type LocalStorageKeys = keyof LocalStorage;
// This function will set values in lical storage
export function setStoredCities(cities: string[]): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ cities }, () => {
      resolve();
    });
  });
}
// This function will get values from local storage
export function getStoredCities(): Promise<string[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(["cities"], (result: LocalStorage) => {
      resolve(result.cities ?? []);
    });
  });
}
// This function will set options in local storage
export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ options }, () => {
      resolve();
    });
  });
}
// This function will get options from local storage
export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      resolve(result.options);
    });
  });
}
