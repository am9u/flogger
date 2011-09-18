process.env.NODE_ENV = "test";

var app = require("../server.js"),
    assert = require("assert");

module.exports = {
    "POST /exercises" : function () {
        assert.response(app.app, {
            url : "/exercises",
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            data : JSON.stringify({ exercise : { name : "Test Exercise" } })
            
        }, {
            status : 200,
            headers : { "Content-Type" : "application/json; charset=utf-8" }

        }, function (res) {
            var doc = JSON.parse(res.body);
            assert.equal(doc.name, "Test Exercise");
        });
    },

    "GET /exercises" : function () {
        assert.response(app.app, {
            url : "/exercises",
            method : "GET"
        }, {
            status : 200,
            headers : { "Content-Type" : "application/json; charset=utf-8" }
        }, function (res) {
            var docs = JSON.parse(res.body);
            assert.type(docs, 'object');    
        });
    }
};
