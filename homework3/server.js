/*const express = require("express")
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser")

const HOST = "localhost";
const PORT = 3000;
*/
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var db;

/*app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));*/

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//people - list of people or add new person based on form
app.get("/people", function (req, res) {
	db.collection("Homework3").find({}).toArray(function(err, docs) {
		if (err) throw err;
		res.json.(docs);
	});
});

app.post("/people", function (req, res) {
    var newPerson = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
	start_date: req.body.start_date,
    };
    db.collection("Homework3").insertOne(newPerson, function(err, result) {
        if (err) throw err;
        db.collection("Homework3").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});


//person/id get, update, or delete person's record
app.get("/person/id", function (req, res) {
	db.collection("Homework3").find({req.body.id}).toArray(function(err, docs) {
		if (err) throw err;
		res.json.(docs);
	});
});

app.post("/person/id", function (req, res) {
        res.send();
})


//person/id/name give name data
app.get("/person/id/name", function (req, res) {
        res.status(200).send("Requesting person name based on id");
})

app.post("/person/id/name", function (req, res) {
        res.send();
})

//person/id/years give year data
app.get("/person/id/years", function (req, res) {
        res.status(200).send("Requesting person years based on name");
})

app.post("/person/id/years", function (req, res) {
        res.send();
})



app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});

var mongoURL = 'mongodb://cs336:' +
	       process.env.MONGO_PASSWORD +
           '@ds155243.mlab.com:55243/cs336';
MongoClient.connect(mongoURL, function(err, dbConnection) {
    if (err) throw err;
    db = dbConnection;
});
