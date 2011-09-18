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

}
