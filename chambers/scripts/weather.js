const weatherSection = document.getElementById('weather');
const forecastSection = document.querySelector('.forecast');

const API_KEY = 'c39bfa0f99eec65be6af1447f0bdad3b';
const CITY = 'Lagos';
const COUNTRY = 'NG'; // Nigeria

// Weather Fetch
async function fetchWeather() {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`);
        if (!res.ok) throw new Error("Weather fetch failed");

        const data = await res.json();
        const current = data.list[0];

        // Current Weather
        const currentHTML = `
            <p>${CITY}</p>
            <p>Temperature: ${current.main.temp.toFixed(1)}°C</p>
            <p>${current.weather[0].description}</p>
        `;
        weatherSection.innerHTML += currentHTML;

        // Forecast (next 3 days, at 24hr intervals)
        const forecastDays = data.list.filter((item, index) => index % 8 === 0).slice(1, 4);
        let forecastHTML = '<ul>';
        forecastDays.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString();
            forecastHTML += `<li><strong>${date}</strong>: ${day.main.temp.toFixed(1)}°C</li>`;
        });
        forecastHTML += '</ul>';
        forecastSection.innerHTML += forecastHTML;

    } catch (error) {
        console.error("Weather API Error:", error);
        weatherSection.innerHTML += '<p>Unable to load weather data for Lagos.</p>';
    }
}

// Initialize
fetchWeather();
