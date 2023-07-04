// Declaring the variables
let lon;
let lat;
let currentWeatherContainer = document.querySelector(".current-conditions");
let forecastList = document.querySelector(".forecast-list");
const kelvin = 273;
const apiKey = "a492a768764e969820914c25cd2b788a";

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      fetchWeatherData();
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

function fetchWeatherData() {
  // API URLs
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  // Clear existing forecast entries
  forecastList.innerHTML = '';

  // Fetching current weather data
  fetch(currentWeatherURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Current weather data not available");
      }
      return response.json();
    })
    .then((data) => {
      updateCurrentWeather(data);
    })
    .catch((error) => {
      console.log("Error fetching current weather data:", error);
    });

  // Fetching forecast data
  fetch(forecastURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Forecast data not available");
      }
      return response.json();
    })
    .then((data) => {
      updateForecast(data);
    })
    .catch((error) => {
      console.log("Error fetching forecast data:", error);
    });
}

function updateCurrentWeather(data) {
  const temperatureInCelsius = Math.floor(data.main.temp - kelvin);
  const temperatureInFahrenheit = Math.floor((temperatureInCelsius * 9) / 5 + 32);

  // Capitalize the current condition
  const condition = data.weather[0].description;
  const capitalizedCondition = condition.charAt(0).toUpperCase() + condition.slice(1);

  // Update current weather container
  currentWeatherContainer.innerHTML = `
    <div class="icon">
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" style="height: 5rem;" />
    </div>
    <div class="temp">${temperatureInFahrenheit}°F</div>
    <div class="summary">${capitalizedCondition}</div>
    <div class="rain-chance">Rain: ${data.main.humidity}%</div>
    <div class="location">${data.name}</div>
  `;

  // Update page background based on weather condition
  updatePageBackground(data.weather[0].main);
}

function updateForecast(data) {
  const forecasts = data.list;

  // Group the forecasts by date
  const groupedForecasts = {};
  forecasts.forEach((forecast) => {
    const forecastDate = new Date(forecast.dt_txt.split(' ')[0]).toDateString();
    if (!groupedForecasts[forecastDate]) {
      groupedForecasts[forecastDate] = [];
    }
    groupedForecasts[forecastDate].push(forecast);
  });

  // Iterate through the grouped forecasts
  Object.entries(groupedForecasts).forEach(([date, forecasts]) => {
    const temperatureHighArray = forecasts.map((f) => Math.floor((f.main.temp_max - kelvin) * 9 / 5 + 32));
    const temperatureLowArray = forecasts.map((f) => Math.floor((f.main.temp_min - kelvin) * 9 / 5 + 32));
    const temperatureHigh = Math.max(...temperatureHighArray);
    const temperatureLow = Math.min(...temperatureLowArray);
    const iconCode = forecasts[0].weather[0].icon;
    const rainPercentage = (forecasts.reduce((total, f) => total + f.pop, 0) / forecasts.length) * 100;

    // Create forecast item
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");
    forecastItem.innerHTML = `
      <div class="forecast-date">${date}</div>
      <div class="forecast-temp">${temperatureLow}°F - ${temperatureHigh}°F</div>
      <div class="forecast-icon"><img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon" /></div>
      <div class="rain-chance">Rain: ${rainPercentage.toFixed(0)}%</div>
    `;

    // Append forecast item to forecast list
    forecastList.appendChild(forecastItem);
  });
}

function updatePageBackground(weatherCondition) {
  // Update background color or image based on weather condition
  // Example implementation, you can customize this based on your preferences
  const body = document.querySelector("body");
  switch (weatherCondition) {
    case "Clear":
      body.style.backgroundColor = "#5dbcd2";
      break;
    case "Clouds":
      body.style.backgroundColor = "#607d8b";
      break;
    case "Rain":
      body.style.backgroundImage = "url('rainy-background.jpg')";
      body.style.backgroundSize = "cover";
      break;
    default:
      body.style.backgroundColor = "#4caf50";
  }
}

// Event listener for the "Get Weather" button
const getWeatherButton = document.getElementById("get-weather-button");
getWeatherButton.addEventListener("click", () => {
  const locationInput = document.getElementById("location-input");
  const location = locationInput.value.trim();

  if (location) {
    const geocodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;

    fetch(geocodingAPI)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Location not found");
        }
        return response.json();
      })
      .then((data) => {
        lat = data[0].lat;
        lon = data[0].lon;
        fetchWeatherData();
      })
      .catch((error) => {
        console.log("Error fetching geolocation data:", error);
      });
  }
});
