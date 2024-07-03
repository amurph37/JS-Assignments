// Import the Express module and third-party middleware
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Create an instance of the Express application
const app = express();

// Use Morgan to log requests to the console
app.use(morgan('dev'));

// Use Body-Parser to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up basic routes
// Root route
app.get('/', (req, res) => {
  res.send('Hello, welcome to my Express server!');
});

// About route
app.get('/about', (req, res) => {
  res.send('This is a simple Express server configured with middleware.');
});

// Handle non-existent routes
app.use((req, res, next) => {
  res.status(404).send('Sorry, the page you are looking for does not exist.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Configure the server to listen on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
