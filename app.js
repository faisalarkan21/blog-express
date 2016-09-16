var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var assert = require('assert');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users')



var app = express()




var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    
    extname:  '.html',
    helpers: {
        cekAdmin: function () {        
            if (data.admin == true){

                return  "checked";

            }else{

                 return  "";

            }
                      
    
        },
        
        bar: function () { return 'BAR!'; },
        tambahSatu: function(angka) {return angka+1}
   
  

 }
});



// exphbs.registerHelper('list', function(items, options) {
//   var out = "<ul>";

//   for(var i=0, l=items.length; i<l; i++) {
//     out = out + "<li>" + options.fn(items[i]) + "</li>";
//   }

//   return out + "</ul>";
// });




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', hbs.engine);
app.set('view engine', '.html');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// buat session 
app.use(session({
    secret: 'somesecrettokenhere',
    resave: false,
    saveUninitialized: true
}));

// buat session jdi global
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});


/*
  Buat Pengaman gan! 

*/



var udahmasuk = function (req, res, next) {

    if (req.session.admin == true) {

        res.redirect("/admin");

    } else if (req.session.admin == false && req.session.namaSession) {

        res.redirect("/dashboard");

    } else {

        res.render('user/login', {
            makan: "belum login"
        });

    };
};



var pengamananUser = function (req, res, next) {

    console.log(session.namaSession);

    if (!req.session.admin  && req.session.namaSession !== undefined )
        return next();   

    res.send("Engga dijinin gan!");
};


var pengamananAdmin = function (req, res, next) {

    if (req.session.admin == true)

        return next();   

     res.send("Engga dijinin gan!");
};





/*
  Alamat!
*/


//app.get('/coba', users.users);
// app.use('/', routes);
// app.use('/users', users);

app.get('/daftar', users.daftar);
app.get('/', routes.index);
app.get('/login',udahmasuk, users.login);
app.post('/login', users.membuktikan);
app.get('/profile', pengamananUser, users.profile);
app.get('/dashboard',pengamananAdmin ,users.dashboard);

app.get('/keluar', users.keluar);
// app.get('/admin',pengamananAdmin, users.admin);
// // app.get('/users', user.users);
app.get('/user/:id',pengamananAdmin, users.user);
app.post('/mendaftar', users.mendaftar);
// app.get('/admin/dashboard',pengamananAdmin , users.listSemua);
// app.post('/admin/dashboard/update/:id',pengamananAdmin , users.update)
// app.get('/admin/dashboard/detele/:id', pengamananAdmin, users.deleteUser);










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
