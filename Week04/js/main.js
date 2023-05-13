// Variables (URL invalid ID for Try/Catch purpose)
const url = "https://api.openweathermap.org/data/2.5/weather?id=invalid&units=metric&appid=180d290cb4799e855223c718d2f06c4c";
const weatherCard = document.querySelector('section');

// Main execution
updateWeather(weatherCard, url);

// Functions
function updateWeather(selector, url) {
  renderWeather(selector, url);
  document.querySelector('#update-note').innerHTML = new Date().toLocaleString();
    
  setTimeout(updateWeather, 5 * 60 * 1000, selector, url);
};

async function renderWeather(selector, url) {
  try {
    const weather = await checkWeather(url);
    selector.innerHTML = templateWeatherCard(weather);
  } catch (error) {
    console.log(error);
    displayUnavailableService(selector);
  };
};

function templateWeatherCard(weather) {
  return `
    <p>The current temperature in <strong>Santa Fe, Argentina</strong>
    is <strong>${weather.main.temp.toFixed(0)}</strong> &deg;C</p>
    <figure>
      <img src="https://openweathermap.org/img/w/${weather.weather[0].icon}.png"
      alt="${weather.weather[0].description}"
      id="weather-icon" />
      <figcaption>${capitalize(weather.weather[0].description)}</figcaption>
    </figure>
  `;
};

async function checkWeather(url) {
  try{
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
          throw Error(await response.text());
      };
    } catch (error) {
      throw Error(await response.text());
  } ;
};

function capitalize(string){
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

function displayUnavailableService(selector) {
  selector.innerHTML = `
  <h2>Service Temporarily Unavailable</h2> 
  `
};