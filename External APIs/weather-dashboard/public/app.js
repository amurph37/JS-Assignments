document.getElementById('weatherForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    console.log(`Requesting weather data for city: ${city}`);
    try {
        const response = await fetch(`/weather?city=${city}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Received weather data:', data);
        document.getElementById('weatherResult').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        document.getElementById('weatherResult').innerText = 'Error fetching weather data: ' + error.message;
    }
});
