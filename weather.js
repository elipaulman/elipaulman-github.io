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
            <div class="location">${data.name}</div>
          `;
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
          forecasts.forEach((forecast) => {
            const forecastDateTime = new Date(forecast.dt_txt);
            if (forecastDateTime.getHours() === 12) { // Retrieve only the forecasts for 12:00 PM
              const temperatureInCelsius = Math.floor(forecast.main.temp - kelvin);
              const temperatureInFahrenheit = Math.floor((temperatureInCelsius * 9) / 5 + 32);
              const forecastItem = document.createElement("div");
              forecastItem.classList.add("forecast-item");
              forecastItem.innerHTML = `
                <div class="forecast-date">${forecastDateTime.toDateString()}</div>
                <div class="forecast-temp">${temperatureInFahrenheit}°F</div>
                <div class="forecast-summary">${forecast.weather[0].description}</div>
                <div class="forecast-icon">
                  <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" style="height: 5rem;" />
                </div>
              `;
              forecastList.appendChild(forecastItem);
            }
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
