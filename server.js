var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({
        "error": message
    });
}

// FizzBuzz API Routes
app.post("/fizzbuzz", function (req, res, next) {
    console.log(req.body);
    var num = parseInt(req.body.number);
    if (isNaN(num)) {
        res.status(400).send("Bad Request: " + req.body);
    } else {
        if (num % 15 == 0) {
            num = "Fizz Buzz";
        } else if (num % 5 == 0) {
            num = "Buzz";
        } else if (num % 3 == 0) {
            num = "Fizz";
        }
        console.log(num);
        res.status(200).send(String(num));
    }
    next();
});