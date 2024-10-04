document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
      fetchWeather(city);
      fetch5DayForecast(city);
    } else {
      alert('Please enter a city name');
    }
  });
  
  document.getElementById('current-location-btn').addEventListener('click', fetchCurrentLocationWeather);
  
  function fetchWeather(city) {
    const apiKey = '8ab56934ba676cef2b7e05433843718a'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          document.getElementById('city-name').textContent = data.name;
          document.getElementById('temperature').textContent = data.main.temp;
          document.getElementById('condition').textContent = data.weather[0].description;
          document.getElementById('humidity').textContent = data.main.humidity;
          document.getElementById('wind-speed').textContent = data.wind.speed;
          document.getElementById('weather-info').classList.remove('hidden');
          changeBackground(data.weather[0].main.toLowerCase());
        } else {
          alert('City not found');
        }
      })
      .catch(error => alert('Error fetching data'));
  }
  
  function fetch5DayForecast(city) {
    const apiKey = '8ab56934ba676cef2b7e05433843718a'; // Ensure you are using the correct API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.list) {
          displayForecast(data.list);
        } else {
          alert('No forecast data available');
        }
      })
      .catch(error => {
        console.error('Error fetching 5-day forecast:', error);
        alert('Failed to retrieve forecast data. Please try again later.');
      });
  }
  
  function displayForecast(forecast) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast
    forecast.forEach((item, index) => {
      if (index % 8 === 0) { // Show forecast every 24 hours
        const date = new Date(item.dt * 1000).toDateString();
        const temp = item.main.temp;
        const condition = item.weather[0].description;
  
        const forecastItem = `<div class="forecast-item">
          <h3>${date}</h3>
          <p>${temp}°C, ${condition}</p>
        </div>`;
        forecastContainer.innerHTML += forecastItem;
      }
    });
    document.getElementById('forecast').classList.remove('hidden');
  }
  
  function fetchCurrentLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }
  
  function fetchWeatherByCoords(lat, lon) {
    const apiKey = '8ab56934ba676cef2b7e05433843718a'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temperature').textContent = data.main.temp;
        document.getElementById('condition').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind-speed').textContent = data.wind.speed;
        document.getElementById('weather-info').classList.remove('hidden');
        changeBackground(data.weather[0].main.toLowerCase());
      });
  }
  
  function changeBackground(condition) {
    const body = document.body;
    if (condition.includes('clear')) {
      body.style.backgroundImage = "url('https://www.pinterest.com/pin/28217935159902929/')";
    } else if (condition.includes('rain')) {
      body.style.backgroundImage = "url('https://www.pinterest.com/pin/28217935159902929/')";
    } else if (condition.includes('cloud')) {
      body.style.backgroundImage = "url('https://www.pinterest.com/pin/28217935159902929/')";
    } else {
      body.style.backgroundImage = "url('https://www.pinterest.com/pin/28217935159902929/`')";
    }
  }
  