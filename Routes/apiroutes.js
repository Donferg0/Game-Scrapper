module.exports = function(router) {
    router.get("/", function(req, res) {
        res.render("home");
    });
    
    router.get("/discussions", function(req, res) {
        res.render("articles");
    });
}