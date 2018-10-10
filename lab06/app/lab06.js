const express = require('express');
const app = express();
const port = 3000;

//Creating Router() object
//const router = express.Router();

// Listen to this Port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

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
app.put("/request/my-handling-form-page", function (req, res){
	res.status(200).send("Got a PUT request at /user");
})


//post
app.post("/request/my-handling-form-page", function (req, res) {
	res.status(200).send("Got a POST request");
})

//delete
app.delete("/request/my-handling-form-page", function (req, res) {
	res.status(200).send("Got a DELETE request at /user");
})

//forms thing
app.post('/forms', function(req, res) {
    res.send('Hello, form POST!<br>Posted message: <code>'
	     + req.body.user_message + '</code>');
});


