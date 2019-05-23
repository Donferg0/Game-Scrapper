var express = require("express");
var logger = require("morgan");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  res.send("Hello world");
});


app.get("/all", function(req, res) {
  db.scrappedData.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

app.get("/scrape", function (req, res) {
  
      axios.get("https://gamefaqs.gamespot.com/community").then(function(response) {

        var $ = cheerio.load(response.data)

        $("span.name").each(function(i, element) {

          var title = $(element).text();

          var link = "https://gamefaqs.gamespot.com" +$(element).children().attr("href");

          db.scrappedData.insert({
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              console.log(err);
            } else {
              console.log(inserted)
            }
          })
        })
      })
})

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
