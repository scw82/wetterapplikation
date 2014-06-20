$(document).ready(function() {

	var options = {
  		enableHighAccuracy: true,
  		timeout: 10000,
  		maximumAge: 0
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