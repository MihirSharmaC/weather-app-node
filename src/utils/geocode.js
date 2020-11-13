const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidGhlbm9tYWRpY2JvdCIsImEiOiJja2hnZWpqOHgwY280MnhvOW9zNXdqbGlmIn0.on1JJ2e_6DzgdYP48bf7qw`;
  request({ url, json: true }, (err, res) => {
    try {
      if (res.body.features.length === 0) {
        callback("No such location found", undefined);
      } else {
        const lat = res.body.features[0].geometry.coordinates[1];
        const long = res.body.features[0].geometry.coordinates[0];
        const location = res.body.features[0].place_name;
        callback(undefined, { lat, long, location });
      }
    } catch {
      callback("Unable to connect to location services", res);
    }
  });
};

module.exports = geocode;
