"use strict";

import { apiKey } from "./api-key.js";
import { setWeatherCache, getWeatherCache } from "./storage-manager.js";

getWeather();

async function getWeather(unitIsCelcius = true, locationQuery = "london") {
  // TODO: check if cache is more than an hour old
  // and grab new data if it is.
  // Also check if the location matches the requested location.
  const cachedWeather = getWeatherCache();
  if (cachedWeather !== null && cachedWeather !== undefined) {
    console.log("Read weather from cache.");
    console.log(cachedWeather);
    return cachedWeather;
  }

  getWeatherFromVisualCrossing().then((weatherJson) =>
    setWeatherCache(weatherJson)
  );
}

async function getWeatherFromVisualCrossing(unitIsCelcius, locationQuery) {
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
  console.log(weatherJson);
}
