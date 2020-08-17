var db=require('../dbconnection');

var user={

    getUserByID:function(id,callback){
        return db.query("select * from usermaster natural join batchmaster  where emailId=?",[id],callback);
    },
    getAllUser:function(callback){
        return db.query("select * from usermaster",callback);
    },
    userLogin:function(item,callback){
        return db.query('select * from usermaster where emailId=? And password=? And UserId!=?', [item.emailId, item.password, 3],callback);
    },
    userSignup:function(item,callback){
        var date=new Date();
        var def_val=1;
        return db.query("insert into usermaster values (?,?,?,?,?,?,?,?,?)",[item.emailId,item.password,item.userName,item.batchId,item.mobileNo,def_val,'Inactive',date,date],callback);
    },
    updateUser:function(item,callback){
        var date=new Date();
        
        console.log("called1="+item.emailId);
        global.uname=item.userName;
        return db.query("update usermaster set userName=?,batchId=?,mobileNo=?,userUpdatedAt=? where emailId=?",[item.userName,global.btype,item.mobileNo,date,global.uid],callback);
    },
    deleteUser(id,callback){
        return db.query("delete from usermaster where emailId=?",[id],callback);
    },
    ForgotPassword:function(emailId,callback)
    
    {
        console.log(emailId)
        return db.query('select * from usermaster where emailId=?',[emailId],callback);
    },
    changepass:function(item,callback){
        var date=new Date();
        console.log(item);
        return db.query("update usermaster set password=?,userUpdatedAt=? where emailId=?",[item.password,date,item.emailId],callback);
    },
    getUserpass: function (emailId, callback) {
        var date = new Date();
        return db.query("select * from usermaster where emailId=?", [emailId], callback);
    },
    updateUserTypeByAdmin:function(id,callback){
        var date=new Date();
        var val=2;
        return db.query("update usermaster set userId=?,userUpdatedAt=? where emailId=?",[val,date,id],callback);
    },
    updateUserAccess:function(item,callback){
        
        return db.query("update usermaster set userId=2 where emailId=?",[item.emailId],callback);
    },
    activateUser: function (emailId,callback){
        return db.query("update usermaster set userStatus = 'Active' where emailId = ?",[emailId],callback);
    }
};


module.exports=user;