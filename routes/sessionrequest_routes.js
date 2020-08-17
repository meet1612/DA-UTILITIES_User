var sessionreq = require("../model/sessionrequest_model");
var session = require("../model/session_model");
var express = require("express");
var router = express.Router();

router.get('/:id?',function(req,res,next){
    if(req.params.id){
        sessionreq.getSessionReqById(req.params.id,function(err,rows){
            if(err){
                res.json(err);
            }
            else{
//                res.json(rows);
                  da=JSON.stringify(rows);
           res.render('Sesssion_Req',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});

            }
        });
    }
    else{
    sessionreq.getAllSessionReq(function(err,rows){
        if(err){
            res.json(err);
        }
        else{
//            res.json(rows);
            da=JSON.stringify(rows);
           res.render('Sessions_Req',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da});

        }
    });
    }
});

router.post('/',function(req,res,next){
    sessionreq.addSessionReq(req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
          session.getAllSession(function(err,rows){
            if(err){
                res.json(err);
            }
            else{
                da=JSON.stringify(rows);
               res.render('Sessions',{title:"DAIICT-UTILITIES",text:"Request For Session",data:da,success:'Session Requested Succesfuly !!'});
            }
        });
        }
    });
});

router.put("/:id" ,function(req, res, next) {
    sessionreq.updateSessionReq(req.params.id,req.body, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

  router.delete("/:id", function(req, res, next) {
    sessionreq.deleteSessionReq(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

module.exports=router;