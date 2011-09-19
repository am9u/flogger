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
        //console.log(this.model.get("name"));
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

window.ExerciseSetRow = Backbone.View.extend({

    tagName : "table",
    className : "table-exercise-sets",

    initialize : function () {
        if ( ! this.template) {
            this.template = $("#tpl-exercise-set").html();
        }
    },

    render : function () {
        $(this.el).append(this.template); 
        return this;
    }

});

window.ExerciseRow = Backbone.View.extend({

    tagName : "div",

    events : {
        "click .btn-add-exercise-set" : "addExerciseSet"
    },

    initialize : function () {
        _.bindAll(this, "render");

        if ( ! this.template) {
          this.template = $("#tpl-add-exercise").html();
        } 
    },

    render : function () {

        var el = $(this.el).html(this.template);

        el.find(".col-exercise-list")
            .append(new ExerciseTypeList().render(Exercises).el);

        this.addExerciseSet();

        return this;
    },

    addExerciseSet : function () {
        $(this.el).find(".exercise-sets-container")
            .append(new ExerciseSetRow().render().el);
    }
});

window.AddExerciseView = Backbone.View.extend({
    tagName : "div",
    className : "page-view hide",

    events : {
        "click .btn-cancel" : "hide"
    },

    initialize : function () {
        if ( ! this.template) {
            this.template = $("#tpl-page-add-exercise").html();
        }
    },

    render : function (container) {
        $(this.el)
            .html(this.template)
            .find(".panel").append(new ExerciseRow().render().el);

        container.append(this.el);

        this.trigger("render");
        return this;
    },

    show : function () {
        console.log("show called");
        $(this.el)
            .removeClass("hide");
    },

    hide : function () {
        $(this.el)
            .addClass("hide");

        var onHideEnd = _.bind(function (event) {
            if (event.propertyName === "top") {
                this.el.removeEventListener("webkitTransitionEnd", onHideEnd);
                $(this.el).remove();
            }
        }, this);

        this.el.addEventListener("webkitTransitionEnd", onHideEnd);
    }
});

window.AppView = Backbone.View.extend({
    events : {
        "click #btn-add-exercise" : "displayAddExercise"
    },

    initialize : function () {},

    displayAddExercise : function () {
        var addExercise = new AddExerciseView();
        addExercise.bind("render", function () {
            var show = _.bind(this.show, this);
            _.delay(show, 10);
        }, addExercise);
        addExercise.render($("#app-view"));
    }
});

$(function () {
    var app = new AppView({
        el : "#app-view"    
    });
    app.render();
});

}(this, this.document, this.jQuery, this._, this.Backbone));

