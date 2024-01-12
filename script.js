const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', ()=>{
    const apiKey = '5e097644731c0cd54d76d534ce3e5f3c';
    const city = document.querySelector('.search-box input').value;

    if(city == ''){
        alert("Enter a City Name");
    }else{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`).then((responce) => responce.json()).then((data) => {
            
            if(data.cod == '404'){
                console.log(data.cod);
                container.style.height ="460px";
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = "555px";
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');
            
            const img = document.querySelector('.weather-box img');
            const tempreture = document.querySelector('.weather-box .tempreture');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const windSpeed = document.querySelector('.weather-details .wind span');

            switch(data.weather[0].main) {
                case 'Mist':
                    img.src = 'images/mist.png';
                    break;
                case 'Clear':
                    img.src = 'images/clear.png'
                    break;
                case 'Cloud':
                    img.src = 'images/cloud.png';
                    break;
                case 'Rain':
                    img.src = 'images/rain.png';
                    break;
                case 'Snow':
                    img.src = 'images/snow.png'
                    break;
                default: img.src = 'images/cloud.png';
            }
            
            tempreture.innerHTML = `${parseInt(data.main.temp)} <span>°C</span>`;
            description.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            windSpeed.innerHTML =`${parseInt(data.wind.speed)}Km/h`;

        });
    }
})