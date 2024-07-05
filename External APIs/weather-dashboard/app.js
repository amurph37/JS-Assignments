const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3008;
const API_KEY = 'daee3548a9msh816a82847071757p1a6329jsnc8585fb2341a'; // Replace with your OpenWeatherMap API key

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const corsOptions = {
   origin: '*', 
   credentials: true, // access-control-allow-credentials:true
   optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    console.log(`Received request for city: ${city}`);
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        console.log('Weather API response:', response.data);
        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            city: response.data.name,
            country: response.data.sys.country,
        };
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).json({ message: error.message || 'Error fetching weather data' });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
