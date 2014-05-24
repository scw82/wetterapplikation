var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


function success(pos) {
  var crd = pos.coords;


  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');

  $('.js-lat').text(crd.latitude);
  $('.js-long').text(crd.longitude);
  $('.js-acc').text(crd.accuracy +'m');


  $.ajax({
  	url: 'https://api.forecast.io/forecast/4cbf11a0b6a5166782b8d4cb9d5defef/' + crd.latitude + ',' + crd.longitude,
  	data: {
  		units: 'si'
  	},
  	dataType: 'jsonp',
  	success: function(data) {
  		$('.js-temp').text(data.currently.apparentTemperature + '°C');
  		$('.js-windsp').text(data.currently.windSpeed + 'm/s');
  	}

  });

  $.ajax({
  	url: 'https://maps.googleapis.com/maps/api/geocode/json',
  	data: {
  		latlng: crd.latitude + ',' + crd.longitude,
  		sensor: true
  	},
  	success: function(data) {
  		$('.js-loc').text(data.results[0].formatted_address);
      console.log(data);

  	}

  });

  var output = document.getElementById("out");
  var img = new Image();
  img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + crd.latitude + "," + crd.longitude + "&zoom=13&size=400x400&sensor=true";

  output.appendChild(img);


};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);