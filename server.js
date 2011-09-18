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

/**
 * Displays New Exercise screen
 */
app.get("/exercises/new", function (req, res) {
    res.render(app.set("views") + "/exercises/new.jade", { exercise : new Model.ExerciseType() }); 
});

/**
 * Index of Exercises
 */
app.get("/exercises.:format?", function (req, res) {
    Model.ExerciseType.find({}, ['name'], function (err, docs) {
        if ( ! err) {
            switch (req.params.format) {
                case "json" :
                    res.send(docs);
                    break;

                // html
                default :
                    res.render(app.set("views") + "/exercises/index.jade", { exercises : docs }); 
                    break;
            }
        }
    });
});

/**
 * Display individual exercise
 */
app.get("/exercises/:id.:format?", function (req, res) {
    Model.ExerciseType.findById(req.params.id, function (err, doc) {
        switch (req.params.format) {
            case "json" :
                res.send(doc);
                break;

            // html
            default :
                res.render(app.set("views") + "/exercises/view.jade", { exercise : doc }); 
                break;
        }
    });
});


/**
 * Create an exercise
 */
app.post("/exercises.:format?", function (req, res) {
    var exerciseType = new Model.ExerciseType({
        name : req.body.exercise.name  
    });

    exerciseType.save(function (err) {
        switch (req.params.format) {
            case "json" :
                res.send(exerciseType._doc);
                break;

            // html
            default :
                res.redirect("/exercises");
                break;
        }
    });
});

/**
 * Update an exercise
 */
app.put("/exercises/:id.:format?", function (req, res) {
    Model.ExerciseType.findById(req.params.exercise.id, function (err, doc) {
        if ( ! err) {
            doc.name = req.exercise.name || doc.name;

            doc.save(function (err) {
                switch (req.params.format) {
                    case "json" :
                        res.send(exerciseType._doc);
                        break;

                    // html
                    default :
                        res.render(app.set("views") + "/exercises/edit.jade", { exercise : doc }); 
                        break;
                }
            });
        }
    });
});

/**
 * Delete an exercise
 */
app.del("/exercises/:id", function (req, res) {
    Model.ExerciseType.findById(req.params.exercise.id, function (err, doc) {
        if ( ! err) {
            doc.remove(function (err) {
                switch (req.params.format) {
                    case "json" :
                        res.send(doc);
                        break;

                    // html
                    default :
                        res.redirect("/exercises");
                        break;
                }
            });
        }
    });
});


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

