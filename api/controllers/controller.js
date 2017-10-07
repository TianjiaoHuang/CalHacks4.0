'use strict';
process.env = require('dotenv-safe').load().parsed;

// create a document
exports.new_user = function(req, res) {
  console.log("Creating user" + req.body.user);
  users.insert(req.body, function(err, data) {
    if(err)
      return res.status(500).json(err)
    else
      return res.json("Success!")
  });
};

// login
exports.get_user = function(req, res) {
  var username = req.params.username;
  var password = req.params.password;

  //if users contains username, check password
  res.send(username + ' ' + password);
};

// tweet
exports.tweet = function(req, res) {
  console.log(req.body.content);
  res.send("I get your tweet\n" + req.body.content);
}

