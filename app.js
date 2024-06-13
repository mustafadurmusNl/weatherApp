import { cities,internationalCities } from "./data.js";
import { initializeCities,findWeatherInfo } from "./study.js";
import{internationalCityListEl,cityListEl,searchInput} from "./study.js";



const loadApp=()=>{
    searchInput.addEventListener("keypress", findWeatherInfo);
    initializeCities(cities, cityListEl);
    initializeCities(internationalCities, internationalCityListEl);
    
}
window.addEventListener('load',loadApp);