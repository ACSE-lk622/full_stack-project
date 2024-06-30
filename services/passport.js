const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/key");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", // after grant permission, redirect to this url
    },
    (accesstoken, refreshToken, profile, done) => {
      console.log("accesstoken", accesstoken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      console.log("done", done);
    } // this is error function
  )
);
