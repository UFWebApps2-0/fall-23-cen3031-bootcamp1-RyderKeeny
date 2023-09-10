var http = require('http'),
    fs = require('fs'),
    port = 8080;

// Declare global variables for listing data and the server
var listingData, server; 

var requestHandler = function(request, response) { // Check if the request URL is '/listings' and the method is 'GET'
  // set the response status code to 200 and content type to JSON.
  //  Send the JSON representation of listingData to the client.
  if (request.url === '/listings' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(listingData));
  }
  
  else { // set the response status code to 404 and send error message to client.
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Bad Gateway - 404 Page Not Found');
  }
};

// Read the contents of 'listings.json' file using the 'fs.readFile' function
fs.readFile('listings.json', 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  // Parse the JSON data from 'listings.json' and store it in the listingData variable
  listingData = JSON.parse(data);

  // Create HTTP server requestHandler function
  server = http.createServer(requestHandler);

  // Start the server on the specified port
  server.listen(port, function() {
    console.log('Server listening on: http://127.0.0.1:' + port);
  });
});


console.log("is the server working properly?")

