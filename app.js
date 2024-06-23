import { citiesOfNetherland,internationalCities } from "./data.js";
import { initializeCities,findWeatherInfo,internationalCityListEl,cityListEl,searchInput } from "./study.js";




const loadApp=()=>{
    searchInput.addEventListener("keypress", findWeatherInfo);
    initializeCities(citiesOfNetherland, cityListEl);
    initializeCities(internationalCities, internationalCityListEl);
    
}
window.addEventListener('load',loadApp);