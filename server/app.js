var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var session = require("express-session");

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/users/login');
var logoutRouter = require('./routes/users/logout')
var signupRouter = require('./routes/users/signup')
var insertRouter = require('./routes/users/insertCity')
var getCityRouter = require('./routes/users/getCity')
var citySearchRouter = require('./routes/users/citySearch')
var avatarRouter = require('./routes/users/avatar')
var avatarUploadRouter = require('./routes/users/avatarUpload')


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({limit: '50mb'})); // 添加json解析
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// session设置
app.use(cookieParser('Kevin'));
app.use(session({
  secret: 'Kevin', // 可以随便写，是字符串就行，作为服务端生成session的签名
  resave: true, //强制保存session,即使session没有变化，默认为true（影响性能），建议设置false
  saveUninitialized: true, // 强制未初始化的session存储，默认建议true，主要针对req.session未设置初始值，其他地方的请求是否出现session_id
  name: "session_id", //保存在本地cookie的一个名字，默认connect.sid可以不设置
  cookie: {
    maxAge: 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒，第一次访问即开始计时
    secure: false, // 网址只能由 https 发送
  },
  rolling: true, //每次请求强行设置cookie，并重置cookie的过期时间，也就是每次访问都会重新计时。
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users/login', loginRouter);
app.use('/users/logout', logoutRouter);
app.use('/users/signup', signupRouter);
app.use('/users/insert', insertRouter);
app.use('/users/getCity', getCityRouter);
app.use('/users/citySearch', citySearchRouter);
app.use('/users/avatar/', avatarRouter)
app.use('/users/avatarUpload/', avatarUploadRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;