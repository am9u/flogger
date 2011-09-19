/**
 * Workouts controller
 */
module.exports = function (app, Model) {

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

    /**
     * Index of Workouts
     */
    app.get("/workouts.:format?", function (req, res) {
        Model.Workout.find({}, ['name'], function (err, docs) {
            if ( ! err) {
                switch (req.params.format) {
                    case "json" :
                        res.send(docs);
                        break;

                    // html
                    default :
                        res.render(app.set("views") + "/workouts/index.jade", { workouts : docs }); 
                        break;
                }
            }
        });
    });

    /**
     * Display individual exercise
     */
    app.get("/workouts/:id.:format?", function (req, res) {
        Model.Workout.findById(req.params.id, function (err, doc) {
            switch (req.params.format) {
                case "json" :
                    res.send(doc);
                    break;

                // html
                default :
                    res.render(app.set("views") + "/workouts/view.jade", { exercise : doc }); 
                    break;
            }
        });
    });


    /**
     * Create an exercise
     */
    app.post("/workouts.:format?", function (req, res) {
        var exerciseType = new Model.Workout({
            name : req.body.exercise.name  
        });

        exerciseType.save(function (err) {
            switch (req.params.format) {
                case "json" :
                    res.send(exerciseType._doc);
                    break;

                // html
                default :
                    res.redirect("/workouts");
                    break;
            }
        });
    });

    /**
     * Update an exercise
     */
    app.put("/workouts/:id.:format?", function (req, res) {
        Model.Workout.findById(req.params.workout.id, function (err, doc) {
            if ( ! err) {
                doc.name = req.exercise.name || doc.name;

                doc.save(function (err) {
                    switch (req.params.format) {
                        case "json" :
                            res.send(exerciseType._doc);
                            break;

                        // html
                        default :
                            res.render(app.set("views") + "/workouts/edit.jade", { exercise : doc }); 
                            break;
                    }
                });
            }
        });
    });

    /**
     * Delete an exercise
     */
    app.del("/workouts/:id", function (req, res) {
        Model.Workout.findById(req.params.exercise.id, function (err, doc) {
            if ( ! err) {
                doc.remove(function (err) {
                    switch (req.params.format) {
                        case "json" :
                            res.send(doc);
                            break;

                        // html
                        default :
                            res.redirect("/workouts");
                            break;
                    }
                });
            }
        });
    });

}
