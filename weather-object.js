"use strict";

export { WeatherData };

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

  switchUnit(unitIsCelcius) {}
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
