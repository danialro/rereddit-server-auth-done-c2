var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect((process.env.MONGOLAB_SILVER_URI) || 'mongodb://localhost/rereddit');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/users', users); 

app.use(express.static('public'));
app.use(express.static('node_modules'));

console.log("=====SERVER RUNNING======");



var port = process.env.PORT || '4000';

app.listen(port);
