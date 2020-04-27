var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require ('cors')
var logger = require('morgan');
const mongoose = require ('mongoose')
require ('dotenv').config()
var indexRouter = require('./routes/index');
var UserRouter = require('./routes/User');
const HeroesRouter = require ('./routes/heroesRouter')

var app = express();
mongodConnect = process.env.DB_MONGO
mongoose.connect(mongodConnect, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', UserRouter);
app.use ('/heroes', HeroesRouter)

module.exports = app;
