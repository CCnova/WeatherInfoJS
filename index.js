const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');

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
  const API_KEY = 'q9iZNUOtj55fEKdYDWu0gMWjvDIkd8kS'; // Add your own API Key

  const fetchResponse = await fetch(`https://api.climacell.co/v3/weather/nowcast?lat=${latitude}&lon=${longitude}&unit_system=si&timestep=5&start_time=now&apikey=${API_KEY}`);
  const jsonFormatRes = await fetchResponse.json();
  response.json(jsonFormatRes);
});