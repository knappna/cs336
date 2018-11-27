var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var db;

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
app.get("/api/people", function (req, res) {
	db.collection("Homework3").find({}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

app.post("/api/people", function (req, res) {
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
app.get("/api/person/id", function (req, res) {
	db.collection("Homework3").find({"id" : req}).toArray(function(err, docs) {
		if (err) throw err;
		res.json(docs);
	});
});

app.put("/api/person/id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection("Homework3").updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) throw err;
    res.status(204).end();
  });
});

app.delete("/api/person/id", function(req, res) {
  db.collection("Homework3").deleteOne({"id": req}), function(err, result) {
    if (err) throw err;
    res.status(204).end();
  }
});

//person/id/name
//enter id, provide name
app.get("/api/person/id/name", function (req, res) {
  db.collection("Homework3").findOne({"id": req}), function(err, doc) {
    if (err) throw err;
    //res.status(200).json(doc.first_name);
    res.json(doc.first_name);
    res.json(doc.last_name);
  }
});

//person/id/years 
//enter id, provide years
app.get("/api/person/id/years", function (req, res) {
  db.collection("Homework3").findOne({"id": req}), function(err, doc) {
    if (err) throw err;
    //res.status(200);
    res.json(doc.start_date) = startDate;
    var years = getYears(startDate);
    res.json(years);
  }
});


function getYears(startDate){
	var today = new Date();
	var firstDay = new Date(startDate);
	var age = today.getFullYear() - firstDay.getFullYear();
	var m = today.getMonth() - firstDay.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < firstDay.getDate())) {
		age--;
	}
	return age;
}


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

var mongoURL = 'mongodb://cs336:' +
	       process.env.MONGO_PASSWORD +
           '@ds155243.mlab.com:55243/cs336';
MongoClient.connect(mongoURL, { useNewUrlParser: true }, function(err, dbConnection) {
    if (err) throw err;
    db = dbConnection;
});


//React.js front end - just display all people
app.get('/', function(req, res) {
    db.collection("Homework3").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

