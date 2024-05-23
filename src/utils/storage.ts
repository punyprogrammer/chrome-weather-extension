export interface LocalStorage {
  cities?: string[];
}
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
