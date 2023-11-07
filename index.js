// Load environment variables from .env file
require('dotenv').config();

// Import Express module and create an Express application
const express = require('express');
const app = express();

// Declare the homepage route
app.get('/', function (req, res) {
    // Send an HTML response with a white background and NAV BAR for the homepage
    res.send(`
        <body style="margin: 0;">
            <div style="border: 1px solid black; height: 10vh; background-color: white;">
                <h2 style="text-align: center;">NAV BAR</h2>
            </div>
            <h1>White Page</h1>
        </body>
    `);
});

// Declare the /teal route
app.get('/teal', function (req, res) {
    // Send an HTML response with a teal background and NAV BAR for the teal page
    // This route should be removed as it is a duplicate and conflicts with the one defined below
    res.send(`
        <body style="margin: 0; background-color: teal;">
            <div style="border: 1px solid black; height: 10vh; background-color: white;">
                <h2 style="text-align: center;">NAV BAR</h2>
            </div>
            <h1>Teal Page</h1>
        </body>
    `);
});

// Listen on the port defined in the .env or default to 3000
const PORT = process.env.PORT || 3000;
// Start the server and log the port number to the console
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Teal Page route - this is a duplicate and should be removed as well
app.get('/teal', function (req, res) {
    // Send an HTML response with a teal NAV BAR and the text color set to teal for the Teal Page
    // This block is not needed since it duplicates the '/teal' route above
    res.send(`
        <body style="margin: 0;">
            <div style="border: 1px solid black; height: 10vh; background-color: teal;">
                <h2 style="text-align: center;">NAV BAR</h2>
            </div>
            <h1 style="color: teal;">Teal Page</h1>
        </body>
    `);
});

// Import the 'path' module to work with file and directory paths
const path = require('path');
// Serve the index.html file on the homepage route
app.get('/', function (req, res) {
  // Send the index.html file to the client when they access the homepage
  res.sendFile(path.join(__dirname, 'index.html'));
});

// The following block should be placed where the first '/teal' route is defined to avoid duplication
// Define an array of popular colors and their names
const colors = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Green', hex: '#008000' },
  // ... [rest of the colors] ...
];

// Iterate over each color to create a route for each one
colors.forEach(color => {
  app.get(`/${color.name.toLowerCase()}`, function (req, res) {
    // Send an HTML response with the background and text color set to the current color for each page
    res.send(`
      <body style="margin: 0; background-color: ${color.hex};">
        <div style="border: 1px solid black; height: 10vh; background-color: white;">
          <h2 style="text-align: center;">NAV BAR</h2>
        </div>
        <h1 style="color: ${color.hex};">${color.name} Page</h1>
      </body>
    `);
  });
});
