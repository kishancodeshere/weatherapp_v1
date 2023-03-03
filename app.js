const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.CityName;
  const apiKey = "c5bc308117f5ea6c7d3909d3b86b0dec";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    ",ind&units=" +
    unit +
    "&appid=" +
    apiKey +
    "";
  https.get(url, function (response) {
    console.log(res.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      //   console.log(WeatherData);
      const temp = weatherData.main.temp;
      //   console.log(temp);
      // const StateName = weatherData.name;
      //   console.log(StateName);
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>Your City is " +
          query +
          " and State temperatures is " +
          temp +
          " </h1>"
      );

      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("app is Running in port 3000");
});
