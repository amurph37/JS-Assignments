const http = require('http');

// Define a port to listen on
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
    
  // Handle different routes
  if (req.url === '/' && req.method === 'GET') {

    // Respond with a simple HTML page
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Welcome to the Home Page!</h1></body></html>');
  } else if (req.url === '/api' && req.method === 'GET') {

    // Respond with a JSON object
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello, world!' }));

  } else {
    // Handle other routes with an error message
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page Not Found');
  }
});
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
