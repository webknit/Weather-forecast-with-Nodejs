var https = require('https');
var http = require('http');
var APIkey = '1d74d695958f587d70e6cfee95d69210';


function printMsg(name, weather) {
  console.log('The weather in ' + name + ' is ' + weather);
}

function printError(response) {
  console.error(response.message);
}

// api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=1d74d695958f587d70e6cfee95d69210
// http://api.openweathermap.org/data/2.5/forecast/daily?q=London&APPID=1d74d695958f587d70e6cfee95d69210

function getProfile(id) {

  var request = http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + id + '&APPID=' + APIkey, function(response){
    var body = '';
    response.setEncoding('utf8');
    response.on('data', function(CHUNK) {
      body += CHUNK;
    });
    response.on('end', function(CHUNK) {
      if(response.statusCode === 200) {
        try {
          var parsed = JSON.parse(body);
          printMsg(parsed.city.name, parsed.list[1].weather[0].description);
        } catch(error) {
          printError(error);
        }
      }
      else {
        printError({message: 'There was an error for ' + username + ' (' + http.STATUS_CODES[response.statusCode] + ')'});
      }
    });
  });
  
  request.on('error', printError);
  
}

module.exports.get = getProfile;