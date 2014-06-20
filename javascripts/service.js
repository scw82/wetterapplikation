$(document).ready(function() {

	var options = {
  		enableHighAccuracy: true,
  		timeout: 10000,
  		maximumAge: 0
	};


	var getAddress = function(pos) {

		if (typeof pos !== 'undefined'){
			window.crd = pos.coords;
		}

		$('.js-current-position').text(crd.latitude + ' / ' + crd.longitude);

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

	};

	var error = function() {
		console.warn('ERROR(' + err.code + '): ' + err.message);
	};

	navigator.geolocation.getCurrentPosition(getAddress, error, options);

	$(document).on('change','.js-language',function(e) {
		console.log($(this).val());
		
		//localStorage.getItem('');
		//localStorage.setItem('language') = $(this).val();

		localStorage['language'] = $(this).val();

		getAddress();
	});

});