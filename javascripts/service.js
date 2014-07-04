$(document).ready(function() {

	var options = {
  		enableHighAccuracy: true,
  		timeout: 10000,
  		maximumAge: 0
	};

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

	// Default-Sprache setzen
	if(localStorage.getItem('language') === null) {
		localStorage.setItem('language', 'de');
	}

	// Default-Position setzen
	if(localStorage.getItem('position') === null) {
		localStorage.setItem('position', null);
	}


	var getAddress = function(pos) {

		if (typeof pos !== 'undefined') {
			//window.crd = pos.coords;
			localStorage.setItem('position', JSON.stringify(pos.coords));
		}

		var crd = JSON.parse(localStorage.getItem('position'));

		//console.log(localStorage.getItem('pos'));
		//console.log(JSON.parse(localStorage.getItem('pos')));

		$('.js-current-position').text(crd.latitude + ' / ' + crd.longitude);

		$.ajax({
  			url: 'https://api.forecast.io/forecast/4cbf11a0b6a5166782b8d4cb9d5defef/' + crd.latitude + ',' + crd.longitude,
  			data: {
  			units: 'si'
  		},
  			dataType: 'jsonp',
  			success: function(data) {
	  			$('.js-temp').text(data.currently.apparentTemperature + '°C');
	  			$('.js-windsp').text(data.currently.windSpeed + 'm/s');
	      		$('.js-symbol').text(weatherIcons[data.currently.icon]);
  		}

  	});

		$.ajax({
  		url: 'https://maps.googleapis.com/maps/api/geocode/json',
	  		data: {
	  		latlng: crd.latitude + ',' + crd.longitude,
	  		language: localStorage['language'],
	  		sensor: true
  		},
  		success: function(data) {
  		$('.js-loc-address').text(data.results[0].formatted_address);
      	console.log(data);

  		}

  	});

	var address = $('input','.js-loc-search').val();

      $.ajax({
        url:'http://maps.googleapis.com/maps/api/geocode/json',
        data: {
          address: address,
          sensor: false
      },
        success: function(data) {
        console.log(data);
        $('.js-cusadd-result').text(
          data.results[0].geometry.location.lat +
          ',' +
          data.results[0].geometry.location.lng)
        $('.js-lat').text(data.results[0].geometry.location.lat);
        $('.js-long').text(data.results[0].geometry.location.lng);
        $('.js-loc').text(data.results[0].formatted_address);
        $('.js-acc').text(crd.accuracy +'m');

        $.ajax({
          url: 'https://api.forecast.io/forecast/4cbf11a0b6a5166782b8d4cb9d5defef/' + data.results[0].geometry.location.lat + ',' + data.results[0].geometry.location.lng,
          data: {
          units: 'si'
        },
          dataType: 'jsonp',
          success: function(data) {
        $('.js-temp').text.(data.currently.apparentTemperature + '°C');
        $('.js-windsp').text(data.currently.windSpeed + 'm/s');
        $('.js-icon').text(data.hourly.data[0].icon);
        }

        });
      }
    });

	};

	var error = function(err) {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	navigator.geolocation.getCurrentPosition(getAddress, error, options);

	$(document).on('change','.js-language',function(e) {
		
		//localStorage.getItem('');
		//localStorage.setItem('language') = $(this).val();

		localStorage['language'] = $(this).val();

		getAddress();
	});

	//$('.js-language option').val(localStorage.getItem('language'));

	$('.js-language option').each(function(){
		if ($(this).val() === localStorage.getItem('language')) {
			$(this).attr('selected',true);
		}
	})

});