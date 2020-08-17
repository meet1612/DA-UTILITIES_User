var user1 = require("../model/user_model");
var express = require("express");
var router = express.Router();
var response = require('../controller/response');
var demo = require("../model/emailvarify");

router.post("/forgotpassword", function (req, res, next) {
    user1.ForgotPassword(req.body.username, function (err, rows) {
        
        if (err) {
            res.send(response('Error', 403, null, err, null, null));
        }
        else {
            if (rows.length > 0){
                // console.log("Kapil " + JSON.stringify(rows));
                const to = rows[0]['emailId'];
                const subject = 'Forgot Password'
                const message = '<h3>Hello Student,\nYour password is: </h3>'+'<b>'+rows[0]['password']
                const mailObj = {to,subject,message}
                demo.sendMail(mailObj)
                res.send(response('Success', 200,true, "Mail Sent", null, null));
            }else{
                res.send(response('Success', 200,false, "User Not found", null, null));
            }
            
        }
    });
});

router.put("/:id?", function (req, res, next) {
    if (req.params.id) {
        user1.updateUserTypeByAdmin(req.params.id, function (err, rows) {
            if (err) {
                res.send(response('Error', 403, null, err, null, null));
            }
            else {
                res.send(response('Success', 200, rows, null, null, null));
            }
        });
    }
    else {
        user1.changepass(req.body, function (err, rows) {
            if (err) {
                res.send(response('Error', 403, null, err, null, null));
            }
            else {
                res.send(response('Success', 200, rows, null, null, null));
            }
        });
    }
});

module.exports = router;
