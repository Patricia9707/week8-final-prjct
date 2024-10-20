document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.getElementById("search-input").value;
    // For now, we will mock the weather data. You can replace this with actual API calls.

    // Mock the current weather data
    const weatherData = {
      city: city || "Paris",
      temperature: 24,
      condition: "moderate rain",
      humidity: "87%",
      wind: "7.2km/h",
      date: new Date().toLocaleDateString(),
      forecast: [
        { day: "Sun", high: 12, low: 4 },
        { day: "Mon", high: 12, low: 4 },
        { day: "Tue", high: 12, low: 4 },
        { day: "Wed", high: 12, low: 4 },
        { day: "Thu", high: 12, low: 4 },
      ],
    };

    updateWeather(weatherData);
  });

function updateWeather(data) {
  document.getElementById("current-city").textContent = data.city;
  document.getElementById("current-temperature").textContent = data.temperature;
  document.getElementById("current-date").textContent = data.date;

  const currentDetails = document.querySelector(".current-details");
  currentDetails.innerHTML = `${data.date}, ${data.condition} <br />  
      Humidity: <strong>${data.humidity}</strong>, Wind: <strong>${data.wind}</strong>`;

  const forecastDays = document.querySelectorAll(".forecast-day");
  forecastDays.forEach((day, index) => {
    const dayData = data.forecast[index];
    day.querySelector(".forecast-date").textContent = dayData.day;
    day.querySelector(".forecast-icon").textContent = "☀";
    const tempContainers = day.querySelector(".forecast-temperatures");
    tempContainers.children[0].innerHTML = `<strong>${dayData.high}°</strong>`;
    tempContainers.children[1].textContent = `${dayData.low}°`;
  });
}
