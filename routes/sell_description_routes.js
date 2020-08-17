var sell = require("../model/sell_model");
var user = require("../model/user_model");
var item = require("../model/itemtype_model");
var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
ejs = require('ejs');
var item =require("../model/itemtype_model");
// app.set('view engine', 'ejs'); // code to set the ejs for rendering template

var da="";
var item_category = "";
let user_dt;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/img/sell_products');
    },
    filename: (req, file, cb) => {
        x = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ storage: storage });

// router.get('/:id?', function (req, res, next) {
//     console.log("-------------id:"+req.params.id+"-------------");
//     if (req.params.id) {
//         let usr_emailid;
//         sell.getSellById(req.params.id, function (err, rows) {
//             if (err) {
//                 res.json(err);
//                 res.render('myproduct',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});
//             }
//             else {
                
//                 da=JSON.stringify(rows);
//                 console.log("--------sell-data------"+rows);
//                 console.log("---------sell-item-id-------"+rows[0].itemId);
//                 console.log("--------sell-email-id------"+rows[0].emailId);
//                 usr_emailid = rows[0].emailId;
//                 user.getUserByID(usr_emailid, function (err, usr){
//                     console.log("---var-usr_emailId---in : "+usr_emailid);
//                     if (err) {
//                         res.json(err);
//                         // res.render('myproduct',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});
//                         console.log("----------------error while loading user data by id-----------")                
//                     }
//                     else {
//                         console.log(usr);
//                         //console.log("-------user_data[emailid]--- "+usr[0].emailId);
//                         user_dt=JSON.stringify(usr);
//                         console.error(user_dt[0].userName);
//                     }
//                 });
//                 item.getItemById(rows[0].itemId, function (err, itm){
//                     if (err) {
//                         console.log("--------------error in item_type data---------------");
//                     }
//                     else {
                        
//                         item_category = JSON.stringify(itm);
//                         console.log("itemtype="+item_category);
//                         global.citype=JSON.parse(item_category)[0].itemTname;
//                     }
//                 });
//                 res.render('product_description',{title:"DAIICT-UTILITIES", items_category: item_category, product_data:da, user_data: user_dt});
//             }
//         });
//     }
//     else {
//         sell.getAllSell(function (err, rows) {
//             if (err) {
//                 res.json(err);
//             }
//             else {
//                 res.json(rows);
//             }
//         });
//     }
// });

router.get('/:id?', function (req, res, next) {
    console.log("-------------id:"+req.params.id+"-------------");
    if (req.params.id) {
        sell.getSellByIdForDescription(req.params.id, function (err, rows) {
            console.log(rows);
            if (err) {
                res.json(err);
                res.render('myproduct',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});
            }
            else {  
                da=JSON.stringify(rows);
                console.log(da);
                res.render("product_description",{title:"DAIICT-UTILITIES", product_data:da});
            }
        });
    }
    else {
        sell.getAllSell(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
});
router.post("/:id?", function (req, res, next) {
     sell.updateSellStatus(req.params.id,function(err,rows){
        if(err)
        {
            res.json(err);
        }
         else{
            res.json(rows);
         }
     });
});
module.exports = router;