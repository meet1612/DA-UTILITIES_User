var express = require('express');
var router = express.Router();
var user = require("../model/user_model");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('SessionAdminAccess', { title: 'DA-UTILITIES' });
});
router.post("", function (req, res, next) {
    
//    sell.addSell(req.body, req.file.filename, function (err, rows) {
//        if (err) {
////            res.json(err);
//            res.redirect("/");
//        } else {
////            res.json(rows);
//            res.redirect("/sell");
//        }
//    });
    user.updateUserAccess(req.body,function(err,rows){
    if(err)
    {
        
    }
    else{
        res.redirect('/adminaccess');
        res.end();
    }
    
    
    });
});


module.exports = router;
