const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    // specify use google strategy and the scope is asking access from google
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get('/api/logout', (req, res) => {
    req.logout(); // passport auto attached the res and req for us, which clean the cookies for logout
    res.send(req.user);
  })
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);

  })
};
