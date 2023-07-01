// Declaring the variables
let lon;
let lat;
let currentWeatherContainer = document.querySelector(".container");
let forecastList = document.querySelector(".forecast-list");
const kelvin = 273;
const apiKey = "a492a768764e969820914c25cd2b788a";

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;

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
          console.log(data);
          const temperatureInCelsius = Math.floor(data.main.temp - kelvin);
          const temperatureInFahrenheit = Math.floor((temperatureInCelsius * 9) / 5 + 32);

          // Update current weather container
          currentWeatherContainer.innerHTML = `
            <div class="icon">
              <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" style="height: 5rem;" />
            </div>
            <div class="temp">${temperatureInFahrenheit}°F</div>
            <div class="summary">${data.weather[0].description}</div>
            <div class="rain-chance">Rain: ${data.main.humidity}%</div>
            <div class="location">${data.name}</div>
          `;

          // Update page background based on weather condition
          updatePageBackground(data.weather[0].main);
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
          console.log(data);
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
            const temperatureHighArray = [];
            const temperatureLowArray = [];

            forecasts.forEach((forecast) => {
              const temperatureInCelsius = Math.floor(forecast.main.temp - kelvin);
              const temperatureInFahrenheit = Math.floor((temperatureInCelsius * 9) / 5 + 32);
              temperatureHighArray.push(temperatureInFahrenheit);
              temperatureLowArray.push(temperatureInFahrenheit);
            });

            const temperatureHighInFahrenheit = Math.max(...temperatureHighArray);
            const temperatureLowInFahrenheit = Math.min(...temperatureLowArray);

            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");
            forecastItem.innerHTML = `
              <div class="forecast-date">${date}</div>
              <div class="forecast-temp">High: ${temperatureHighInFahrenheit}°F | Low: ${temperatureLowInFahrenheit}°F</div>
              <div class="forecast-icon">
                <img src="https://openweathermap.org/img/wn/${forecasts[0].weather[0].icon}.png" style="height: 8rem;" />
              </div>
            `;
            forecastList.appendChild(forecastItem);
          });
        })
        .catch((error) => {
          console.log("Error fetching forecast data:", error);
        });
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

// Update the page background based on the weather condition
function updatePageBackground(weatherCondition) {
  const body = document.querySelector("body");
  if (weatherCondition.includes("Cloud")) {
    body.style.background = "linear-gradient(rgb(104, 159, 184), rgb(37, 94, 163))";
  } else if (weatherCondition.includes("Rain")) {
    body.style.background = "linear-gradient(rgb(20, 47, 81), rgb(6, 15, 26))";
  } else if (weatherCondition.includes("Clear")) {
    body.style.background = "linear-gradient(rgb(25, 117, 210), rgb(9, 47, 85))";
  } else {
    body.style.background = "linear-gradient(rgb(3, 35, 63), rgb(0, 0, 0))";
  }
}
