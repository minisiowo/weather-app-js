const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
	// Pobieranie klucza API i wartości wpisanej przez użytkownika
	const APIKey = 'API KEY HERE';
	const city = document.querySelector('.search-box input').value;

	if (city === '') return;

	// Wywołanie API OpenWeather
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
	)
		.then(response => response.json())
		.then(json => {
			// Obsługa błędu 404
			if (json.cod === '404') {
				handleError();
				return;
			}

			// Ukrycie informacji o błędzie
			hideError();

			// Aktualizacja elementów HTML z danymi pogodowymi
			updateWeatherData(json);

			// Wyświetlenie elementów HTML z danymi pogodowymi
			showWeatherData();
		});
});

function handleError() {
	// Obsługa błędu 404
	container.style.height = '400px';
	weatherBox.style.display = 'none';
	weatherDetails.style.display = 'none';
	error404.style.display = 'block';
	error404.classList.add('fadeIn');
}

function hideError() {
	// Ukrycie informacji o błędzie
	error404.style.display = 'none';
	error404.classList.remove('fadeIn');
}

function updateWeatherData(json) {
	// Aktualizacja elementów HTML z danymi pogodowymi
	const image = document.querySelector('.weather-box img');
	const temperature = document.querySelector('.weather-box .temperature');
	const description = document.querySelector('.weather-box .description');
	const humidity = document.querySelector('.weather-details .humidity span');
	const wind = document.querySelector('.weather-details .wind span');

	switch (json.weather[0].main) {
		case 'Clear':
			image.src = 'images/clear.png';
			break;

		case 'Rain':
			image.src = 'images/rain.png';
			break;

		case 'Snow':
			image.src = 'images/snow.png';
			break;

		case 'Clouds':
			image.src = 'images/cloud.png';
			break;

		case 'Mist':
			image.src = 'images/mist.png';
			break;

		default:
			image.src = '';
	}

	temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
	description.innerHTML = `${json.weather[0].description}`;
	humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
	wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
}

function showWeatherData() {
	// Wyświetlenie elementów HTML z danymi pogodowymi
	weatherBox.style.display = '';
	weatherDetails.style.display = '';
	weatherBox.classList.add('fadeIn');
	weatherDetails.classList.add('fadeIn');
	container.style.height = '590px';
}
