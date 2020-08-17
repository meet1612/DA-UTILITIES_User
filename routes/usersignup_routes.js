var signup=require("../model/user_model");
var demo = require("../model/emailvarify");
var session = require('cookie-parser');

var express = require("express");
var router = express.Router();
var response = require('../controller/response');
router.post('/',function(req,res,next){
    signup.userSignup(req.body,function(err,rows){
        if (err) {
            res.send(response('Error', 403, null, err, 'Signup Un-Successfull', null))
          } else {
          	// let link = "localhost:3000/ActivationLink";
          	// let msg = "<a href=localhost:3000/ActivationLink'>click here</a>";
            // res.cookie('emailId',req.body.emailId, { maxAge: 900000, httpOnly: true });
            // console.log (req.cookies.emailId);
            // const message = '<a href="http://127.0.0.1:3000/activationLink/'+req.body.emailId+'">click here</a>
          	const to = req.body.emailId;
            const subject = 'User activation link.'
            const message = '<html><head><body><h3>Please click below link to activate your account !!!!!</h3><a href="http://127.0.0.1:3000/activationLink/'+req.body.emailId+'">click here</a></body></html>'
            const mailObj = {to,subject,message}
            demo.sendMail(mailObj)
            res.send(response('Success', 200, true, null, 'Signup Successfull', null))
          }
    });
});

module.exports=router;