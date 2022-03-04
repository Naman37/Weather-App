const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=df28b7c9a8469a9945baaf0dd4fe12ad&query=" +
    address;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to WeatherStack API service!", undefined);
    } else if (body.current) {
      callback(
        undefined,
        `The weather today shows ${body.current.weather_descriptions[0]}.`
      );
    } else {
      callback("Unable to access location", undefined);
    }
  });
};

module.exports = forecast;
