// const cheerio = require("cheerio");
// const axios = require("axios");
// const db = require("../models");


// app.get("/scrape", function (req, res) {
  
//     axios.get("https://gamefaqs.gamespot.com/community").then(function(response) {
  
//       var $ = cheerio.load(response.data)
  
//       $("span.name").each(function(i, element) {
  
//         var title = $(element).text();
  
//         var link = "https://gamefaqs.gamespot.com" +$(element).children().attr("href");
  
//         db.Article.create({
//           title: title,
//           link: link
//         },
//         function(err, inserted) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(inserted)
//           }
//         })
//       })
//     })
//   })