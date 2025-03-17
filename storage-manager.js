"use strict";

export { setWeatherCache, getWeatherCache };

const weatherKey = "15dayWeather";

function setWeatherCache(weatherJson) {
  localStorage.setItem(weatherKey, JSON.stringify(weatherJson));
}

function getWeatherCache() {
  return JSON.parse(localStorage.getItem(weatherKey));
}
