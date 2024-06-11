const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const apiKey = "40780f584ae83749b62a5335ccf1e583";

async function getWeatherInfo(cityName) {
  const response = await fetch(
    `${baseUrl}?q=${cityName}&units=metric&lang=en&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}
//select elements
const container = document.querySelector(".container");
const cityNameEl = document.querySelector(".cityName");
const degreeEl = document.querySelector(".degree");
const descEl = document.querySelector(".desc");

searchInput.addEventListener("keypress", findWeatherInfo);

function findWeatherInfo(e) {
  if (e.keyCode == "13") {
    //ascii value for enter key
    const cityName = searchInput.value.trim();
    getWeatherInfo(cityName)
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
