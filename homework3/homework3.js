var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID; //different

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//var MongoClient = require('mongodb').MongoClient; not included
var db;

// Connect to the database before starting the application server. 
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/people"
 *    GET: finds all people
 *    POST: creates a new person
 */

app.get("/people", function(req, res) {
  db.collection("Homework3").find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get people.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/people", function(req, res) {
  var newPerson = req.body;
  newPerson.createDate = new Date();

//  if (!(req.body.firstName || req.body.lastName)) {
//    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
//  }

  db.collection("Homework3").insertOne(newPerson, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new person.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/person/:id"
 *    GET: find person by id
 *    PUT: update person by id
 *    DELETE: deletes person by id
 */

app.get("/person/id", function(req, res) {
  db.collection("Homework3").findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get person");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/person/id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection("Homework3").updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update person");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/person/id", function(req, res) {
  db.collection("Homework3").deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete person");
    } else {
      res.status(204).end();
    }
  });
});

/*  "/person/id/name"
 *    PUT: display person name given their id
 */
app.get("/person/id/name", function(req, res) {
  db.collection("Homework3").findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get person");
    } else {
      res.status(200).json(doc);
    }
  });
});


/*  "/person/id/years"
 *    PUT: display person's years worked given their id
 */
app.get("/person/id/years", function(req, res) {
  db.collection("Homework3").findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get person");
    } else {
      res.status(200).json(doc);
    }
  });
});

//Person object
//id is number
//firstname, lastname, and startdate are all strings
function Person(id, firstname, lastname, startdate){
	this.Id=id;
	this.First=firstname;
	this.Last=lastname;
	this.Startdate=startdate;
	this.Years = getYears(this.Startdate);
	people.push(this); //add new person to list
}


var findPeople = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('homework3');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following people");
    console.log(docs);
    callback(docs);
  });
}

//people
//a list of all people objects
function allPeople(people){
        for(var i = 0; i < people.length; i++){ //traverse through the whole people list
	        var individual = people[i];
	        console.log("Name: " + individual.First + " " + individual.Last);
	        console.log("ID number: " + individual.Id);
	        console.log("Seniority: " + individual.Years + " years");
	}
}

//person/id
// a full record for the person with this ID
function fullRecord(idNum){
	var exists = false;
	//see if person with this id even exists
        for(var i = 0; i < people.length; i++){ //traverse through the whole people list
		if (people[i].Id == idNum){
	                exists = true;
			var individual = people[i];
        	        console.log("Name: " + individual.First + " " + individual.Last);
	                console.log("ID number: " + individual.Id);
	                console.log("Seniority: " + individual.Years + " years");
		}else if ((i == people.length-1) && (exists == false)){ //if on last person and still no match
			app.get('/', function (req, res) {
                        	res.json(null);
                        	res.sendStatus(404);
			})
		}
        }
}


//person/id/name
//the full name (first and last concatenated into one string) for person with this ID
function IDtoName(idNum){
	var exists = false;
        //see if person with this id even exists
        for(var i = 0; i < people.length; i++){ //traverse through the whole people list
                if (people[i].Id == idNum){
                        exists = true;
                        var individual = people[i];
                        console.log("The name of the person with ID number " + idNum + " is " + individual.First + " " + individual.Last);
                }else if ((i == people.length-1) && (exists == false)){ //if on last person and still no match
                        app.get('/users/:userId/books/:bookId', function (req, res) {
                                res.status(500).json({ error: '404 Not Found' });
                                res.sendStatus(404);
                        })

                }
        }
}


//person/id/year
//the number of years with the organization for the person with this ID

function IDtoYears(idNum){

        var exists = false;
        //see if person with this id even exists
        for(var i = 0; i < people.length; i++){ //traverse through the whole people list
                if (people[i].Id == idNum){
                        exists = true;
                        var individual = people[i];
		        console.log("Person with ID number " + idNum + " has been working here for " + getYears(individual.Startdate) + " years");
                }else if ((i == people.length-1) && (exists == false)){ //if on last person and still no match
                        app.get('/users/:userId/books/:bookId', function (req, res) {
                                res.status(500).json({ error: '404 Not Found' });
                                res.sendStatus(404);
                        })

                }
        }
//        res.status(404).send("Not found.");
}


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


/*
$( 'form' ).submit(function( event ) {
  event.preventDefault();

  var form = $( this );

  $.ajax({
    type: 'POST',
    url: '/data/save', //the url where we want to post
    data: form.serialize(),
    dataType: 'json',
    success: function( resp ) {
      console.log( resp );
    }
  });
});

/*
$( 'form' ).submit(function( event ) {
  event.preventDefault();

  var form = $( this );

  $.ajax({
    type: 'POST',
    url: '/localhost:3000', //the url where we want to post
    data: form.serialize(),
    dataType: 'json',
    success: function( resp ) {
      console.log( resp );
    }
  });
});
*/



//lets make some people for examples


var people = [];

var p1 = new Person("1000148", "Natalie", "Knapp", "08-06-1996");
var p2 = new Person("801050", "Timothy", "Cannata", "08-08-1996");
var p3 = new Person("448808", "Ted", "Wernette", "04-09-1965");
var p4 = new Person("1", "Caspian", "Thedog", "10-08-2010");

/*
console.log("Testing allPeople()");
allPeople(people);
console.log("Testing fullRecord for ID number 1");
fullRecord("1");
console.log("Testing fullRecord for ID number 448808");
fullRecord("448808");
console.log("Testing fullRecord for nonexistant ID number 294");
fullRecord("294");
console.log("Testing IDtoName for ID number 801050");
IDtoName("801050");
console.log("Testing IDtoName for nonexistant ID number 111");
IDtoName("111");
console.log("Testing IDtoYears for ID number 1000148");
IDtoYears("1000148");
console.log("Testing IDtoYears for nonexistant ID number 567");
IDtoYears("567");
*/
