var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ExerciseTypeSchema = new Schema({
    name : String
}); 

var ExerciseSetSchema = new Schema({
    target_repetitions : Number,
    actual_repetitions : Number,
    completed : { type : Boolean, "default" : false }
});

var ExerciseSchema = new Schema({
    exercise : { type : ObjectId, ref : 'ExerciseType' },
    sets : [ExerciseSetSchema],
    note : String
});

var WorkoutSchema = new Schema({
    date : Date,
    exercises : [ExerciseSchema],
    note : String
});

exports.connect = function (env) {
   var dbName;

   env = env || "production";

   switch (env) {
        case "production":
            dbName = "fitness";
            break;

        case "test":
            dbName = "fitness-test";
            break;

        case "development":
        default:
            dbName = "fitness-dev";
            break;

   }
   
   mongoose.connect("mongodb://localhost/" + dbName);
};

exports.ExerciseType = mongoose.model("ExerciseType", ExerciseTypeSchema);
exports.Set = mongoose.model("ExerciseSet", ExerciseSetSchema);
exports.Exercise = mongoose.model("Exercise", ExerciseSchema);
exports.Workout = mongoose.model("Workout", WorkoutSchema);

