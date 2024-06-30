const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    // specify use google strategy and the scope is asking access from google
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));
};
