function setup() {
  noCanvas();
  let lat, long;
  if ('geolocation' in navigator) {
    console.log('Geolocation is available!\nGetting user location...');
    navigator.geolocation.getCurrentPosition( async position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      
      const apiUrl = `/weather/${long},${lat}`;
      const response = await fetch(apiUrl);
      const jsonFormatReponse = await response.json();
      console.log(jsonFormatReponse);
      
      const precipitation = document.getElementById('precipitation');
      const rating = document.getElementById('precipRating');
      
      const airQ = jsonFormatReponse.airQuality.results[0].measurements[0];
      
      
      precipitation.textContent = jsonFormatReponse.weather.precipitation_type.value;
      rating.textContent = jsonFormatReponse.weather.precipitation.value;

      document.getElementById('latitude').textContent = `Latitude: ${lat}`;
      document.getElementById('longitude').textContent = `Longitude: ${long}`;
      document.getElementById('aqParameter').textContent = airQ.parameter;
      document.getElementById('aqValue').textContent = airQ.value;
      document.getElementById('aqUnits').textContent = airQ.unit;
      document.getElementById('aqDate').textContent = airQ.lastUpdated;
    });
  } else {
    console.log('Geolocation is not available!\nCan not get user location');
  }

  const btn = document.getElementById('submit');
  btn.addEventListener('click', async evResult => {
    const locationData = { lat, long };
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(locationData)
    }

    const response = await fetch('/api', options);
    const jsonResponse = await response.json();

    console.log(jsonResponse);
  });

}