// OpenWeatherMap API key
const apikey = "58d8924c0ba4a537776da5e553770023";

// Get HTML elements by ID
const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");

// Get the form element
const formEl = document.querySelector("form");

// Event listener for form submission
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    // Call the function to get weather information
    getWeatherInfo(cityValue);
});

// Asynchronous function to fetch weather information
async function getWeatherInfo(cityValue) {
    // Try and catch method is used to handle errors
    try {
        const reply = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        if (!reply.ok) {
            throw new Error("Network response error");
        }
        // Parse the JSON response
        const data = await reply.json();

        // Extract relevant weather information from the response
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Pressure : ${Math.round(data.main.pressure)}Pa`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ];

        // Update HTML elements with weather information
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = details
            .map((detail) => `<div>${detail}</div>`)
            .join("");
    } catch (error) {
        // Handle errors by displaying a message
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent =
            "An Error has occurred. Please try again later.";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}
