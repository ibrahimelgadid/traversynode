/* ========================================= */
/* =/=/=/=/=/=>    Import consts  <=/=/=/=/= */
/* ========================================= */

const express = require('express');
const app = express();
const port = require('./config/exports').PORT;
const path = require('path');
const bodyParser =  require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const messages = require('express-messages');
const pug = require('pug');



const contact = require('./router/contact');
const pages = require('./router/pages');
// const auth = require('./router/auth');





/* ========================================= */
/* =/=/=/=/=/=>    view engine    <=/=/=/=/= */
/* ========================================= */
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname,'public')));



/* ========================================= */
/* =/=/=/=/=/=>    middleware     <=/=/=/=/= */
/* ========================================= */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))



/* ========================================= */
/* =/=/=/=/=/=>   messages        <=/=/=/=/= */
/* ========================================= */
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  res.locals.errors = null;
  res.locals.user = req.user;
  next();
});




app.use('/', pages);
app.use('/contact', contact);
// app.use('/auth', auth);



/* ========================================= */
/* =/=/=/=/=/=>    port listen    <=/=/=/=/= */
/* ========================================= */
app.listen(port, (err,done)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('you are on ' + port)
})