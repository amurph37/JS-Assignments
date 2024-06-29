document.getElementById('getWeather').addEventListener('click', function() {
    const zipCode = document.getElementById('zipCode').value;
    const apiKey = '52034dde8829b2266f7132ea8bc3eb48';

    // Get latitude and longitude from ZIP code
    const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(geoData => {
            if (geoData.lat && geoData.lon) {
                const latitude = geoData.lat;
                const longitude = geoData.lon;

                // Get weather data using latitude and longitude
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

                fetch(weatherUrl)
                    .then(response => response.json())
                    .then(weatherData => {
                        const date = new Date().toLocaleDateString();
                        const city = weatherData.name;
                        const temp = weatherData.main.temp;
                        const conditions = weatherData.weather[0].description;
                        const tempHigh = weatherData.main.temp_max;
                        const tempLow = weatherData.main.temp_min;

                        const weatherInfo = `
                            <p>Date: ${date}</p>
                            <p>City: ${city}</p>
                            <p>Temperature: ${temp} °F</p>
                            <p>Conditions: ${conditions}</p>
                            <p>High: ${tempHigh} °F / Low: ${tempLow} °F</p>
                        `;
                        document.getElementById('weatherResult').innerHTML = weatherInfo;
                    })
                    .catch(() => {
                        document.getElementById('weatherResult').textContent = 'Error retrieving weather data';
                    });
            } else {
                document.getElementById('weatherResult').textContent = 'Invalid ZIP code';
            }
        })
        .catch(() => {
            document.getElementById('weatherResult').textContent = 'Error retrieving location data';
        });
});
