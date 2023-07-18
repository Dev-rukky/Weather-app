const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetail = document.querySelector('.weather-details');
const error_404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = "6ee39d211856dbd0c75e17896b67d8fc";
    const city = document.querySelector('.search-box input').value;

    if (city === "")
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '450px';
            weatherBox.style.display = 'none';
            weatherDetail.style.display = 'none';
            error_404.style.display = 'block';
            error_404.classList.add('fadeIn');
            return;
        }
        error_404.style.display = 'none';
        error_404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temp = document.querySelector('.weather-box .temp');
        const descr = document.querySelector('.weather-box .descri');
        const humidity = document.querySelector('.weather-details .humidity span');
        const windSpeed = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'image/clear-1.gif';
                break;
            case 'Rain':
                image.src = 'image/rain-1.gif';
                break;
            case 'Snow':
                image.src = 'image/snow.png';
                break;
            case 'Clouds':
                image.src = 'image/cloud.png';
                break;
            case 'Haze':
                image.src = 'image/mist.png';
                break;
            default:
                image.src = '';
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descr.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        windSpeed.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

        weatherBox.style.display = '';
        weatherDetail.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetail.classList.add('fadeIn');
        container.style.height = '620px';

    });


});