// weathermap API url
const url = "https://api.openweathermap.org/data/2.5/weather?id=3836277&units=metric&appid=180d290cb4799e855223c718d2f06c4c"

// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const updateNote = document.querySelector('#update-note');

// Check the weather API
async function checkWeather(url) {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
}

// Display Weather
function displayResults(weatherData) {
  currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = capitalize(weatherData.weather[0].description);

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

// Capitalize
function capitalize(string){
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

function updateWeather(updateNote) {
  // Check the weather
  checkWeather(url);

  updateNote.innerHTML = new Date().toLocaleString();
    
  // Schedule next execution in 5 minutes
  setTimeout(updateWeather, 5 * 60 * 1000, updateNote);
  
}

// First execution
updateWeather(updateNote);