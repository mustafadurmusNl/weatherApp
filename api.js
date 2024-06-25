const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const apiKey = "40780f584ae83749b62a5335ccf1e583";

export async function getWeatherInfo(cityName) {
  const response = await fetch(
    `${baseUrl}?q=${cityName}&units=metric&lang=en&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}
