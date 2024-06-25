import { getWeatherInfo } from "./api.js";
import {
  showLoading,
  hideLoading,
  showError,
  setWeatherBackground,
  clearWeatherData,
  delayForDisplayingInfo,
} from "./utils.js";

export const cityNameEl = document.querySelector(".cityName");
const degreeEl = document.querySelector(".degree");
const descEl = document.querySelector(".desc");

export const cityListEl = document.querySelector(".city-list");
export const internationalCityListEl = document.querySelector(
  ".internationalCity-list"
);

export const searchInput = document.getElementById("searchInput");

export async function findWeatherInfo(e) {
  if (e.keyCode == "13") {
    const cityName = searchInput.value.trim();
    try {
      if (cityName) {
        showLoading();
        await delayForDisplayingInfo(1000);
        const data = await getWeatherInfo(cityName);
        hideLoading();
        displayWeather(data, document.querySelector(".icon"));
      }
    } catch (err) {
      hideLoading();
      showError("please enter a valid city name");
      clearWeatherData();
    }
  }
}
function displayWeather(data, targetElement) {
  const { name, main, weather } = data;
  if (targetElement === document.querySelector(".icon")) {
    cityNameEl.textContent = name;
    degreeEl.textContent = `${Math.round(main.temp)}°`;
    descEl.textContent = weather[0].description;
    searchInput.value = "";
  } else {
    targetElement.querySelector(".degree").textContent = `${Math.round(
      main.temp
    )}°`;
    targetElement.querySelector(".desc").textContent = weather[0].description;
  }
  setWeatherBackground(weather[0].description, targetElement);
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

export async function initializeCities(cityList, containerElement) {
  try {
    containerElement.innerHTML = "";
    for (const city of cityList) {
      const cityElement = createCityElement(city, containerElement);
      const data = await getWeatherInfo(city);
      displayWeather(data, cityElement);
    }
  } catch (err) {
    console.log(err);
  }
}
