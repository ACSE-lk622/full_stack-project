const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose');
const keys = require("../config/key");

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id); // the id here is the id in mongo which auto generated by mongo. do not use google user id because not all users have google account.
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy( 
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", // after grant permission, redirect to this url
    },
    (accesstoken, refreshToken, profile, done) => {
      User.findOne({googleId: profile.id}).then((existingUser)=>{
        if(existingUser){
          //already have this user in database;
          done(null, existingUser);// first arg pass null means everything good, second arg is the record 
        }else{
          new User({googleId: profile.id}).save().then(user => done(null, user));
        }
      })

    } 
  )
);
