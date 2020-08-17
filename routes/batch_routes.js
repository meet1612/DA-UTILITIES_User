var batch = require("../model/batch_model");
var express = require("express");
var router = express.Router();
var response = require('../controller/response');

router.get('/:id?',function(req,res,next){
    if(req.params.id){
        batch.getBatchById(req.params.id,function(err,rows){
            if(err){
              res.send(response('Error', 403, null, err, null, null))
            }
            else{
              res.send(response('Success', 200, rows, null, null, null))
            }
        });
    }
    else{
    batch.getAllBatch(function(err,rows){
        if(err){
          res.send(response('Error', 403, null, err, null, null))
        }
        else{
          // res.send(response('Success', 200, rows, null, null, null))
          res.json(rows);
        }
    });
    }
});

router.post('/',function(req,res,next){
    batch.addBatch(req.body,function(err,rows){
        if(err){
          res.send(response('Error', 403, null, err, null, null))
        }
        else{
          res.send(response('Success', 200, rows, null, null, null))
        }
    });
});

router.put("/:id" ,function(req, res, next) {
    batch.updateBatch(req.params.id,req.body, function(err, rows) {
      if (err) {
        res.send(response('Error', 403, null, err, null, null))
      } else {
        res.send(response('Success', 200, rows, null, null, null))
      }
    });
  });

  router.delete("/:id", function(req, res, next) {
    batch.deleteBatch(req.params.id, function(err, rows) {
      if (err) {
        res.send(response('Error', 403, null, err, null, null))
      } else {
        res.send(response('Success', 200, rows, null, null, null))
      }
    });
  });

module.exports=router;