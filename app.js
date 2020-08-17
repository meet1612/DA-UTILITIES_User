var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var user=require('./routes/user_routes');
var user1=require('./routes/user_routes1');
var signup=require('./routes/usersignup_routes');
var emailvarify=require('./routes/emailvarify_route');
var batch=require('./routes/batch_routes');
var itemtype=require('./routes/itemtype_routes');
var venue=require('./routes/venue_routes');
var sell=require('./routes/sell_routes');
var sell_description=require('./routes/sell_description_routes');
var session=require('./routes/session_routes');
var sessionreq=require('./routes/sessionrequest_routes');
var myproduct=require('./routes/sell_routes');
var adminaccess=require('./routes/AdminAccess');
var profile=require('./routes/profile');
// var activate_user = require('./routes/activate_user_routes');
//var changePassword = require('./routes/changePassword');

var app = express();

global.uid="";
global.uname="Login Again";
global.utype="1";
global.btype="2";
global.citype="amenities";
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/user',user);
app.use('/user1',user1);
app.use('/signup',signup);
app.use('/emailvarify',emailvarify);
app.use('/batch',batch);
app.use('/itemtype',itemtype);
app.use('/venue',venue);
app.use('/sell',sell);
app.use('/sell_description',sell_description);
app.use('/session',session);
app.use('/sessionreq',sessionreq);
app.use('/myproduct',myproduct);
app.use('/adminaccess',adminaccess);
app.use('/profile',profile);
app.use('/activationLink', usersRouter);
//app.use('/changepassword', changePassword);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
