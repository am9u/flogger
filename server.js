// define modules
var Model = require('./lib/models/models.js'),
express = require("express"),
app = express.createServer();

// configure app
app.configure(function () {
    app.use(express.logger());

    app.use(express.methodOverride());
    app.use(express.bodyParser());

    app.set("views", __dirname + "/lib/views");

    app.use(express.static(__dirname + "/public"));

    Model.connect(process.env.NODE_ENV);
});

// bootstrap controllers
require("./lib/controllers/welcome.js")(app, Model);
require("./lib/controllers/exercises.js")(app, Model);
require("./lib/controllers/workouts.js")(app, Model);

// start application
if ( ! module.parent) {
    app.listen(3000);
    console.log("app listening on port 3000");

// expose for test suite
} else {
    exports.app = app;
}

