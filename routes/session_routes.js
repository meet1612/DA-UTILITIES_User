var session = require("../model/session_model");
var sessionreq=require("../model/sessionrequest_model");
var express = require("express");
var router = express.Router();
var da="";
var loc="";

router.get('/',function(req,res,next){


    session.getAllSession(function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            da=JSON.stringify(rows);
           res.render('Sessions',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da,success:''});
        }
    });
});
router.get('/:id?',function(req,res,next){
   if(req.params.id){
       session.getSessionByIdId(req.params.id,function(err,rows){
           if(err){
               res.json(err);
           }
           else{
              loc=res.json(rows);
           }
       });
   }
   else{
   session.getAllSession(function(err,rows){
       if(err){
           res.json(err);
       }
       else{
           res.json(rows);
           res.end();
       }
   });
   }
});

router.post('/:id?',function(req,res,next){
    console.log("Bhavesh in="+req.params.id);
    
    sessionreq.getSessionReqById(req.params.id,function(err,rows1){
           if(err){
               console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
//               res.json(err);
           }
           else{
               console.log("rows="+JSON.stringify(rows1));
              loc=JSON.stringify(rows1);
               console.log("loc="+JSON.parse(loc)[0].remailId);
               session.addSession(JSON.parse(loc)[0].remailId,JSON.parse(loc)[0].speakerName,JSON.parse(loc)[0].sessionDetails,JSON.parse(loc)[0].batchId,JSON.parse(loc)[0].sessionTopic,JSON.parse(loc)[0].sessionPrice,JSON.parse(loc)[0].LocationId,JSON.parse(loc)[0].sessionDate,JSON.parse(loc)[0].sessionTime,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
//            res.json(rows);
            sessionreq.deleteSessionReq(req.params.id, function(err, rows3) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows3);
      }
    });
        }
    });
           }
       });
    
  
});

router.put("/:id" ,function(req, res, next) {
    session.updateSession(req.params.id,req.body, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

  router.delete("/:id", function(req, res, next) {
    session.deleteSession(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

module.exports=router;