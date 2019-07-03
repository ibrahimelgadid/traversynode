/* ========================================= */
/* =/=/=/=/=/=>    Import consts  <=/=/=/=/= */
/* ========================================= */

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
/* ========================================= */
/* =/=/=/=/=/=>    get contact    <=/=/=/=/= */
/* ========================================= */
router.get('/', (req,res)=>{
    res.render('contact')
})


/* ========================================= */
/* =/=/=/=/=/=>    get contact    <=/=/=/=/= */
/* ========================================= */
router.post('/send', (req,res)=>{
    var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'himaelgadid@gmail.com',
            pass:'G010202396Mail25a'
        }
    });

    var mainOptions = {
        from:'John Doe <johndoe@outlook.com>',
        to:req.body.email,
        subject:'Website Submission',
        text:'You have a new submission with the following details...Name:'+req.body.name+' Email:'+req.body.email +'Message:'+req.body.message,
        html:`
            <p>you got a new submission with the following details..</p>
            <ul>
                <li>Name: ${req.body.name}</li>
                <li>Name: ${req.body.email}</li>
                <li>Name: ${req.body.message}</li>
            </ul>
        `
        };

    transporter.sendMail(mainOptions,(err,info)=>{
        if(err){
        console.log(err);
        res.redirect('/');
        }else{
            console.log('Message sent'+info.response);
            res.redirect('/')
        }
    });
});

module.exports = router;