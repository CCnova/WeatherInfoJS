const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();


const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', ( request, response ) => {
  database.find({}, ( err, data ) => {
    if ( err ) {
      response.end();
      console.log(err);
      return;
    }
    response.json(data);
  });
});

app.post('/api', ( request, response ) => {
  console.log('Got a request!');
  const data = request.body;
  console.log(data);
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get('/weather/:longlat', async (request, response) => {
  const userLocation = request.params.longlat.split(',');
  const longitude = userLocation[0];
  const latitude = userLocation[1]; 
  const weatherUrl = `https://api.climacell.co/v3/weather/realtime?lat=${latitude}&lon=${longitude}&unit_system=si&apikey=${process.env.API_KEY}`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherJsonFormatRes = await weatherResponse.json();

  const airQUrl = `https://api.openaq.org/v1/latest?coordinates=40.73,-73.99`; // You can put your Longitude and latitude on this url in coordinates
  const airQResponse = await fetch(airQUrl);
  const airQJsonFormatRes = await airQResponse.json();

  const data = {
    weather: weatherJsonFormatRes,
    airQuality: airQJsonFormatRes
  }

  response.json(data);
});