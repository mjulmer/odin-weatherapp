"use strict";

export { WeatherData, switchUnit };

class WeatherData {
  unitIsCelcius;
  originalLocationQuery;
  location;
  timeQueriedEpoch;
  currTemp;
  currConditions;
  days = [];

  constructor(jsonObject, unitIsCelcius, originalLocationQuery) {
    this.unitIsCelcius = unitIsCelcius;
    this.originalLocationQuery = originalLocationQuery;
    this.location = jsonObject.resolvedAddress;
    this.timeQueriedEpoch = jsonObject.currentConditions.datetimeEpoch;
    this.currTemp = jsonObject.currentConditions.temp;
    this.currConditions = jsonObject.currentConditions.conditions;

    for (let i = 0; i < 7; i++) {
      this.days.push(new DayWeather(jsonObject.days[i]));
    }
  }
}

// Taking the object allows this to be called on objects
// that aren't instances of WeatherData but have identical
// fields... i.e. ones read from local storage. This is a hack.
function switchUnit(weatherObject) {
  console.log("converting temps");
  const converter = weatherObject.unitIsCelcius
    ? changeToFahrenheit
    : changeToCelcius;
  weatherObject.currTemp = converter(weatherObject.currTemp);
  weatherObject.days.forEach((day) => {
    console.log(day);
    day.tempMin = converter(day.tempMin);
    day.tempMax = converter(day.tempMax);
  });
  weatherObject.unitIsCelcius = !weatherObject.unitIsCelcius;
}

function changeToCelcius(tempInF) {
  return (tempInF - 32) * (5 / 9);
}

function changeToFahrenheit(tempInC) {
  return (tempInC * 9) / 5 + 32;
}

class DayWeather {
  date;
  tempMin;
  tempMax;
  conditions;

  constructor(jsonObject) {
    this.date = jsonObject.datetime;
    this.tempMin = jsonObject.tempmin;
    this.tempMax = jsonObject.tempmax;
    this.conditions = jsonObject.conditions;
  }
}
