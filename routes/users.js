var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var jwt = require('express-jwt');
var auth = jwt({secret: 'myLittleSecret'});
var passport = require('passport');

require('../config/passport');

var User = require('../models/Users');



router.get('/', function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});


router.param('user', function(req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user = user;
    return next();
  });
});


router.param('user2', function(req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user2 = user;
    return next();
  });
});


router.get('/:user', function(req, res, next) {
  req.user.populate('friends', function(err, user) {
    if (err) { return next(err); }

    res.json(user);
  });
});


router.get('/:user/friends', function(req, res, next) {

    res.json(req.user.friends);
  });



router.put('/:user/friends/addfriend/:user2', function(req, res, next) {
  req.user.addfriend(req.user2);

  req.user.save(function(err, user) {
    res.json(user);
  });
});

router.put('/:user/friends/removefriend/:user2', function(req, res, next) {
  req.user.removefriend(req.user2);

  req.user.save(function(err, user) {
    res.json(user);
  });
});








module.exports = router;
