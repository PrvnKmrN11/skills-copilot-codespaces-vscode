// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
// Set up the server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/comment.html');
});
// Get data from the file
app.get('/comments', function (req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});
// Add data to the file
app.post('/comments', function (req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function (err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(comments));
        });
    });
});
// Start the server
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});