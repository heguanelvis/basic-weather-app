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
        summary: body.hourly.summary
      };
      callback(undefined, {
        forecast: `${result.summary} It is currently ${
          result.temperature
        } degrees Celsius out. There is a ${result.precip}% chance of rain.`
      });
    }
  });
};

module.exports = forecast;
