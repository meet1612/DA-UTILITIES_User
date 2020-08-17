var user = require("../model/user_model");
var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken')
var session = require('cookie-parser');

router.get('/', function (req, res, next) {
    console.log(req.cookies.emailid);
    user.activateUser(req.cookies.emailid, function (err, rows){
      if (err) {
        res.send(response('Error', 403, null, err, null, null));
      } else {
        res.redirect('Login');
      }
    });
});