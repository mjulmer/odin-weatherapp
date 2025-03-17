export { DomManager };

class DomManager {
  updateWeather(weatherData) {
    function roundTwoPlaces(num) {
      return Math.round(num * 100) / 100;
    }

    document.querySelector("#location").textContent = weatherData.location;
    const unit = weatherData.unitIsCelcius ? "C" : "F";
    document.querySelector(
      "#current-temp"
    ).textContent = `Currently ${roundTwoPlaces(
      weatherData.currTemp
    )}° ${unit}. ${weatherData.currConditions}.`;

    const dayContainer = document.querySelector(".upcoming-days");
    dayContainer.replaceChildren();
    weatherData.days.forEach((day) => {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      const date = document.createElement("div");
      date.textContent = day.date;
      dayDiv.appendChild(date);

      const tempRange = document.createElement("div");
      tempRange.textContent = `${roundTwoPlaces(
        day.tempMin
      )}° - ${roundTwoPlaces(day.tempMax)}°`;
      dayDiv.appendChild(tempRange);

      const conditions = document.createElement("div");
      conditions.textContent = day.conditions;
      dayDiv.appendChild(conditions);

      dayContainer.appendChild(dayDiv);
    });
  }

  registerSearchButton(onClick) {
    document
      .querySelector("#search-button")
      .addEventListener("click", () => onClick());
  }

  registerRefreshButton(onClick) {
    document
      .querySelector(".refresh")
      .addEventListener("click", () => onClick());
  }

  registerSwitchUnitButton(onClick) {
    document
      .querySelector(".switch-unit")
      .addEventListener("click", () => onClick());
  }
}
