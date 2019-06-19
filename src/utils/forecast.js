const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `https://api.darksky.net/forecast/1a14f8eed70e86b8e6a41540f0d6421f/${encodeURIComponent(
    lat
  )},${encodeURIComponent(lon)}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const result = {
        temperature: body.currently.temperature,
        precip: body.currently.precipProbability,
        summary: body.hourly.summary,
        apparentTemp: body.currently.apparentTemperature,
        windSpeed: body.currently.windSpeed,
        visibility: body.currently.visibility
      };
      callback(undefined, {
        forecast: `${result.summary} It is currently ${
          result.temperature
        } degrees centigrade out, and it feels like ${
          result.apparentTemp
        } degrees centigrade. The wind speed is ${
          result.windSpeed
        }mph, and there is a ${
          result.precip
        }% chance of rain. We can see things clearly within ${
          result.visibility
        } miles.`
      });
    }
  });
};

module.exports = forecast;
