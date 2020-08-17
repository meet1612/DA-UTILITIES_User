var express = require('express');
var router = express.Router();
var session = require("../model/session_model");
var user=require("../model/user_model");

/* GET home page. */
router.get('/', function(req, res, next) {
//    session.getAllSession(function(err,rows){
//        if(err){
//            res.render('index5', { title: 'DA-UTILITIES' });
//        }
//        else{
//            da=JSON.stringify(rows);
//           res.render('index5',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});
//        }
//    });
//
  res.render('profile', { title: 'DA-UTILITIES' });
});
router.get('/:id?', function (req, res, next) {
  if (req.params.id) {
    user.getUserByID(req.params.id, function (err, rows) {
      if (err) {
         res.json(err);
            res.render('profile',{title:"DAIICT-UTILITIES",data:da});
      } else {
            da=JSON.stringify(rows);
            res.render('profile',{title:"DAIICT-UTILITIES",data:da});
      }
    });
  } 
});
router.post("/:id?", function (req, res, next) {
    console.log("called");
  user.updateUser(req.body, function (err, rows) {
    if (err) {
//      res.send(response('Error', 403, null, err, null, null))
    } else {
    
      res.redirect("/profile/"+global.uid)
    }
  });
});


module.exports = router;
