// Add an event listener to the button with the ID 'getWeather'
document.getElementById('getWeather').addEventListener('click', function() {
    // Get the ZIP code entered by the user
    const zipCode = document.getElementById('zipCode').value;
    // Your OpenWeatherMap API key
    const apiKey = '52034dde8829b2266f7132ea8bc3eb48';

    // URL to get latitude and longitude from the ZIP code using the OpenWeatherMap Geo API
    const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;

    // Fetch the geolocation data from the API
    fetch(geoUrl)
        .then(response => response.json()) // Parse the response as JSON
        .then(geoData => {
            // Check if latitude and longitude are available in the response
            if (geoData.lat && geoData.lon) {
                const latitude = geoData.lat; // Extract latitude
                const longitude = geoData.lon; // Extract longitude

                // URL to get weather data using the latitude and longitude from the OpenWeatherMap Weather API
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

                // Fetch the weather data from the API
                fetch(weatherUrl)
                    .then(response => response.json()) // Parse the response as JSON
                    .then(weatherData => {
                        const date = new Date().toLocaleDateString(); // Get the current date
                        const city = weatherData.name; // Extract the city name from the weather data
                        const temp = weatherData.main.temp; // Extract the current temperature
                        const conditions = weatherData.weather[0].description; // Extract weather conditions
                        const tempHigh = weatherData.main.temp_max; // Extract the high temperature
                        const tempLow = weatherData.main.temp_min; // Extract the low temperature

                        // Create a string with the weather information
                        const weatherInfo = `
                            <p>Date: ${date}</p>
                            <p>City: ${city}</p>
                            <p>Temperature: ${temp} °F</p>
                            <p>Conditions: ${conditions}</p>
                            <p>High: ${tempHigh} °F / Low: ${tempLow} °F</p>
                        `;

                        // Display the weather information in the element with the ID 'weatherResult'
                        document.getElementById('weatherResult').innerHTML = weatherInfo;
                    })
                    .catch(() => {
                        // Display an error message if there is an issue retrieving the weather data
                        document.getElementById('weatherResult').textContent = 'Error retrieving weather data';
                    });
            } else {
                // Display an error message if the ZIP code is invalid
                document.getElementById('weatherResult').textContent = 'Invalid ZIP code';
            }
        })
        .catch(() => {
            // Display an error message if there is an issue retrieving the location data
            document.getElementById('weatherResult').textContent = 'Error retrieving location data';
        });
});
