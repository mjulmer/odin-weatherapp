export { updateWeather };

function updateWeather(weatherData) {
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
    dayContainer.appendChild(dayDiv);
  });
}
