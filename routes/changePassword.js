var express = require('express');
var router = express.Router();
var session = require("../model/session_model");
var user = require("../model/user_model");

/* GET home page. */
router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
        user.getUserByID(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
                res.render('change_password', { title: "DAIICT-UTILITIES"});
            } else {
                da = JSON.stringify(rows);
                res.render('change_password', { title: "DAIICT-UTILITIES"});
            }
        });
    }
});


module.exports = router;
