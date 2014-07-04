$(document).ready(function() {
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	// Weather icons
	var weatherIcons = {
		'clear-day': 'B',
		'clear-night': 'C',
		'rain': 'R',
		'snow': 'X',
		'sleet': 'W',
		'wind': 'S',
		'fog': 'M',
		'cloudy': 'N',
		'partly-cloudy-day': 'H',
		'partly-cloudy-night': 'I'
	};

	// Default Sprache einstellen
	if (localStorage.getItem('language') === null) {
		localStorage.setItem('language', 'de');
	}

	// Default position setzen
	if (localStorage.getItem('position') === null) {
		localStorage.setItem('position', null);
	}

	var getAddress = function(pos) {
		if (typeof pos !== 'undefined') {
			localStorage.setItem('position', JSON.stringify(pos.coords));
		}

		var crd = JSON.parse(localStorage.getItem('position'));

		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json',
			data: {
				latlng: crd.latitude + ',' + crd.longitude,
				sensor: true,
				language: localStorage['language']
			},
			success: function(data) {
				$('.js-current-address').text(data.results[0].formatted_address);
			}
		});

		$.ajax({
			url: 'https://api.forecast.io/forecast/a955df0e9afe8c822ebb3adf30265fb6/' + crd.latitude + ',' + crd.longitude,
			data: {
				units : 'si'
			},
			dataType: 'jsonp',
			success: function(data) {
				$('.js-current-weather').text(weatherIcons[data.currently.icon]);
				$('.js-temp').text(data.currently.temperature + '°');

				console.log(data);
			}
		});

		$('.js-current-position').text(crd.latitude + ', ' + crd.longitude);
	};

	var error = function(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	navigator.geolocation.getCurrentPosition(getAddress, error, options);

	$(document).on('change', '.js-language', function(e) {
		localStorage['language'] = $(this).val();

		getAddress();
	});

	$('.js-language').val(localStorage.getItem('language'));

	$('.js-custom-location').on('click', 'a', function(event) {
		event.preventDefault();

		var address = $('input', '.js-custom-location').val();

		$.ajax({
			url: 'http://maps.googleapis.com/maps/api/geocode/json',
			data: {
				address: address,
				sensor: false
			},
			success: function(data) {
				$('.js-custom-location-result').text(
					data.results[0].geometry.location.lat +
					', ' +
					data.results[0].geometry.location.lng
				);

				$('.js-custom-location-name').text(data.results[0].address_components[0].long_name);
				
				$.ajax({
			url: 'https://api.forecast.io/forecast/a955df0e9afe8c822ebb3adf30265fb6/' + data.results[0].geometry.location.lat + ',' + data.results[0].geometry.location.lng,
			data: {
				units : 'si'
			},
			dataType: 'jsonp',
			success: function(data) {
				$('.js-custom-weather').text(weatherIcons[data.currently.icon]);
			}
		});

				console.log(data);
			}
	});
});
});
