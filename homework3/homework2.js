//using arrays

var express = require('express');
var app = express();
var router = express.Router();


//const HOST = "localhost";
//const PORT = 3000;

//app.listen(PORT, HOST, () => {
//	console.log("listening on " + HOST + ":" + PORT + "...");
//});


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

//test the form

