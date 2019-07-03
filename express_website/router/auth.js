/* ========================================= */
/* =/=/=/=/=/=>    Import consts  <=/=/=/=/= */
/* ========================================= */

const express = require('express');
const router = express.Router();
const User= require('../model/user');
const flash = require('connect-flash');
const passport = require('passport');
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');


/* ========================================= */
/* =/=/=/=/=/=>    get login      <=/=/=/=/= */
/* ========================================= */
router.get('/login', (req,res)=>{
    if(req.user){
        res.redirect('/posts')
    }else{
        res.render('auth/login')
    }
    
});


/* ========================================= */
/* =/=/=/=/=/=>    post login      <=/=/=/=/= */
/* ========================================= */
router.post('/login',passport.authenticate('local-login',{
    failureRedirect:'/auth/login',
    failureFlash:true
}), function(req,res,next){
    res.redirect('/posts')
});


/* ========================================= */
/* =/=/=/=/=/=>    get signup     <=/=/=/=/= */
/* ========================================= */
router.get('/signup', (req,res)=>{
    if(req.user){
        res.redirect('/posts')
    }else{
        res.render('auth/signUp')
    }
});


/* ========================================= */
/* =/=/=/=/=/=>   post signup     <=/=/=/=/= */
/* ========================================= */
router.post('/signup', (req,res)=>{
    const email = req.body.email;
   User.findOne({email},(err,user)=>{
        if(err){console.log(err)}
        if(user){
            req.flash('danger', 'Already exist select another username');
            res.redirect('/auth/signup')
        }else{
            req.checkBody('username','Username must be not empty').notEmpty();
            req.checkBody('email', 'Email not valid').isEmail();
            req.checkBody('password', 'Password be more than 6 character').isLength({min:6});
            req.checkBody('password2', 'Password does\'t match').equals(req.body.password);

            var errors = req.validationErrors();
            if (errors) {
                res.render('auth/signUp',{
                errors:errors,
                
                })
            }else{
                let newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    username:req.body.username,
                    password:req.body.password,
                    password2:req.body.password2,
                    role:req.body.role
                })

                bcrypt.genSalt(10,(err,salt)=>{
                    if(err){console.log(err)}
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err){console.log(err)}
                        newUser.password = hash;

                        newUser.save((err,done)=>{
                            if(err){
                                console.log(err)
                            } else {
                                req.flash('success', 'You are registered you can login now');
                                res.redirect('/auth/login')
                            }                                                        
                        })
                    })
                })
            }
        }
    })
});



/* ========================================= */
/* =/=/=/=/=/=>    logOut   <=/=/=/=/= */
/* ========================================= */

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/auth/login')
})




module.exports = router;