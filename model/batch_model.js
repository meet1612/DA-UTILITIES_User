var db=require('../dbconnection');
var batch={
    getAllBatch:function(callback){
        return db.query("select * from batchmaster",callback);
    },
    addBatch:function(item,callback){
        return db.query("insert into batchmaster (batchName) values (?)",[item.batchName],callback);
    },
    updateBatch:function(id,item,callback){
        return db.query("update batchmaster set batchName=? where batchId=?",[item.batchName,id],callback);
    },
    getBatchById:function(id,callback){
        return db.query("select * from batchmaster where batchId=?",[id],callback);
    },
    deleteBatch(id,callback){
        return db.query("delete from batchmaster where batchId=?",[id],callback);
    }
}
module.exports=batch;