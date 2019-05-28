var express = require("express");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose")

var app = express();
var router =  express.Router()
var db = require("./Models/index");
require("./Routes/apiroutes")(router);

var port =  process.env.PORT || 3000

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
app.set("view engine", "handlebars");

app.use(router);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/discussion";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.get("/all", function(req, res) {
  db.Article.find({}, function(error, found) {
  if (error) {
      console.log(error);
  }
  else {
      res.render("home");
  }
  });
});

app.get("/scrape", function (req, res) {
  
  axios.get("https://gamefaqs.gamespot.com/community").then(function(response) {

    var $ = cheerio.load(response.data)

    $("span.name").each(function(i, element) {

      var title = $(element).text();

      var link = "https://gamefaqs.gamespot.com" +$(element).children().attr("href");

      db.Article.create({
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
