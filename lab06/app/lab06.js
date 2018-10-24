const express = require('express');
const app = express();
const http_status = require('http-status-codes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const HOST = "localhost";
const PORT = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//get
app.get("/request/my-handling-form-page", function (req, res) {
	res.status(200).send("Got a GET request");
})

//head
app.head("/request/my-handling-form-page", function (req, res) {
	res.status(200).send("Got a HEAD request");
})




//put - use CURL
//curl -X GET localhost:3000
//curl -X PUT localhost:3000
app.put("localhost:3000/request", function (req, res){
	res.send("Got a PUT request at /request"); //don't need res.status because send() 
})						//automatically returns http_status.ACCEPTED (200)

//post
app.post("localhost:3000/request", function (req, res) {
	res.send("Got a POST request");
})

//delete
app.delete("localhost:3000/request", function (req, res) {
	res.send("Got a DELETE request at /request");
})





//forms thing
///request/my-handling-form-page
app.post('/forms', function(req, res) {
    res.send('Hello, form POST!<br>Posted message: <code>'
	     + req.body.user_message + '</code>');
});


// Listen to this Port
app.listen(PORT, HOST, () => {
    console.log("listening on " + HOST + ":" + PORT + "...");
});
