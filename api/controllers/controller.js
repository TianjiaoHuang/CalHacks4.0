'use strict';
process.env = require('dotenv-safe').load().parsed;

  // Imports the Google Cloud client library
  const language = require('@google-cloud/language')({
    projectId: 'folkloric-union-166117',
    keyFilename: 'credential.json'
  });
  


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

// resume
exports.resume = function(req, res) {

  // The text to analyze
  const text = req.body.content;

  const document = {
    'content': text,
    type: 'PLAIN_TEXT'
  };

  // Detects the sentiment of the text
  language.analyzeSentiment({'document': document})
    .then((results) => {
      const sentiment = results[0].documentSentiment;

      console.log(`Text: ${text}`);
      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      res.json(results);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

