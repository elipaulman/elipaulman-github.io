// Declaring the variables
let lon;
let lat;
let currentWeatherContainer = document.querySelector(".current-conditions");
let forecastList = document.querySelector(".forecast-list");
const kelvin = 273;
const apiKey = "a492a768764e969820914c25cd2b788a";


window.addEventListener("load", () => {
  // Track weather app load
  if (typeof Analytics !== 'undefined') {
    Analytics.trackWeatherPageVisit();
    Analytics.trackEvent('weather_app_load', {
      event_category: 'weather',
      event_label: 'initial_load'
    });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      
      // Track geolocation usage
      if (typeof Analytics !== 'undefined') {
        Analytics.trackEvent('geolocation_used', {
          event_category: 'weather',
          event_label: 'auto_location'
        });
      }
      
      fetchWeatherData();
    });
  } else {
    console.log("Error fetching current location.");
    if (typeof Analytics !== 'undefined') {
      Analytics.trackEvent('geolocation_error', {
        event_category: 'weather',
        event_label: 'not_supported'
      });
    }
  }
});

function fetchWeatherData() {
  // API URLs
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  // Clear existing forecast entries
  forecastList.innerHTML = "";

  // Track weather data fetch
  if (typeof Analytics !== 'undefined') {
    Analytics.trackEvent('weather_data_fetch', {
      event_category: 'weather',
      event_label: 'api_call'
    });
  }

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
      if (typeof Analytics !== 'undefined') {
        Analytics.trackEvent('weather_api_error', {
          event_category: 'weather',
          event_label: 'current_weather_failed'
        });
      }
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
      updatePageBackground();
    })
    .catch((error) => {
      console.log("Error fetching forecast data:", error);
      if (typeof Analytics !== 'undefined') {
        Analytics.trackEvent('weather_api_error', {
          event_category: 'weather',
          event_label: 'forecast_failed'
        });
      }
    });
}

function updateCurrentWeather(data) {
  const temperatureInCelsius = Math.floor(data.main.temp - kelvin);
  const temperatureInFahrenheit = Math.floor(
    (temperatureInCelsius * 9) / 5 + 32
  );

  // Capitalize the current condition
  const condition = data.weather[0].description;
  const capitalizedCondition =
    condition.charAt(0).toUpperCase() + condition.slice(1);

  // Track weather condition
  if (typeof Analytics !== 'undefined') {
    Analytics.trackEvent('weather_condition_viewed', {
      weather_condition: data.weather[0].main,
      temperature: temperatureInFahrenheit,
      location: data.name,
      event_category: 'weather',
      event_label: data.weather[0].main
    });
  }

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
    const forecastDate = new Date(forecast.dt_txt.split(" ")[0]).toDateString();
    if (!groupedForecasts[forecastDate]) {
      groupedForecasts[forecastDate] = [];
    }
    groupedForecasts[forecastDate].push(forecast);
  });

  // Iterate through the grouped forecasts
  Object.entries(groupedForecasts).forEach(([date, forecasts]) => {
    const temperatureHighArray = forecasts.map((f) =>
      Math.floor(((f.main.temp_max - kelvin) * 9) / 5 + 32)
    );
    const temperatureLowArray = forecasts.map((f) =>
      Math.floor(((f.main.temp_min - kelvin) * 9) / 5 + 32)
    );
    const temperatureHigh = Math.max(...temperatureHighArray);
    const temperatureLow = Math.min(...temperatureLowArray);
    const iconCode = forecasts[0].weather[0].icon;
    const rainPercentage =
      (forecasts.reduce((total, f) => total + f.pop, 0) / forecasts.length) *
      100;

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

function updatePageBackground() {
  // Update background color with the defined gradient
  const body = document.querySelector("body");
  body.style.background = "linear-gradient(to bottom, #338aed, #0a2b41)";
  body.style.color = "#fff";
}


// Event listener for the "Get Weather" button
const getWeatherButton = document.getElementById("get-weather-button");
getWeatherButton.addEventListener("click", () => {
  const locationInput = document.getElementById("location-input");
  const location = locationInput.value.trim();

  if (location) {
    // Track manual location search
    if (typeof Analytics !== 'undefined') {
      Analytics.trackEvent('manual_location_search', {
        search_term: location,
        event_category: 'weather',
        event_label: 'user_input'
      });
    }

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
        
        // Track successful location search
        if (typeof Analytics !== 'undefined') {
          Analytics.trackEvent('location_search_success', {
            searched_location: location,
            found_location: data[0].name,
            event_category: 'weather',
            event_label: 'search_successful'
          });
        }
        
        fetchWeatherData();
      })
      .catch((error) => {
        console.log("Error fetching geolocation data:", error);
        if (typeof Analytics !== 'undefined') {
          Analytics.trackEvent('location_search_error', {
            searched_location: location,
            error_type: 'location_not_found',
            event_category: 'weather',
            event_label: 'search_failed'
          });
        }
      });
  }
});
