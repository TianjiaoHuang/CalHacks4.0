'use strict';
module.exports = function(app) {
  var controller = require('../controllers/controller.js');
  
  //login
  app.route('/user/:username/:password')
     .get(controller.get_user)
  app.route('/new_user')
  .post(controller.new_user)
  app.route('/tweet')
  .post(controller.tweet)
}
