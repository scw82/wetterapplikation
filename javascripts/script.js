var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night

var weatherIcons = {
	'clear-day': 'B',
	'clear-night': 'C',
	'rain': 'R',
	'partly-cloudy-night': 'I',
	'partly-cloudy-day': 'H'
};

function success(pos) {
	var crd = pos.coords;

	$('.js-lat').text(crd.latitude);
	$('.js-long').text(crd.longitude);
	$('.js-acc').text(crd.accuracy + ' m');

	$.ajax({
		url: 'https://maps.googleapis.com/maps/api/geocode/json',
		data: {
			latlng: crd.latitude + ',' + crd.longitude,
			sensor: true
		},
		success: function(data) {
			$('.js-address').text(data.results[0].formatted_address);
		}
	});

	getWeahterData(crd.latitude, crd.longitude, function(data) {
		$('.js-temp').text(data.currently.apparentTemperature + ' °C');
		$('.js-windspeed').text(data.currently.windSpeed + ' m/s');

		$('.js-weather-icon').text(weatherIcons[data.currently.icon]);
	});
}

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
}

navigator.geolocation.getCurrentPosition(success, error, options);

// http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false

$('.js-custom-address').on('click', 'a', function(event) {
	event.preventDefault();

	var address = $('input', '.js-custom-address').val();

	$.ajax({
		url: 'http://maps.googleapis.com/maps/api/geocode/json',
		data: {
			address: address,
			sensor: false
		},
		success: function(data) {
			$('.js-custom-address-result').text(
				data.results[0].geometry.location.lat +
				',' +
				data.results[0].geometry.location.lng
			);

			getWeahterData(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng, function(data) {
				$('.js-custom-address-temp').text(data.currently.apparentTemperature + ' °C');

				$('.js-custom-weather-icon').text(weatherIcons[data.currently.icon]);
			});
		}
	});
});

var getWeahterData = function(lat, lng, callback) {
	$.ajax({
		url: 'https://api.forecast.io/forecast/a955df0e9afe8c822ebb3adf30265fb6/' + lat + ',' + lng,
		data: {
			units : 'si'
		},
		dataType: 'jsonp',
		success: function(data) {
			callback(data);
		}
	});
};

$.ajax({
	url: 'https://maps.googleapis.com/maps/api/geocode/json',
	data: {
		address: 'Manaus',
		sensor: false
	},
	success: function(data) {
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;

		$.ajax({
			url: 'https://api.forecast.io/forecast/a955df0e9afe8c822ebb3adf30265fb6/' + lat + ',' + lng,
			data: {
				units : 'si'
			},
			dataType: 'jsonp',
			success: function(data) {
				$('.js-weather-manaus').text(data.currently.summary + ' (' + data.currently.temperature + '°C)');
			}
		});
	}
});

$.ajax({
	url: 'https://maps.googleapis.com/maps/api/geocode/json',
	data: {
		address: 'Sao Paulo',
		sensor: false
	},
	success: function(data) {
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;

		$.ajax({
			url: 'https://api.forecast.io/forecast/a955df0e9afe8c822ebb3adf30265fb6/' + lat + ',' + lng,
			data: {
				units : 'si'
			},
			dataType: 'jsonp',
			success: function(data) {
				$('.js-weather-sao-paulo').text(data.currently.summary + ' (' + data.currently.temperature + '°C)');
			}
		});
	}
});
