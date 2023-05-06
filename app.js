const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

const userRouter = require('./routes/userRouter');


mongoose.connect('mongodb://127.0.0.1:27017/hw54').then(() => {
  console.log("DB is connected..");
});


app.use(express.static('public'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: "InYekCodeBekasiNagooooooooooooooooo",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: true
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);

app.listen(8000,()=>{
  console.log(`server run on port 8000 ...`)
})

module.exports = app;
