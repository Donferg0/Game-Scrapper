var article = require("../Models/article")

module.exports = {
    delete: function(query, cb) {
        article.remove(query, cb)
    },
    
    get: function(query,  cb) {
        article.find({})
    }  

}