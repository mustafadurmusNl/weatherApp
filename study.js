import { getWeatherInfo } from "./api.js";


//select elements
const cityNameEl = document.querySelector(".cityName");
const degreeEl = document.querySelector(".degree");
const descEl = document.querySelector(".desc");
export const cityListEl = document.querySelector(".city-list");
export const internationalCityListEl = document.querySelector(
  ".internationalCity-list"
);
export const searchInput = document.getElementById("searchInput");

export function findWeatherInfo(e) {
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

function displayCityWeather(data, cityElement) {
  const degree = Math.round(data.main.temp) + "°";
  const description = data.weather[0].description;
  cityElement.querySelector(".degree").textContent = degree;
  cityElement.querySelector(".desc").textContent = description;
}

function createCityElement(cityName, containerElement) {
  const cityElement = document.createElement("div");
  cityElement.classList.add("city");

  const nameEl = document.createElement("div");
  nameEl.classList.add("city-name");
  nameEl.textContent = cityName;

  const degreeEl = document.createElement("div");
  degreeEl.classList.add("degree");
  degreeEl.textContent = "";

  const descEl = document.createElement("div");
  descEl.classList.add("desc");
  descEl.textContent = "";

  cityElement.appendChild(nameEl);
  cityElement.appendChild(degreeEl);
  cityElement.appendChild(descEl);

  containerElement.appendChild(cityElement);

  return cityElement;
}
export function initializeCities(cityList, containerElement) {
  cityList.forEach((city) => {
    const cityElement = createCityElement(city, containerElement);
    getWeatherInfo(city)
      .then((data) => displayCityWeather(data, cityElement))
      .catch((err) => console.log(err));
  });
}
