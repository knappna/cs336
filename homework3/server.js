/**
 * This implements some examples using jQuery and AJAX.
 */

const express = require("express")
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser")

const HOST = "localhost";
const PORT = 3000;

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//people - list of people or add new person based on form
app.get("/people", function (req, res) {
	res.status(200).send("Requesting person info");
})

app.post("/people", function (req, res) {
	res.send();
})


//person/id get, update, or delete person's record
app.get("/person/id", function (req, res) {
        res.status(200).send("Requesting person id info");
})

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
