//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("postman-request");

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d19c6be85069a13dc9446233384f489a&query=${lat},${long}`;

  request({ url, json: true }, (err, res) => {
    try {
      if (res.success) {
        callback("Request Failed : no coords");
      } else {
        loc = res.body.location.name;
        weather = res.body.current;
        callback(undefined, {
          loc,
          weather,
        });
      }
    } catch {
      callback("Request failed");
    }
  });
};

module.exports = forecast;
