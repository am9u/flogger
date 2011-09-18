var 

Model = require('./lib/models/models.js'),
express = require("express"),
app = express.createServer();

app.configure(function () {
    app.use(express.logger());

    app.use(express.methodOverride());
    app.use(express.bodyParser());

    app.set("views", __dirname + "/lib/views");

    app.use(express.static(__dirname + "/public"));

    Model.connect(process.env.NODE_ENV);
});

app.get("/", function (req, res) {
    res.send("hello world");
});

require("./lib/controllers/exercises.js")(app, Model);


/**
 * Displays New Workout screen
 */
app.get("/workouts/new", function (req, res) {
    Model.ExerciseType.find(function (err, docs) {
        if ( ! err) {
            res.render(app.set("views") + "/workouts/new.jade", { 
                workout : new Model.Workout(),
                exercises : docs
            }); 
        }
    });
});

/*
app.get("/exercises/populate", function (req, res) {

    var exercises = ["Pushup", "Crunch", "Squat", "Burpee"];

    exercises.forEach(function (el, i, arr) {
        var exercise = new Model.ExerciseType({ name : el });
        exercise.save();
    });

    res.send("populating");

});
//*/

if ( ! module.parent) {
    app.listen(3000);

    console.log("app listening on port 3000");
// expose for test suite
} else {
    exports.app = app;
}

