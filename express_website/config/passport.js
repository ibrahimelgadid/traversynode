const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const passport = require('passport');



module.exports = function(passport){
    passport.use('local-login', new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback: true
    }, 
    function(req,email, password, done){
        User.findOne({email}).then(function(user){
            if(!user){
                return done(null, false, {message: 'No user found'})
            }
            
            bcrypt.compare(password, user.password, 
                function(err, match){
                    if(err){throw err}
                    if(match){
                        return done( null, user);
                    } else{
                        return done(null, false, {message: 'Wrong password'});
                      }
                })
             
        })
    }
))
}


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
