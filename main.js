import { citiesOfNetherland, internationalCities } from "./ConstantDatas.js";
import {
  initializeCities,
  findWeatherInfo,
  internationalCityListEl,
  cityListEl,
  searchInput,
} from "./initWeatherApp.js";

const loadApp = () => {
  searchInput.addEventListener("keypress", findWeatherInfo);
  initializeCities(citiesOfNetherland, cityListEl);
  initializeCities(internationalCities, internationalCityListEl);
};
window.addEventListener("load", loadApp);
