"use strict";

import { apiKey } from "./api-key.js";
import { setWeatherCache, getWeatherCache } from "./storage-manager.js";
import { WeatherData, switchUnit } from "./weather-object.js";
import { DomManager } from "./dom-manager.js";

const domManager = new DomManager();
getWeather().then((weather) => domManager.updateWeather(weather));
domManager.registerRefreshButton(() => {
  const cachedWeather = getWeatherCache();
  // Cache is empty, there's nothing to refresh
  if (cachedWeather === null || cachedWeather === undefined) {
    return;
  }
  getAndCacheWeatherFromVisualCrossing(
    cachedWeather.unitIsCelcius,
    cachedWeather.originalLocationQuery
  ).then((newWeather) => domManager.updateWeather(newWeather));
});
domManager.registerSwitchUnitButton(() => {
  const cachedWeather = getWeatherCache();
  // Cache is empty, there's no unit preference to switch from.
  if (cachedWeather === null || cachedWeather === undefined) {
    return;
  }
  switchUnit(cachedWeather);
  setWeatherCache(cachedWeather);
  domManager.updateWeather(cachedWeather);
});
domManager.registerSearchButton((event, searchElement) => {
  event.preventDefault();
  const locationQuery = searchElement.value;
  if (locationQuery === "") {
    return;
  }
  let unitIsCelcius = true;
  const cachedWeather = getWeatherCache();
  // Cache is empty, there's no unit preference to switch from.
  if (cachedWeather !== null && cachedWeather !== undefined) {
    unitIsCelcius = cachedWeather.unitIsCelcius;
  }
  getAndCacheWeatherFromVisualCrossing(unitIsCelcius, locationQuery).then(
    (newWeather) => domManager.updateWeather(newWeather)
  );
});

async function getWeather(unitIsCelcius = true, locationQuery = "london") {
  // TODO: check if cache is more than an hour old
  // and grab new data if it is.
  const cachedWeather = getWeatherCache();
  if (cachedWeather !== null && cachedWeather !== undefined) {
    return cachedWeather;
  }

  return getAndCacheWeatherFromVisualCrossing(unitIsCelcius, locationQuery);
}

async function getAndCacheWeatherFromVisualCrossing(
  unitIsCelcius,
  locationQuery
) {
  let weatherResponse;
  const unitGroup = unitIsCelcius ? "metric" : "us";
  try {
    weatherResponse = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        locationQuery +
        "?unitGroup=" +
        unitGroup +
        "&key=" +
        apiKey +
        "&contentType=json"
    );
  } catch (error) {
    console.error("Error when fetching weather: " + error);
    return;
  }

  const weatherJson = await weatherResponse.json().catch((error) => {
    console.error("Error when parsing JSON: " + error);
  });

  const weatherObject = new WeatherData(
    weatherJson,
    unitIsCelcius,
    locationQuery
  );
  setWeatherCache(weatherObject);
  return weatherObject;
}
