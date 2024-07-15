// Add an event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    
    // Get references to the necessary DOM elements
    const baseCurrencySelect = document.getElementById('base-currency');
    const targetCurrencySelect = document.getElementById('target-currency');
    const amountInput = document.getElementById('amount');
    const convertedAmountDisplay = document.getElementById('converted-amount');
    const historicalRatesBtn = document.getElementById('historical-rates');
    const historicalRatesContainer = document.getElementById('historical-rates-container');
    const saveFavoriteBtn = document.getElementById('save-favorite');
    const favoritePairsContainer = document.getElementById('favorite-currency-pairs');

    // API key and URL for the currency API
    const API_KEY = "fca_live_lzQbWFlGZ5LCQ3bDUlUCjR0pMsgGBFpS8DiILgv8";
    const API_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_lzQbWFlGZ5LCQ3bDUlUCjR0pMsgGBFpS8DiILgv8";

    // Function to fetch available currencies
    function fetchCurrencies() {
        fetch(`${API_URL}/currencies`, {
            method: 'GET',
            headers: {
                'apikey': API_KEY
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            populateCurrencySelects(data.data);
        })
        .catch(error => console.error('Error fetching currencies:', error));
    }

    // Function to populate currency dropdowns with available currencies
    function populateCurrencySelects(currencies) {
        for (let currency in currencies) {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            baseCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            targetCurrencySelect.appendChild(option2);
        }
    }

    // Function to fetch exchange rates for a given base currency
    function fetchExchangeRates(baseCurrency) {
        fetch(`${API_URL}/latest?base_currency=${baseCurrency}&currencies=EUR,USD,CAD,AUD,BGN,BRL,CAD,CHF,CNY,CZK,DKK`, {
            method: 'GET',
            headers: {
                'apikey': API_KEY
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            updateConvertedAmount(data.data);
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            convertedAmountDisplay.textContent = 'Error fetching data';
        });
    }

    // Function to update the displayed converted amount based on the fetched exchange rates
    function updateConvertedAmount(rates) {
        const amount = parseFloat(amountInput.value);
        const rate = rates[targetCurrencySelect.value];
        if (isNaN(amount) || amount <= 0) {
            convertedAmountDisplay.textContent = 'Enter a valid amount';
            return;
        }
        if (rate) {
            const convertedAmount = amount * rate;
            convertedAmountDisplay.textContent = convertedAmount.toFixed(2);
        } else {
            convertedAmountDisplay.textContent = 'Rate not available';
        }
    }

    // Function to fetch historical exchange rates for a specific date
    function fetchHistoricalRates(baseCurrency, targetCurrency, date) {
        fetch(`${API_URL}/historical?base_currency=${baseCurrency}&date=${date}&currencies=${targetCurrency}`, {
            method: 'GET',
            headers: {
                'apikey': API_KEY
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayHistoricalRates(data.data, date);
        })
        .catch(error => {
            console.error('Error fetching historical rates:', error);
            historicalRatesContainer.textContent = 'Error fetching historical rates';
        });
    }

    // Function to display the fetched historical exchange rates
    function displayHistoricalRates(rates, date) {
        const rate = rates[targetCurrencySelect.value];
        if (rate) {
            historicalRatesContainer.textContent = `Historical exchange rate on ${date}: 1 ${baseCurrencySelect.value} = ${rate} ${targetCurrencySelect.value}`;
        } else {
            historicalRatesContainer.textContent = `Rate not available for ${date}`;
        }
    }

    // Function to save the selected currency pair to the server
    function saveFavoritePair() {
        const baseCurrency = baseCurrencySelect.value;
        const targetCurrency = targetCurrencySelect.value;

        // Save favorite pair to the server
        fetch('http://localhost:3000/save-favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ baseCurrency, targetCurrency })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Favorite pair saved:', data);
            displayFavoritePairs();
        })
        .catch(error => console.error('Error saving favorite pair:', error));
    }

    // Function to display the saved favorite currency pairs from the server
    function displayFavoritePairs() {
        favoritePairsContainer.innerHTML = '';

        // Fetch favorite pairs from the server
        fetch('http://localhost:3000/favorites')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(favorites => {
            favorites.forEach(pair => {
                const button = document.createElement('button');
                button.textContent = `${pair.baseCurrency}/${pair.targetCurrency}`;
                button.addEventListener('click', () => {
                    baseCurrencySelect.value = pair.baseCurrency;
                    targetCurrencySelect.value = pair.targetCurrency;
                    fetchExchangeRates(pair.baseCurrency);
                });
                favoritePairsContainer.appendChild(button);
            });
        })
        .catch(error => console.error('Error fetching favorite pairs:', error));
    }

    // Add event listeners for user interactions
    baseCurrencySelect.addEventListener('change', () => fetchExchangeRates(baseCurrencySelect.value));
    targetCurrencySelect.addEventListener('change', () => fetchExchangeRates(baseCurrencySelect.value));
    amountInput.addEventListener('input', () => updateConvertedAmount(baseCurrencySelect.value));
    historicalRatesBtn.addEventListener('click', () => {
        const date = prompt('Enter a date (YYYY-MM-DD):', '2021-01-01');
        if (date) {
            fetchHistoricalRates(baseCurrencySelect.value, targetCurrencySelect.value, date);
        }
    });
    saveFavoriteBtn.addEventListener('click', saveFavoritePair);

    // Initialize the application by fetching currencies and displaying favorite pairs
    fetchCurrencies();
    displayFavoritePairs();
});

