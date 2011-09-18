/**
 * Welcome controller
 */
module.exports = function (app, Model) {

    app.get("/", function (req, res) {
        res.send("hello world");
    });

};
