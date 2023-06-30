// Declaring the variables
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      // API ID
      const api = "a492a768764e969820914c25cd2b788a";

      // API URL
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a492a768764e969820914c25cd2b788a`;

      // Calling the API
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const temperatureInCelsius = Math.floor(data.main.temp - kelvin);
          const temperatureInFahrenheit = Math.floor((temperatureInCelsius * 9) / 5 + 32);
          temperature.textContent = temperatureInFahrenheit + "°F";
          summary.textContent = data.weather[0].description;
          loc.textContent = data.name + "," + data.sys.country;
          let icon1 = data.weather[0].icon;
          icon.innerHTML = `<img src="icons/${icon1}.svg" style='height:10rem'/>`;
        });
    });
  }
});
