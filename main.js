class WeatherAPI {
  constructor() {
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";

    this.apiKey = "40780f584ae83749b62a5335ccf1e583";
  }

  async getWeatherInfo(cityName) {
    try {
      const response = await fetch(
        `${this.baseUrl}?q=${cityName}&units=metric&lang=en&appid=${this.apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error("City not found"); // if response is not ok  throw an error
    } catch (err) {
      console.log(err);
    }
  }
}
//Elementleri Seçmek
const container = document.querySelector(".container");
const cityNameEl = document.querySelector(".cityName");
const degreeEl = document.querySelector(".degree");
const descEl = document.querySelector(".desc");

searchInput.addEventListener("keypress", findWeatherInfo);

const weatherApi = new WeatherAPI();

function findWeatherInfo(e) {
  if (e.keyCode == "13") {
    const cityName = searchInput.value.trim();
    weatherApi
      .getWeatherInfo(cityName)
      .then((data) => {
        console.log(data);
        display(data);
      })
      .catch((err) => console.log(err));
  }
}

function display(data) {
  cityNameEl.textContent = data.name;
  degreeEl.textContent = Math.round(data.main.temp) + "°";
  descEl.textContent = data.weather[0].description;

  searchInput.value = "";
}
