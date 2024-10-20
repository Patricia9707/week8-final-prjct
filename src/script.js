// Your SheCodes API key
const apiKey = "b2a5adcct04b33178913oc335f405433";

// Function to format the date
function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { weekday: "short" };
  return date.toLocaleDateString("en-US", options);
}

// Function to display current weather data
function displayCurrentWeather(data) {
  document.getElementById("current-city").textContent = data.city;
  document.getElementById("current-temperature").textContent = Math.round(
    data.daily[0].temperature.day
  );
  document.querySelector(".current-temperature-icon").textContent =
    getWeatherIcon(data.daily[0].condition.icon);
  document.querySelector(".current-details").innerHTML = `${formatDate(
    data.daily[0].time
  )}, ${data.daily[0].condition.description} <br /> 
    Humidity: <strong>${data.daily[0].temperature.humidity}%</strong>, 
    Wind: <strong>${Math.round(data.daily[0].wind.speed)} km/h</strong>`;
}

// Function to display the weather forecast
function displayForecast(data) {
  const forecastSection = document.querySelector(".forecast-section");
  forecastSection.innerHTML = ""; // Clear previous forecast
  data.daily.slice(1, 6).forEach((forecast) => {
    // Display 5-day forecast
    const forecastDay = document.createElement("div");
    forecastDay.classList.add("forecast-day");
    forecastDay.innerHTML = `
      <div class="forecast-date">${formatDate(forecast.time)}</div>
      <div class="forecast-icon">${getWeatherIcon(
        forecast.condition.icon
      )}</div>
      <div class="forecast-temperatures">
        <div class="forecast-temperature"><strong>${Math.round(
          forecast.temperature.maximum
        )}°</strong></div>
        <div class="forecast-temperature">${Math.round(
          forecast.temperature.minimum
        )}°</div>
      </div>`;
    forecastSection.appendChild(forecastDay);
  });
}

// Function to get weather icon based on the API's icon code
function getWeatherIcon(iconCode) {
  const iconMap = {
    "clear-sky-day": "☀️",
    "clear-sky-night": "🌙",
    "few-clouds-day": "🌤",
    "few-clouds-night": "☁️",
    "scattered-clouds-day": "☁️",
    "scattered-clouds-night": "☁️",
    "broken-clouds-day": "☁️",
    "broken-clouds-night": "☁️",
    "shower-rain-day": "🌧",
    "shower-rain-night": "🌧",
    "rain-day": "🌦",
    "rain-night": "🌧",
    "thunderstorm-day": "⛈",
    "thunderstorm-night": "⛈",
    "snow-day": "❄️",
    "snow-night": "❄️",
    "mist-day": "🌫",
    "mist-night": "🌫",
  };
  return iconMap[iconCode] || "❓";
}

// Function to fetch weather data from the API
async function fetchWeatherData(city) {
  try {
    // Get forecast data
    const forecastResponse = await axios.get(
      `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    );
    displayCurrentWeather(forecastResponse.data);
    displayForecast(forecastResponse.data);
  } catch (error) {
    alert(
      "Unable to retrieve weather data. Please check the city name and try again."
    );
    console.error(error);
  }
}

// Event listener for the search form
document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("search-input").value;
  fetchWeatherData(city);
});

// Fetch initial data for a default city (e.g., Paris)
fetchWeatherData("Paris");
