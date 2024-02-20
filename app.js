var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var bodyParser = require('body-parser');

var session = require('express-session')
var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customer');
var sessionAuth = require("./middleware/sessionAuth")
const flash = require('connect-flash');
var checkAuth = require("./middleware/checkAuth");

var app = express();
app.listen(3500);

const cors = require('cors');
app.use(cors({ origin: true }));

app.use(session({
  secret: ' cat',
  cookie : {maxage:60000} 
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(sessionAuth);
app.use(flash());

// app.use(checkAuth);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);
app.use('/customer', customerRouter);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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



mongoose.connect("mongodb://localhost/products-crud",
{ useNewUrlParser: true})
.then(()=>console.log("mongo db is connected"))
.catch((error)=>console.log(error.message));
module.exports = app;
