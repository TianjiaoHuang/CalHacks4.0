'use strict';
process.env = require('dotenv-safe').load().parsed;

// Import PDF to HTML converter
var pdftohtml = require('pdftohtmljs');
var formidable = require('formidable');
var form = new formidable.IncomingForm();
var fs = require('fs');

  


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
  convert(false);
  res.send("I get your tweet\n" + req.body.content);
}

// resume
exports.resume = function(req, res) {
  // reveive uploaded file
  form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload;
    convert(oldpath);


  });
}

function convert(path) {
    // Convert the file into html
    var converter = new pdftohtml(path || 'blob/sample.pdf', "blob/sample.html");
    converter.convert().then(function() {
      console.log("Conversion success");
    }).catch(function(err) {
      console.error("Conversion error: " + err);
      // res.status(500);
      // res.send("Unable to parse the file into pdf")
    });

  // If you would like to tap into progress then create
  // progress handler
  converter.progress(function(ret) {
    console.log ((ret.current*100.0)/ret.total + " %");
  });
}

function evaluateResume(text) {
    // Imports the Google Cloud client library
const language = require('@google-cloud/language')({
  projectId: 'folkloric-union-166117',
  keyFilename: 'credential.json'
});
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

