var db=require('../dbconnection');
var sessionreq={
    getAllSessionReq:function(callback){
        return db.query("select * from sessionrequest  natural join venuemaster natural join batchmaster order by sessionTime",callback);
    },
    addSessionReq:function(item,callback){
        var date=new Date();
        var stat = 0;
        return db.query("insert into sessionrequest (remailId,speakerName,sessionDetails,batchId,sessionTopic,sessionPrice,LocationId,sessionDate,sessionTime,sessionStatus) values (?,?,?,?,?,?,?,?,?,?)",[item.remailId,item.speakerName,item.sessionDetails,item.batchId,item.sessionTopic,item.sessionPrice,item.LocationId,item.sessionDate,item.sessionTime,stat],callback);
    },
    updateSessionReq:function(id,item,callback){
        var date=new Date();
        return db.query("update sessionrequest set speakerName=?,sessionDetails=?,batchId=?,sessionTopic=?,sessionPrice=?,LocationId=?,sessionDate=?,sessionStatus=?,sessionTime=?,sessionUpdatedAt=? where sessionreqId=?",[item.speakerName,item.sessionDetails,item.batchId,item.sessionTopic,item.sessionPrice,item.LocationId,item.sessionDate,item.sessionTime,item.sessionStatus,date,id],callback);
    },
    getSessionReqById:function(id,callback){
        return db.query("select * from sessionrequest where sessionreqId=?",[id],callback);
    },
    deleteSessionReq(id,callback){
        return db.query("delete from sessionrequest where sessionreqId=?",[id],callback);
    }
}
module.exports=sessionreq;