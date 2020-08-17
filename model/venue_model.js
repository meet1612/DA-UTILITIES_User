var db=require('../dbconnection');
var venue={
    getAllVenue:function(callback){
        return db.query("select * from venuemaster",callback);
    },
    addVenue:function(item,callback){
        return db.query("insert into venuemaster (LocationName) values (?)",[item.LocationName],callback);
    },
    updateVenue:function(id,item,callback){
        return db.query("update venuemaster set LocationName=? where LocationId=?",[item.LocationName,id],callback);
    },
    getVenueById:function(id,callback){
        return db.query("select * from venuemaster where LocationId=?",[id],callback);
    },
    deleteVenue(id,callback){
        return db.query("delete from venuemaster where LocationId=?",[id],callback);
    }
}
module.exports=venue;