const apiKey = "c003415d91268e39ca0bf95db8538252";


function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(currentUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById("cityName").innerText = data.name;
      document.getElementById("temperature").innerText =
        `Temperature: ${data.main.temp} °C`;
      document.getElementById("description").innerText =
        `Weather: ${data.weather[0].description}`;
      document.getElementById("humidity").innerText =
        `Humidity: ${data.main.humidity}%`;

      const iconCode = data.weather[0].icon;
      document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      getForecast(city);
    })
    .catch(() => {
      alert("City not found!");
    });
}

function getForecast(city) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      const forecastDiv = document.getElementById("forecast");
      forecastDiv.innerHTML = "";

      for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        const date = new Date(day.dt_txt).toDateString();
        const temp = day.main.temp;
        const icon = day.weather[0].icon;

        forecastDiv.innerHTML += `
          <div class="forecast-day">
            <p>${date}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
            <p>${temp} °C</p>
          </div>
        `;
      }
    });
}
