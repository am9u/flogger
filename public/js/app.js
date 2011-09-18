
(function (window, document, $, _, Backbone) {

_.templateSettings = {
   interpolate : /\{\{(.+?)\}\}/g
 };
    

window.ExerciseType = Backbone.Model.extend({});

window.ExerciseTypes = Backbone.Collection.extend({
    Model : window.ExerciseType,
    url : "/exercises.json"
});

window.Exercises = new ExerciseTypes();

window.ExerciseTypeRow = Backbone.View.extend({
    tagName : "option",

    //template : _.template($("#tpl-exercise-type-row").html()),

    initialize : function () {
        //this.template = _.template($("#tpl-exercise-type-row").html());
        _.bindAll(this, "render");
    },

    render : function () {
        console.log(this.model.get("name"));
        /*
        $(this.el).html(this.template({
            label : this.model.get("name"),
            value : this.model.get("_id")
        }));
        */
        this.el = this.make("option", { value : this.model.get("_id") }, this.model.get("name"));
        return this;
    }
});

window.ExerciseTypeList = Backbone.View.extend({
    Collection : ExerciseType,

    tagName : "select",
    className : "chosen chzn-select",

    //template : _.template($("#tpl-exercise-type-row").html()),

    initialize : function () {
        _.bindAll(this, "render");
        //this.Collection.bind("refresh", this.render); // error in mobile safari?
    },

    render : function (exercises) {
        var element = $(this.el);

        exercises.each(function (exercise) {
            exercise.rowView = new ExerciseTypeRow({ model : exercise });
            element.append(exercise.rowView.render().el);
        });

        element.attr("data-placeholder", "Select Exercise...");

        return this;
    }
});

window.ExerciseRow = Backbone.View.extend({

    tagName : "div",

    initialize : function () {
        _.bindAll(this, "render");
    },

    render : function () {
        var exerciseTypeList = new ExerciseTypeList().render(Exercises).el,
            exerciseCell = $("<div />", { "class" : "col-exercise-list" }).append(exerciseTypeList),
            
            targetMinRepsCell = $("<div />", { "class" : "col-target-reps" }),
            targetMinRepsField = $("<input />", { 
                "class" : "field-reps",
                name : "target_min_reps"
            }).appendTo(targetMinRepsCell),

            targetMaxRepsCell = $("<div />", { "class" : "col-target-reps" }),
            targetMaxRepsField = $("<input />", { 
                "class" : "field-reps",
                name : "target_max_reps"
            }).appendTo(targetMaxRepsCell),

            actualMinRepsCell = $("<div />", { "class" : "col-actual-reps" }),
            actualMinRepsField = $("<input />", { 
                "class" : "field-reps",
                name : "actual_min_reps"
            }).appendTo(actualMinRepsCell),

            actualMaxRepsCell = $("<div />", { "class" : "col-actual-reps" }),
            actualMaxRepsField = $("<input />", { 
                "class" : "field-reps",
                name : "actual_max_reps"
            }).appendTo(actualMaxRepsCell);


        $(this.el)
            .append(exerciseCell)
            .append(targetMinRepsCell)
            .append(targetMaxRepsCell)
            .append(actualMinRepsCell)
            .append(actualMaxRepsCell);

        //$(exerciseTypeList).chosen();

        return this;
    }
});

$("#btn-add-exercise").live("click", function (event) {
    $("#exercises").append(new ExerciseRow().render().el);
});

$(function () {
    $("#exercises").append(new ExerciseRow().render().el);
});

//ExerciseTypes.fetch();

window.AddExerciseView = Backbone.View.extend({

});

}(this, this.document, this.jQuery, this._, this.Backbone));

