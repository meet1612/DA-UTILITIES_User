var db=require('../dbconnection');
var session={
    getAllSession:function(callback){
        var date=new Date().toDateString();
        console.log("Date="+date);
        return db.query("select * from sessionmaster natural join venuemaster natural join batchmaster where sessionDate >=curdate() order by sessionDate,sessionTime  ",callback);
    },
    addSession:function(emailId,speakerName,sessionDetails,batchId,sessionTopic,sessionPrice,LocationId,sessionDate,sessionTime,callback){
        var date=new Date();
        return db.query("insert into sessionmaster(emailId,speakerName,sessionDetails,batchId,sessionTopic,sessionPrice,LocationId,sessionDate,sessionTime,sessionAddedAt,sessionUpdatedAt) values (?,?,?,?,?,?,?,?,?,?,?)",[emailId,speakerName,sessionDetails,batchId,sessionTopic,sessionPrice,LocationId,sessionDate,sessionTime,date,date],callback);
    },
    updateSession:function(id,item,callback){
        var date=new Date();
        return db.query("update sessionmaster set speakerName=?,sessionDetails=?,batchId=?,sessionTopic=?,sessionPrice=?,LocationId=?,sessionDate=?,sessionTime=?,sessionUpdatedAt=? where sessionId=?",[item.speakerName,item.sessionDetails,item.batchId,item.sessionTopic,item.sessionPrice,item.LocationId,item.sessionDate,item.sessionTime,date,id],callback);
    },
    getSessionById:function(id,callback){
        return db.query("select * from sessionmaster where sessionId=?",[id],callback);
    },
     getSessionByDate:function(id,callback){
        return db.query("select * from sessionmaster where sessionDate=?",[id],callback);
    },
    deleteSession(id,callback){
        return db.query("delete from sessionmaster where sessionId=?",[id],callback);
    },
    getLocById(id,callback)
    {
        return db.query("select LocationName from venuemaster where LocationId=?",[id],callback);
    }
}
module.exports=session;