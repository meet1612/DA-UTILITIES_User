var venue = require("../model/venue_model");
var express = require("express");
var router = express.Router();

router.get('/:id?',function(req,res,next){
    if(req.params.id){
        venue.getVenueById(req.params.id,function(err,rows){
            if(err){
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
    else{
    venue.getAllVenue(function(err,rows){
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
    venue.addVenue(req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.put("/:id" ,function(req, res, next) {
    venue.updateVenue(req.params.id,req.body, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

  router.delete("/:id", function(req, res, next) {
    venue.deleteVenue(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  });

module.exports=router;