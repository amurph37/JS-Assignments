const express = require('express');
const bodyParser = require('body-parser');
const { FavoritePair } = require('./models');


const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
const PORT = 3000;

// Endpoint to save a favorite pair
app.post('/save-favorite', async (req, res) => {
    const { baseCurrency, targetCurrency } = req.body;
    try {
        const favoritePair = await FavoritePair.create({ baseCurrency, targetCurrency });
        res.status(201).json(favoritePair);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save favorite pair' });
    }
});

// Endpoint to get all favorite pairs
app.get('/favorites', async (req, res) => {
    try {
        const favorites = await FavoritePair.findAll();
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve favorite pairs' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
