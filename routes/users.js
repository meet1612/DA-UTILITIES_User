var user = require("../model/user_model");
var jwt = require('jsonwebtoken')
var session = require('cookie-parser');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id?', function (req, res, next) {
    console.log(req.params.id);
    user.activateUser(req.params.id, function (err, rows){
      if (err) {
        res.send(response('Error', 403, null, err, null, null));
      } else {
        res.redirect('/');
      }
    });
});
module.exports = router;
