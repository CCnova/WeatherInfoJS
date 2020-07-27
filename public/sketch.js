function setup() {
  noCanvas();
  let lat, long;
  if ('geolocation' in navigator) {
    console.log('Geolocation is available!\nGetting user location...');
    navigator.geolocation.getCurrentPosition( async position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat, long);
      document.getElementById('latitude').textContent = `Latitude: ${lat}`;
      document.getElementById('longitude').textContent = `Longitude: ${long}`;

      const apiUrl = `/weather`;
      const response = await fetch(apiUrl);
      const jsonFormatReponse = response.json();
      console.log(jsonFormatReponse);
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