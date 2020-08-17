var db=require('../dbconnection');
var itemtype={
    getAllItem:function(callback){
        return db.query("select * from itemtype",callback);
    },
    addItem:function(item,callback){
        return db.query("insert into itemtype (itemName) values (?)",[item.itemName],callback);
    },
    updateItem:function(id,item,callback){
        return db.query("update itemtype set itemName=? where itemId=?",[item.itemName,id],callback);
    },
    getItemById:function(id,callback){
        return db.query("select * from itemtype where itemId=?",[id],callback);
    },
    deleteItem(id,callback){
        return db.query("delete from itemtype where itemId=?",[id],callback);
    }
}
module.exports=itemtype;