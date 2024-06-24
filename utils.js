import { weatherConditions } from "./data.js";
const errorEl = document.querySelector(".error");
const loadingEl = document.querySelector(".loading");
const cityNameEl = document.querySelector(".cityName");
const degreeEl = document.querySelector(".degree");
const descEl = document.querySelector(".desc");
const searchInput = document.getElementById("searchInput");

export function showLoading() {
  loadingEl.style.display = "block";
  errorEl.style.display = "none";
}

export function hideLoading() {
  loadingEl.style.display = "none";
}

export function showError(message) {
  errorEl.textContent = message;
  errorEl.style.display = "block";
}

export function setWeatherBackground(description, targetElement) {
  const descLower = description.toLowerCase();
  const matchedCondition = weatherConditions.find((condition) =>
    descLower.includes(condition.desc)
  );
  const backgroundImage = matchedCondition
    ? matchedCondition.imageUrl
    : "url(images/default.png)";
  targetElement.style.backgroundImage = backgroundImage;
}

export function clearWeatherData() {
  cityNameEl.textContent = "";
  degreeEl.textContent = "";
  descEl.textContent = "";
  searchInput.value = "";
  document.querySelector('.icon').style.backgroundImage = "";

}

export function delayForDisplayingInfo(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
