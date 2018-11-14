var fs = require('fs');
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

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//replacement for app.get
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('mynewcollection');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following comments");
    console.log(docs);
    callback(docs);
  });
}

/*
app.get('/api/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});
*/

//replacement for app.post
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('mynewcollection');
  // Insert some documents
  collection.insertOne([
   {id: Date.now(), author: req.body.author, text: req.body.text}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("New comment inserted");
    callback(result);
  });
}

/*
app.post('/api/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var comments = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        var newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };
        comments.push(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});
*/

//export MONGO_PASSWORD=bjarne1;

MongoClient.connect('mongodb://knappna:process.env.MONGO_PASSWORD@ds155243.mlab.com:55243/cs336', function (err, client) {
  if (err) throw err

  db = client;

	app.listen(app.get('port'), function() {
	    console.log('Server started: http://localhost:' + app.get('port') + '/');
	});


  db.collection('mynewcollection').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result);
  });
});



