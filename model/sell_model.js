var db = require('../dbconnection');
var sell = {
    getAllSell: function (callback) {
        return db.query("select * from sellmaster order by updatedAt DESC", callback);
    },
    addSell: function (item, filename, callback) {
        console.log("name===" + filename);
        var date = new Date();
        return db.query("insert into sellmaster(emailId,itemId,itemName,itemPrice,itemDetails,itemImage,itemStatus,sellDate,updatedAt)  values (?,?,?,?,?,?,?,?,?)", [item.emailId, item.itemId, item.itemName, item.itemPrice, item.itemDetails, filename, 1, date, date], callback);
    },
    updateSell: function (id, item, filename, callback) {
        var date = new Date();
        return db.query("update sellmaster set itemId=?,itemName=?,itemPrice=?,itemDetails=?,itemImage=?,itemStatus=?,updatedAt=? where itemId=?", [item.itemId, itemName, itemPrice, itemDetails, filename, item.itemStatus, date, id], callback);
    },
    getSellById1: function (id, callback) {
        return db.query("select * from sellmaster natural join itemtype where emailId=?", [id], callback);
    },
    updateSellStatus: function (id, callback) {
        return db.query("update sellmaster set itemStatus=0 where sellId=?", [id], callback);
    },
    getSellById: function (id, callback) {
        return db.query("select * from sellmaster where sellId=?", [id], callback);
    },
    deleteSell(id, callback) {
        return db.query("delete from sellmaster where sellId=?", [id], callback);
    },
    getSellByIdForDescription(id, callback) {
        return db.query("SELECT * from usermaster join sellmaster on usermaster.emailId = sellmaster.emailId join itemtype ON sellmaster.itemId = itemtype.itemId where sellmaster.sellId = ?", [id], callback);
    }
}
module.exports = sell;