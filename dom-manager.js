export { DomManager };

class DomManager {
  updateWeather(weatherData) {
    document.querySelector("#location").textContent = weatherData.location;
    const unit = weatherData.unitIsCelcius ? "C" : "F";
    document.querySelector(
      "#current-temp"
    ).textContent = `Currently ${weatherData.currTemp}° ${unit}. ${weatherData.currConditions}.`;

    const dayContainer = document.querySelector(".upcoming-days");
    weatherData.days.forEach((day) => {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      const date = document.createElement("div");
      date.textContent = day.date;
      dayDiv.appendChild(date);

      const tempRange = document.createElement("div");
      tempRange.textContent = `${day.tempMin}° - ${day.tempMax}°`;
      dayDiv.appendChild(tempRange);

      const conditions = document.createElement("div");
      conditions.textContent = day.conditions;
      dayDiv.appendChild(conditions);

      dayContainer.appendChild(dayDiv);
    });
  }
}
