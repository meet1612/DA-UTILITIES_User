var itemtype = require("../model/itemtype_model");
var express = require("express");
var router = express.Router();

router.get('/:id?',function(req,res,next){
    if(req.params.id){
        itemtype.getItemById(req.params.id,function(err,rows){
            if(err){
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
    else{
    itemtype.getAllItem(function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
    }
});

router.post('/',function(req,res,next){
    itemtype.addItem(req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.put("/:id" ,function(req, res, next) {
    itemtype.updateItem(req.params.id,req.body, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

  router.delete("/:id", function(req, res, next) {
    itemtype.deleteItem(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

module.exports=router;