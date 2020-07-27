function setup() {
  noCanvas();
  let lat, long;
  if ('geolocation' in navigator) {
    console.log('Geolocation is available!\nGetting user location...');
    navigator.geolocation.getCurrentPosition( async position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      document.getElementById('latitude').textContent = `Latitude: ${lat}`;
      document.getElementById('longitude').textContent = `Longitude: ${long}`;

      const apiUrl = `/weather/${long},${lat}`;
      const response = await fetch(apiUrl);
      const jsonFormatReponse = await response.json();
      console.log(jsonFormatReponse);

      const precipitation = document.getElementById('precipitation');
      const rating = document.getElementById('precipRating');
      precipitation.textContent = jsonFormatReponse.weather.precipitation_type.value;
      rating.textContent = jsonFormatReponse.weather.precipitation.value;
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