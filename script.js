function start() {
    document.getElementById('search-button').addEventListener('click', getWeather);
}

async function getWeather() {
    let city = document.getElementById('city');
    let cityValue = city.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

    try {
        if (cityValue.length === 0) {
            throw new Error('Pleace enter a city name');
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        template(data);
        city.value = '';

    } catch (error) {
        alert(error.message);
    }
}

function template(data) {
    const result = document.getElementById('result');

    result.innerHTML = `
         <h2>${data.name}</h2>
         <h4 id='weather'>${data.weather[0].main}</h4>
         <img src='https://openweathermap.org/img/w/${data.weather[0].icon}.png'>
         <h1>${Math.trunc(data.main.temp)}&#176</h1>
         <h4 id='feels-like'>Feels like ${Math.trunc(data.main.feels_like)}&#176</h4>

         <div id='temp-container'>
             <div>
                 <i class="fa-solid fa-arrow-up"></i>
                 <h4 class='title'>Max</h4>
                 <h4 class='temp'>${Math.trunc(data.main.temp_max)}&#176</h4>
             </div>

             <div>
                 <i class="fa-solid fa-arrow-down"></i>
                 <h4 class='title'>Min</h4>
                 <h4 class='temp'>${Math.trunc(data.main.temp_min)}&#176</h4>
             </div>

             <div>
                 <i class="fa-solid fa-droplet"></i>
                 <h4 class='title'>Humidity</h4>
                 <h4 class='temp'>${data.main.humidity}%</h4>
             </div>

             <div>
                 <i class="fa-solid fa-wind"></i>
                 <h4 class='title'>Wind</h4>
                 <h4 class='temp'>${Math.trunc(data.wind.speed)} km/h</h4>
             </div>
         </div>
         `;

    return result;
}

start();