import { getWeatherInfo } from "./api.js";


//select elements
const cityNameEl = document.querySelector(".cityName");
const degreeEl = document.querySelector(".degree");
const descEl = document.querySelector(".desc");
export const cityListEl = document.querySelector(".city-list");
export const internationalCityListEl = document.querySelector(
  ".internationalCity-list"
);
//
const loadingEl = document.querySelector(".loading");
const errorEl = document.querySelector(".error");
//
export const searchInput = document.getElementById("searchInput");

export async function findWeatherInfo(e) {
  if (e.keyCode == "13") {
    //ascii value for enter key
    const cityName = searchInput.value.trim();
    try {
      if (cityName) {
        showLoading();
   await delayForDisplayingInfo(1000);
   	
        const data = await getWeatherInfo(cityName);
        console.log(data)
     hideLoading();
        display(data);
      }
    } catch (err) {
    hideLoading();
      showError("please enter a valid city name");
      clearWeatherData();
    }
  }
}
function display(data) {
  cityNameEl.textContent = data.name;
  degreeEl.textContent = Math.round(data.main.temp) + "°";
  searchInput.value = "";
  const description = data.weather[0].description;
  descEl.textContent = description
  setWeatherBackground(description);
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

export async function initializeCities(cityList, containerElement) {
  try {
    // Clear existing city elements
    containerElement.innerHTML = "";
    // Iterate over cityList and fetch weather data for each city
    for (const city of cityList) {
      const cityElement = createCityElement(city, containerElement);
      const data = await getWeatherInfo(city);
      displayCityWeather(data, cityElement);
      setWeatherBackground(data.weather[0].description);
    }

   
  } catch (err) { 
    console.log(err);
  }
}


//
function showLoading() {
  //loading animation
  loadingEl.style.display = "block"; // Show loading message
  errorEl.style.display = "none"; // Hide error message
}

function hideLoading() {
  loadingEl.style.display = "none";// Hide loading message
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.style.display = "block";// Show error message
}
function clearWeatherData() {
  cityNameEl.textContent = "";
  degreeEl.textContent = "";
  descEl.textContent = "";
}
function delayForDisplayingInfo(ms) {
  return new Promise(resolve => {
    clearWeatherData(); // Clear previous weather data
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function setWeatherBackground(description) {
  const appContainer = document.querySelector('.icon');
  let backgroundImage = '';

  const descLower = description.toLowerCase();

  switch (true) {
    case descLower.includes('clear'):
      backgroundImage = 'url(images/clear.png)';
      break;
    case descLower.includes('cloud'):
      backgroundImage = 'url(images/cloud.png)';
      break;
    case descLower.includes('rain'):
      backgroundImage = 'url(images/raining.png)';
      break;
    case descLower.includes('thunder'):
      backgroundImage = 'url(images/thunder.png)';
      break;
    case descLower.includes('snow'):
      backgroundImage = 'url(images/snow.png)';
      break;
    default:
      backgroundImage = 'url(images/default.jpg)';
      break;
  }

  appContainer.style.backgroundImage = backgroundImage;
}
