var express = require("express");
var logger = require("morgan");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

var app = express();
var router =  express.Router()

var port =  process.env.PORT || 3000

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

var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db)


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
