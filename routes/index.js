var express = require('express');
var router = express.Router();
var session = require("../model/session_model");
var batch=require("../model/batch_model");
/* GET home page. */
router.get('/', function(req, res, next) {
  session.getAllSession(function(err,rows){
        if(err){
            res.render('index5', { title: 'DA-UTILITIES' });
        }
        else{
            da=JSON.stringify(rows);
           res.render('index5',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});
        }
    });
});

router.get('/login', function(req, res, next) {
  res.render('Login', { title: 'DA-UTILITIES' });
});

router.get('/registration', function(req, res, next) {
batch.getAllBatch(function(err,rows){
        if(err){
            res.render('Registration', { title: 'DA-UTILITIES' });
        }
        else{
            da=JSON.stringify(rows);
           res.render('Registration',{title:"DAIICT-UTILITIES",data:da});
        }
    });
});

router.get('/ForgotPassword', function (req, res, next) {
  res.render('ForgotPassword', { title: 'DA-UTILITIES' });
});

router.get('/changepassword', function (req, res, next) {
  res.render('change_password', { title: 'DA-UTILITIES' });
});





module.exports = router;
