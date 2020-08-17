var nodemailer = require('nodemailer');

var demo={

 sendMail:function(demo,callback){   
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'daiictservices@gmail.com',
    pass: 'Daiict@123'
  }
});

var mailOptions = {
  from: 'daiictservices@gmail.com',
  to: demo.to,
  subject:demo.subject,
  html:demo.message
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}
}
module.exports=demo;