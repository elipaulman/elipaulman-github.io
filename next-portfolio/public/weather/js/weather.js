let lon;
let lat;
let currentWeatherContainer = document.querySelector(".current-conditions");
let forecastList = document.querySelector(".forecast-list");
let currentUnit = 'fahrenheit';
let currentWeatherData = null;
let currentForecastData = null;
let currentAirQualityData = null;
const kelvin = 273;
const apiKey = "a492a768764e969820914c25cd2b788a";

// Weather cache for performance
let weatherCache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Utility to escape HTML meta-characters in user-controlled input
function escapeHtml(text) {
  return String(text).replace(/[&<>"'/]/g, function(s) {
    switch (s) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      case '/': return '&#47;';
      default: return s;
    }
  });
}

// Temperature conversion utilities
function convertTemperature(temp, fromUnit, toUnit) {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
    return Math.floor(((temp - 273.15) * 9) / 5 + 32);
  } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
    return Math.floor(temp - 273.15);
  } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
    return Math.floor(((temp - 32) * 5) / 9);
  } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    return Math.floor((temp * 9) / 5 + 32);
  }
  return temp;
}

function getCachedWeather(key) {
  const cached = weatherCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedWeather(key, data) {
  weatherCache.set(key, {
    data: data,
    timestamp: Date.now()
  });
}

function showLoadingState() {
  currentWeatherContainer.innerHTML = `
    <div class="loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading weather data...</p>
    </div>
  `;
}

function hideLoadingState() {
}

function showErrorMessage(message) {
  currentWeatherContainer.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      <p>${escapeHtml(message)}</p>
      <button onclick="retryWeatherFetch()" style="margin-top: 10px; padding: 8px 16px; background: rgba(0,229,160,0.08); border: 1px solid #00e5a0; border-radius: 8px; color: #f1f5f9; cursor: pointer; font-family: var(--font-mono); font-size: 0.8rem;">
        Try Again
      </button>
    </div>
  `;
}

function retryWeatherFetch() {
  if (lat && lon) {
    fetchWeatherData();
  }
}

window.addEventListener("load", () => {
  if (typeof Analytics !== 'undefined') {
    Analytics.trackWeatherPageVisit();
    Analytics.trackEvent('weather_app_load', {
      event_category: 'weather',
      event_label: 'initial_load'
    });
  }

  setupUnitToggle();
  setupRefreshButton();
  setupLocationAutocomplete();

  if (navigator.geolocation) {
    showLoadingState();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;

        if (typeof Analytics !== 'undefined') {
          Analytics.trackEvent('geolocation_used', {
            event_category: 'weather',
            event_label: 'auto_location'
          });
        }
        
        fetchWeatherData();
      },
      (error) => {
        console.log("Geolocation error:", error);
        showErrorMessage("Location access denied. Please enter a location manually.");
        if (typeof Analytics !== 'undefined') {
          Analytics.trackEvent('geolocation_error', {
            event_category: 'weather',
            event_label: 'permission_denied'
          });
        }
      }
    );
  } else {
    console.log("Error fetching current location.");
    showErrorMessage("Geolocation not supported. Please enter a location manually.");
    if (typeof Analytics !== 'undefined') {
      Analytics.trackEvent('geolocation_error', {
        event_category: 'weather',
        event_label: 'not_supported'
      });
    }
  }
});

function fetchWeatherData() {
  const cacheKey = `${lat}-${lon}`;
  const cachedData = getCachedWeather(cacheKey);
  
  if (cachedData) {
    currentWeatherData = cachedData.current;
    currentForecastData = cachedData.forecast;
    currentAirQualityData = cachedData.airQuality;
    updateCurrentWeather(currentWeatherData);
    updateForecast(currentForecastData);
    if (currentAirQualityData) updateAirQuality(currentAirQualityData);
    updatePageBackground(currentWeatherData.weather[0].main);
    return;
  }

  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const airQualityURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  showLoadingState();

  forecastList.innerHTML = "";

  if (typeof Analytics !== 'undefined') {
    Analytics.trackEvent('weather_data_fetch', {
      event_category: 'weather',
      event_label: 'api_call'
    });
  }

  Promise.all([
    fetch(currentWeatherURL),
    fetch(forecastURL),
    fetch(airQualityURL)
  ])
  .then(async ([currentResponse, forecastResponse, airQualityResponse]) => {
    if (!currentResponse.ok) {
      throw new Error(`Current weather: ${currentResponse.status}`);
    }
    if (!forecastResponse.ok) {
      throw new Error(`Forecast: ${forecastResponse.status}`);
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();
    const airQualityData = airQualityResponse.ok ? await airQualityResponse.json() : null;

    currentWeatherData = currentData;
    currentForecastData = forecastData;
    currentAirQualityData = airQualityData;
    setCachedWeather(cacheKey, {
      current: currentData,
      forecast: forecastData,
      airQuality: airQualityData
    });
    
    hideLoadingState();
    updateCurrentWeather(currentData);
    updateForecast(forecastData);
    if (airQualityData) updateAirQuality(airQualityData);
    updatePageBackground(currentData.weather[0].main);
    checkWeatherAlerts(currentData);
  })
  .catch((error) => {
    hideLoadingState();
    showErrorMessage("Unable to fetch weather data. Please check your connection and try again.");
    console.log("Error fetching weather data:", error);
    if (typeof Analytics !== 'undefined') {
      Analytics.trackEvent('weather_api_error', {
        event_category: 'weather',
        event_label: 'fetch_failed',
        error: error.message
      });
    }
  });
}

function updateCurrentWeather(data) {
  const tempKelvin = data.main.temp;
  const tempFahrenheit = convertTemperature(tempKelvin, 'kelvin', 'fahrenheit');
  const tempCelsius = convertTemperature(tempKelvin, 'kelvin', 'celsius');
  
  const displayTemp = currentUnit === 'fahrenheit' ? tempFahrenheit : tempCelsius;
  const tempUnit = currentUnit === 'fahrenheit' ? '°F' : '°C';

  const condition = data.weather[0].description;
  const capitalizedCondition =
    condition.charAt(0).toUpperCase() + condition.slice(1);

  if (typeof Analytics !== 'undefined') {
    Analytics.trackEvent('weather_condition_viewed', {
      weather_condition: data.weather[0].main,
      temperature: tempFahrenheit,
      location: data.name,
      event_category: 'weather',
      event_label: data.weather[0].main
    });
  }

  const heatIndex = calculateHeatIndex(tempFahrenheit, data.main.humidity);
  const windChillF = calculateWindChill(tempFahrenheit, Math.round(data.wind.speed * 2.237));
  const dewPointF = calculateDewPoint(tempFahrenheit, data.main.humidity);
  const uvIndex = data.uvi || 0; // UV index from weather data (if available)
  const uvInfo = getUVIndexInfo(uvIndex);
  
  const displayHeatIndex = currentUnit === 'fahrenheit' ? heatIndex : Math.round((heatIndex - 32) * 5/9);
  const displayWindChill = currentUnit === 'fahrenheit' ? windChillF : Math.round((windChillF - 32) * 5/9);
  const displayDewPoint = currentUnit === 'fahrenheit' ? dewPointF : Math.round((dewPointF - 32) * 5/9);

  currentWeatherContainer.innerHTML = `
    <div class="icon">
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" style="height: 5rem;" alt="${capitalizedCondition}" />
    </div>
    <div class="temp">${displayTemp}${tempUnit}</div>
    <div class="summary">${capitalizedCondition}</div>
    <div class="rain-chance"><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</div>
    <div class="location">${data.name}, ${data.sys.country}</div>
    <div class="additional-info">
      <div><i class="fas fa-thermometer-half"></i> Feels like: ${currentUnit === 'fahrenheit' ? 
        convertTemperature(data.main.feels_like, 'kelvin', 'fahrenheit') : 
        convertTemperature(data.main.feels_like, 'kelvin', 'celsius')}${tempUnit}</div>
      <div><i class="fas fa-wind"></i> Wind: ${Math.round(data.wind.speed * 2.237)} mph</div>
      <div><i class="fas fa-eye"></i> Visibility: ${(data.visibility / 1000).toFixed(1)} km</div>
      ${tempFahrenheit >= 80 ? `<div><i class="fas fa-temperature-high"></i> Heat Index: ${displayHeatIndex}${tempUnit}</div>` : ''}
      ${tempFahrenheit <= 50 ? `<div><i class="fas fa-snowflake"></i> Wind Chill: ${displayWindChill}${tempUnit}</div>` : ''}
      <div><i class="fas fa-tint"></i> Dew Point: ${displayDewPoint}${tempUnit}</div>
      <div><i class="fas fa-sun"></i> Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      <div><i class="fas fa-moon"></i> Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    </div>
  `;
}

function setupUnitToggle() {
  const fahrenheitBtn = document.getElementById('fahrenheit-btn');
  const celsiusBtn = document.getElementById('celsius-btn');
  
  fahrenheitBtn.addEventListener('click', () => {
    if (currentUnit !== 'fahrenheit') {
      currentUnit = 'fahrenheit';
      updateActiveUnit();
      refreshWeatherDisplay();
      
      if (typeof Analytics !== 'undefined') {
        Analytics.trackEvent('unit_changed', {
          event_category: 'weather',
          event_label: 'fahrenheit'
        });
      }
    }
  });

  celsiusBtn.addEventListener('click', () => {
    if (currentUnit !== 'celsius') {
      currentUnit = 'celsius';
      updateActiveUnit();
      refreshWeatherDisplay();
      
      if (typeof Analytics !== 'undefined') {
        Analytics.trackEvent('unit_changed', {
          event_category: 'weather',
          event_label: 'celsius'
        });
      }
    }
  });
}

function updateActiveUnit() {
  const fahrenheitBtn = document.getElementById('fahrenheit-btn');
  const celsiusBtn = document.getElementById('celsius-btn');
  
  fahrenheitBtn.classList.toggle('active', currentUnit === 'fahrenheit');
  celsiusBtn.classList.toggle('active', currentUnit === 'celsius');
}

function refreshWeatherDisplay() {
  if (currentWeatherData && currentForecastData) {
    updateCurrentWeather(currentWeatherData);
    updateForecast(currentForecastData);
    if (currentAirQualityData) updateAirQuality(currentAirQualityData);
    updatePageBackground(currentWeatherData.weather[0].main);
  }
}

function setupRefreshButton() {
  const refreshBtn = document.getElementById('refresh-btn');
  
  refreshBtn.addEventListener('click', () => {
    if (lat && lon) {
      fetchWeatherData();
      
      if (typeof Analytics !== 'undefined') {
        Analytics.trackEvent('refresh_clicked', {
          event_category: 'weather',
          event_label: 'manual_refresh'
        });
      }
    }
  });
}

function setupLocationAutocomplete() {
  const locationInput = document.getElementById("location-input");
  const suggestionsContainer = document.getElementById("location-suggestions");
  let timeout;
  let suggestionSelected = false;
  
  locationInput.addEventListener('input', (e) => {
    clearTimeout(timeout);
    const query = e.target.value.trim();
    suggestionSelected = false;
    
    if (query.length > 2) {
      timeout = setTimeout(() => {
        fetchLocationSuggestions(query);
      }, 300);
    } else {
      hideSuggestions();
    }
  });

  document.addEventListener('click', (e) => {
    if (!locationInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
      hideSuggestions();
    }
  });

  window.suggestionSelected = false;
}

function fetchLocationSuggestions(query) {
  const geocodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
  
  fetch(geocodingAPI)
    .then(response => response.json())
    .then(data => {
      showSuggestions(data);
    })
    .catch(error => {
      console.log("Error fetching location suggestions:", error);
    });
}

function showSuggestions(locations) {
  const suggestionsContainer = document.getElementById("location-suggestions");
  
  if (locations.length === 0) {
    hideSuggestions();
    return;
  }
  
  suggestionsContainer.innerHTML = locations.map(location => {
    const displayName = `${location.name}${location.state ? ', ' + location.state : ''}, ${location.country}`;
    return `<div class="suggestion-item" data-lat="${location.lat}" data-lon="${location.lon}" data-name="${displayName}">${displayName}</div>`;
  }).join('');
  
  suggestionsContainer.style.display = 'block';

  suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
      const selectedLat = item.dataset.lat;
      const selectedLon = item.dataset.lon;
      const selectedName = item.dataset.name;
      
      document.getElementById("location-input").value = selectedName;
      lat = parseFloat(selectedLat);
      lon = parseFloat(selectedLon);

      window.suggestionSelected = true;

      hideSuggestions();

      fetchWeatherData();
      
      if (typeof Analytics !== 'undefined') {
        Analytics.trackEvent('suggestion_selected', {
          event_category: 'weather',
          event_label: selectedName
        });
      }
    });
  });
}

function hideSuggestions() {
  const suggestionsContainer = document.getElementById("location-suggestions");
  suggestionsContainer.style.display = 'none';
}

function checkWeatherAlerts(data) {
  if (data.alerts && data.alerts.length > 0) {
    showWeatherAlert(data.alerts[0]);
  } else {
    const existingAlert = document.querySelector('.weather-alert');
    if (existingAlert) {
      existingAlert.remove();
    }
  }
}

function showWeatherAlert(alert) {
  const existingAlert = document.querySelector('.weather-alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  const alertDiv = document.createElement('div');
  alertDiv.className = 'weather-alert';
  alertDiv.innerHTML = `
    <div class="alert-content">
      <i class="fas fa-exclamation-triangle"></i>
      <span><strong>${alert.event}:</strong> ${alert.description}</span>
    </div>
  `;
  
  const container = document.querySelector('.container');
  container.insertBefore(alertDiv, container.firstChild);
}

function updateForecast(data) {
  const forecasts = data.list;
  const tempUnit = currentUnit === 'fahrenheit' ? '°F' : '°C';

  const groupedForecasts = {};
  forecasts.forEach((forecast) => {
    const forecastDate = new Date(forecast.dt_txt.split(" ")[0]).toDateString();
    if (!groupedForecasts[forecastDate]) {
      groupedForecasts[forecastDate] = [];
    }
    groupedForecasts[forecastDate].push(forecast);
  });

  forecastList.innerHTML = "";

  const availableDays = Object.entries(groupedForecasts);
  console.log(`Available forecast days: ${availableDays.length}`);

  availableDays.forEach(([date, forecasts]) => {
    const temperatureHighArray = forecasts.map((f) =>
      currentUnit === 'fahrenheit' ? 
        convertTemperature(f.main.temp_max, 'kelvin', 'fahrenheit') :
        convertTemperature(f.main.temp_max, 'kelvin', 'celsius')
    );
    const temperatureLowArray = forecasts.map((f) =>
      currentUnit === 'fahrenheit' ? 
        convertTemperature(f.main.temp_min, 'kelvin', 'fahrenheit') :
        convertTemperature(f.main.temp_min, 'kelvin', 'celsius')
    );
    const temperatureHigh = Math.max(...temperatureHighArray);
    const temperatureLow = Math.min(...temperatureLowArray);
    const iconCode = forecasts[0].weather[0].icon;
    const rainPercentage = (forecasts.reduce((total, f) => total + f.pop, 0) / forecasts.length) * 100;
    const condition = forecasts[0].weather[0].description;
    const capitalizedCondition = condition.charAt(0).toUpperCase() + condition.slice(1);

    const dateObj = new Date(date);
    const isToday = dateObj.toDateString() === new Date().toDateString();
    const isTomorrow = dateObj.toDateString() === new Date(Date.now() + 86400000).toDateString();
    
    let formattedDate;
    if (isToday) {
      formattedDate = 'Today';
    } else if (isTomorrow) {
      formattedDate = 'Tomorrow';
    } else {
      formattedDate = dateObj.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }

    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");
    forecastItem.innerHTML = `
      <div class="forecast-date">${formattedDate}</div>
      <div class="forecast-icon">
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${capitalizedCondition}" />
      </div>
      <div class="forecast-temp">${temperatureHigh}${tempUnit}</div>
      <div class="forecast-temp-low">${temperatureLow}${tempUnit}</div>
      <div class="forecast-condition">${capitalizedCondition}</div>
      <div class="rain-chance">
        <i class="fas fa-tint"></i> ${rainPercentage.toFixed(0)}%
      </div>
    `;

    forecastItem.addEventListener('click', () => {
      if (typeof Analytics !== 'undefined') {
        Analytics.trackEvent('forecast_day_clicked', {
          event_category: 'weather',
          event_label: formattedDate
        });
      }
    });

    forecastList.appendChild(forecastItem);
  });

  createTemperatureChart(data);
}

let temperatureChart = null;

function createTemperatureChart(forecastData) {
  const ctx = document.getElementById('temperatureChart');
  if (!ctx) return;

  const hourlyData = forecastData.list.slice(0, 8);
  
  const labels = hourlyData.map(item => {
    const date = new Date(item.dt * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  
  const temperatures = hourlyData.map(item => {
    const tempK = item.main.temp;
    return currentUnit === 'fahrenheit' ? 
      convertTemperature(tempK, 'kelvin', 'fahrenheit') :
      convertTemperature(tempK, 'kelvin', 'celsius');
  });
  
  const precipitation = hourlyData.map(item => (item.pop * 100));

  if (temperatureChart) {
    temperatureChart.destroy();
  }
  
  temperatureChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `Temperature (${currentUnit === 'fahrenheit' ? '°F' : '°C'})`,
        data: temperatures,
        borderColor: '#00e5a0',
        backgroundColor: 'rgba(0, 229, 160, 0.08)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }, {
        label: 'Precipitation (%)',
        data: precipitation,
        borderColor: '#64748b',
        backgroundColor: 'rgba(100, 116, 139, 0.08)',
        borderWidth: 2,
        fill: false,
        yAxisID: 'y1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#94a3b8'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#64748b' },
          grid: { color: 'rgba(255, 255, 255, 0.04)' }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: { color: '#64748b' },
          grid: { color: 'rgba(255, 255, 255, 0.04)' }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: { color: '#64748b' },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });

  document.querySelector('.weather-chart-container').style.display = 'block';
}

const getWeatherButton = document.getElementById("get-weather-button");
getWeatherButton.addEventListener("click", () => {
  const locationInput = document.getElementById("location-input");
  const location = locationInput.value.trim();

  if (location) {
    if (typeof Analytics !== 'undefined') {
      Analytics.trackEvent('manual_location_search', {
        search_term: location,
        event_category: 'weather',
        event_label: 'user_input'
      });
    }

    const geocodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;

    showLoadingState();

    fetch(geocodingAPI)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Location not found");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          throw new Error("No location found");
        }
        
        lat = data[0].lat;
        lon = data[0].lon;

        const foundLocationName = `${data[0].name}${data[0].state ? ', ' + data[0].state : ''}, ${data[0].country}`;
        locationInput.value = foundLocationName;

        if (typeof Analytics !== 'undefined') {
          Analytics.trackEvent('location_search_success', {
            searched_location: location,
            found_location: foundLocationName,
            event_category: 'weather',
            event_label: 'search_successful'
          });
        }

        fetchWeatherData();
      })
      .catch((error) => {
        console.log("Error fetching geolocation data:", error);
        showErrorMessage(`Location "${location}" not found. Please try a different location or select from the suggestions.`);
        if (typeof Analytics !== 'undefined') {
          Analytics.trackEvent('location_search_error', {
            searched_location: location,
            error_type: 'location_not_found',
            event_category: 'weather',
            event_label: 'search_failed'
          });
        }
      });
  } else {
    showErrorMessage("Please enter a location to search for weather data.");
  }
});

document.getElementById("location-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (!window.suggestionSelected) {
      document.getElementById("get-weather-button").click();
    }
    window.suggestionSelected = false;
  }
});

function updatePageBackground(weatherMain) {
  const body = document.querySelector("body");

  console.log("Weather condition received:", weatherMain);

  switch(weatherMain?.toLowerCase()) {
    case 'clear':
      body.style.background = "linear-gradient(180deg, #0a0a0f 0%, #0c1a15 50%, #0a0a0f 100%)";
      break;
    case 'clouds':
    case 'overcast':
    case 'partly cloudy':
    case 'scattered clouds':
    case 'broken clouds':
    case 'few clouds':
      body.style.background = "linear-gradient(180deg, #0a0a0f 0%, #0f1419 50%, #0a0a0f 100%)";
      break;
    case 'rain':
    case 'drizzle':
    case 'light rain':
    case 'moderate rain':
    case 'heavy rain':
    case 'shower rain':
      body.style.background = "linear-gradient(180deg, #0a0a0f 0%, #0a0f1a 50%, #0a0a0f 100%)";
      break;
    case 'thunderstorm':
    case 'thunderstorms':
      body.style.background = "linear-gradient(180deg, #0a0a0f 0%, #0a0a12 50%, #050508 100%)";
      break;
    case 'snow':
    case 'light snow':
    case 'heavy snow':
      body.style.background = "linear-gradient(180deg, #0a0a0f 0%, #0f1219 50%, #0a0a0f 100%)";
      break;
    case 'mist':
    case 'fog':
    case 'haze':
    case 'smoke':
    case 'dust':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      body.style.background = "linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)";
      break;
    default:
      console.log("Using default background for weather condition:", weatherMain);
      body.style.background = "#0a0a0f";
  }

  body.style.color = "#94a3b8";
}

function updateAirQuality(data) {
  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;

  const aqiLevels = {
    1: { label: 'Good', color: '#00e400', description: 'Air quality is satisfactory' },
    2: { label: 'Fair', color: '#ffff00', description: 'Air quality is acceptable' },
    3: { label: 'Moderate', color: '#ff7e00', description: 'Sensitive people may experience symptoms' },
    4: { label: 'Poor', color: '#ff0000', description: 'Everyone may experience health effects' },
    5: { label: 'Very Poor', color: '#8f3f97', description: 'Health warnings of emergency conditions' }
  };
  
  const aqiInfo = aqiLevels[aqi] || aqiLevels[1];

  let airQualityContainer = document.querySelector('.air-quality-container');
  if (!airQualityContainer) {
    airQualityContainer = document.createElement('div');
    airQualityContainer.className = 'air-quality-container';
    const container = document.querySelector('.container');
    container.appendChild(airQualityContainer);
  }
  
  airQualityContainer.innerHTML = `
    <h3 style="margin: 20px 0 15px 0; color: #f1f5f9; text-align: center; font-family: var(--font-display); font-weight: 600; font-size: 1rem; letter-spacing: -0.02em;">
      <i class="fas fa-wind" style="color: #00e5a0;"></i> Air Quality Index
    </h3>
    <div class="aqi-main" style="text-align: center; margin-bottom: 15px;">
      <div class="aqi-value" style="display: inline-block; padding: 8px 20px; border-radius: 8px; background: ${aqiInfo.color}; color: #000; font-weight: 600; font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 10px; cursor: help; transition: all 0.2s ease;"
           title="Air Quality Index (AQI) - A standardized scale from 1-5 that indicates air pollution levels. Based on concentrations of major pollutants including PM2.5, PM10, ozone, and nitrogen dioxide."
           onmouseover="this.style.transform='scale(1.05)'"
           onmouseout="this.style.transform='scale(1)'">
        ${aqi} - ${aqiInfo.label}
      </div>
      <div class="aqi-description" style="color: #94a3b8; font-size: 0.85rem;">
        ${aqiInfo.description}
      </div>
    </div>
    <div class="air-pollutants">
      <div class="pollutant-item"
           title="PM2.5 - Fine particulate matter smaller than 2.5 micrometers. Can penetrate deep into lungs and bloodstream. Main sources: vehicle emissions, industrial processes, wildfires.">
        <div style="font-weight: 600; color: #f1f5f9;">PM2.5</div>
        <div>${components.pm2_5.toFixed(1)} µg/m³</div>
      </div>
      <div class="pollutant-item"
           title="PM10 - Coarse particulate matter smaller than 10 micrometers. Can irritate eyes, nose, and throat. Main sources: dust storms, construction, road dust.">
        <div style="font-weight: 600; color: #f1f5f9;">PM10</div>
        <div>${components.pm10.toFixed(1)} µg/m³</div>
      </div>
      <div class="pollutant-item"
           title="O₃ - Ground-level ozone (smog). Can cause respiratory problems and eye irritation. Formed when sunlight reacts with pollutants from vehicles and industry.">
        <div style="font-weight: 600; color: #f1f5f9;">O₃</div>
        <div>${components.o3.toFixed(1)} µg/m³</div>
      </div>
      <div class="pollutant-item"
           title="NO₂ - Nitrogen dioxide. Can cause respiratory issues and reduced lung function. Main sources: vehicle emissions, power plants, industrial activities.">
        <div style="font-weight: 600; color: #f1f5f9;">NO₂</div>
        <div>${components.no2.toFixed(1)} µg/m³</div>
      </div>
      ${components.so2 ? `<div class="pollutant-item"
           title="SO₂ - Sulfur dioxide. Can cause breathing difficulties and throat irritation. Main sources: fossil fuel combustion, industrial processes, volcanoes.">
        <div style="font-weight: 600; color: #f1f5f9;">SO₂</div>
        <div>${components.so2.toFixed(1)} µg/m³</div>
      </div>` : ''}
      ${components.co ? `<div class="pollutant-item"
           title="CO - Carbon monoxide. Colorless, odorless gas that can be deadly in high concentrations. Reduces oxygen delivery to organs. Main sources: vehicle emissions, faulty heating systems.">
        <div style="font-weight: 600; color: #f1f5f9;">CO</div>
        <div>${(components.co / 1000).toFixed(2)} mg/m³</div>
      </div>` : ''}
    </div>
  `;
}

function calculateHeatIndex(tempF, humidity) {
  if (tempF < 80) return tempF;
  
  const hi = -42.379 + 2.04901523 * tempF + 10.14333127 * humidity 
    - 0.22475541 * tempF * humidity - 0.00683783 * tempF * tempF 
    - 0.05481717 * humidity * humidity + 0.00122874 * tempF * tempF * humidity 
    + 0.00085282 * tempF * humidity * humidity - 0.00000199 * tempF * tempF * humidity * humidity;
  
  return Math.round(hi);
}

function calculateWindChill(tempF, windMph) {
  if (tempF > 50 || windMph < 3) return tempF;
  
  const wc = 35.74 + 0.6215 * tempF - 35.75 * Math.pow(windMph, 0.16) 
    + 0.4275 * tempF * Math.pow(windMph, 0.16);
  
  return Math.round(wc);
}

function calculateDewPoint(tempF, humidity) {
  const tempC = (tempF - 32) * 5/9;
  const a = 17.27;
  const b = 237.7;
  
  const alpha = ((a * tempC) / (b + tempC)) + Math.log(humidity / 100.0);
  const dewPointC = (b * alpha) / (a - alpha);
  
  return Math.round(dewPointC * 9/5 + 32);
}

function getUVIndexInfo(uvIndex) {
  if (uvIndex <= 2) return { level: 'Low', color: '#00e400', advice: 'Minimal protection needed' };
  if (uvIndex <= 5) return { level: 'Moderate', color: '#ffff00', advice: 'Protection recommended' };
  if (uvIndex <= 7) return { level: 'High', color: '#ff7e00', advice: 'Protection essential' };
  if (uvIndex <= 10) return { level: 'Very High', color: '#ff0000', advice: 'Extra protection needed' };
  return { level: 'Extreme', color: '#8f3f97', advice: 'Avoid sun exposure' };
}
