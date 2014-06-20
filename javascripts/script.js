var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

var weatherIcons = {
  'clear-day': 'B',
  'clear-night': 'C',
  'rain': 'R'
}


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
      $('.js-symbol').text(weatherIcons[data.currently.icon]);
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

  //http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false

  $('.js-custom-address').on('click','a', function(event){
      event.preventDefault();

      var address = $('input','.js-custom-address').val();

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
        $('.js-temp').text(data.currently.apparentTemperature + '°C');
        $('.js-windsp').text(data.currently.windSpeed + 'm/s');
        $('.js-icon').text(data.hourly.data[0].icon);
        }

        });
      }
    });
  });


  var output = document.getElementById("out");
  var img = new Image();
  img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + crd.latitude + "," + crd.longitude + "&zoom=13&size=400x400&sensor=true";

  output.appendChild(img);


};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

var getWeatherData = function(lat, lng, callback) {
  $.ajax({
          url: 'https://api.forecast.io/forecast/4cbf11a0b6a5166782b8d4cb9d5defef/' + lat + ',' + lng,
          data: {
            units: 'si'
          },
          dataType: 'jsonp',
          success: function(data) {
            callback(data);
          }

        });
}

navigator.geolocation.getCurrentPosition(success, error, options);


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
          url: 'https://api.forecast.io/forecast/4cbf11a0b6a5166782b8d4cb9d5defef/' + lat + ',' + lng,
          data: {
            units: 'si'
          },
          dataType: 'jsonp',
          success: function(data) {
            $('.js-temp-paulo').text(data.currently.summary + ' ' + data.currently.temperature + 'C°');
          }

        });

    }

  });

$.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    data: {
          address: 'Rio de Janeiro',
          sensor: false
    },
    success: function(data) {
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;

      $.ajax({
          url: 'https://api.forecast.io/forecast/4cbf11a0b6a5166782b8d4cb9d5defef/' + lat + ',' + lng,
          data: {
            units: 'si'
          },
          dataType: 'jsonp',
          success: function(data) {
            $('.js-temp-janeiro').text(data.currently.summary + ' ' + data.currently.temperature + 'C°');
          }

        });

    }

  });



