var user = require("../model/user_model");
var express = require("express");
var router = express.Router();
var jwt = require('jsonwebtoken')
var response = require('../controller/response');

router.get('/:id?', function (req, res, next) {
  if (req.params.id) {
    user.getUserByID(req.params.id, function (err, rows) {
      if (err) {
        res.send(response('Error', 403, null, err, null, null));
      } else {
        res.send(response('Success', 200, rows, null, null, null));
      }
    });
  } else {
    user.getAllUser(function (err, rows) {
      if (err) {
        res.send(response('Error', 403, null, err, null, null));
      } else {
        console.log("fjnsfg")
        res.send(response('Success', 200, rows, null, null, null));
      }
    });
  }
});

router.post('/', function (req, res, next) {
  user.userLogin(req.body, function (err, rows) {
    if (err) {
      res.send(response('Error', 403, null, err, 'Login Un-Successfull', null))
    } else {
      if (rows.length === 0) {
        res.send(response('Error', 401, [], null, 'Username or password is incorrect', null))
      } else {
        if (rows[0]['userStatus'] === 'Active'){
          da = JSON.stringify(rows);
          global.uid = JSON.parse(da)[0].emailId;
          global.uname = JSON.parse(da)[0].userName;
          global.utype = JSON.parse(da)[0].userId;
          global.btype = JSON.parse(da)[0].batchId;
          const token = jwt.sign({ exp: (Date.now() / 1000) + 1296000, data: { 'uid': JSON.parse(da)[0].emailId, 'username': JSON.parse(da)[0].userName, 'userid': JSON.parse(da)[0].userId } }, 'SenProject');
          res.send(response('Success', 200, token, null, 'Login Successfull', null))
        }else{
          res.send(response('Error', 200, false, null, 'Please verify your email account..', null))
        }

      }
    }
  });
});


router.put("/", function (req, res, next) {
  user.updateUser(req.body, function (err, rows) {
    if (err) {
      res.send(response('Error', 403, null, err, null, null))
    } else {
      res.send(response('Success', 200, rows, null, null, null))
    }
  });
});

router.delete("/:id", function (req, res, next) {
  user.deleteUser(req.params.id, function (err, rows) {
    if (err) {
      res.send(response('Error', 403, null, err, null, null))
    } else {
      res.send(response('Success', 200, rows, null, null, null))
    }
  });
});

router.post('/validate',function(req,res,next){
  const token = req.body.token;

  jwt.verify(token, 'SenProject',function(err,data){
    if (err){
      res.send(response('Success', 200, false, null, 'Token is Expired', null))
    }else{
      res.send(response('Success', 200, true, null, 'Token is Valid', null))
    }
  
  })
})

router.post('/changepassword', function (req, res, next) {
  console.log(req.body);
  const token = req.body.token;
  const currentpassword = req.body.currentpassword;
  const newpassword = req.body.pass;
  const newpassword1 = req.body.pass1;

  jwt.verify(token, 'SenProject', function (err, data) {
    if (err) {
      res.send(response('Success', 200, false, null, 'Token is Expired', null))
    } else {

      user.getUserpass(data.data.uid, function (err, ress) {
        if (ress.length > 0) {
          if (newpassword == newpassword1) {
            if (ress[0]['password'] === currentpassword) {
              var item = {}
              item['password'] = newpassword
              item['emailId'] = data.data.uid;
              user.changepass(item, function (err, rows) {
                if (err) {
                  res.send(response('Error', 403, null, err, null, null));
                }
                else {
                  res.send(response('Success', 200, true, null, "password Changed", null));
                }
              });
            }
            else {
              res.send(response('Error', 403, null, err, 'Current Password is wrong', null));
            }
          }
          else{
            res.send(response('Error', 403, null, err, 'Password Does not match', null));
          }
        }
      })
    }
  })
})



module.exports = router;