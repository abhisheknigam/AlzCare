var express = require('express');

var app = express();
var multer = require('multer');


var cors = require('cors');
var util = require('util');
/*var constants = require('constants');
var constant = require('./config/constants');*/


var port = process.env.PORT || 8042;
/*var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');*/
var path = require('path');

/*var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');*/
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', cors(), function(req, res, next){
    res.json({msg: 'This is CORS-enabled for all origins!'});
});

/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
//configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


//require('./config/passport')(passport); // pass passport for configuration

//set up our express application
//app.use(morgan('dev')); // log every request to the console
//app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.set('view engine', 'ejs'); // set up ejs for templating

/*
//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
*/
// routes ======================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport


//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
	console.log(req.error);
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
	console.log(req.status);
    res.status(500).render('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;