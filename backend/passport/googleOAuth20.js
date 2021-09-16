const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/login/oauth2/redirect/google",
        scope: [ 'profile', 'email' ],
        state: true
      },
      (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile);
      }
    )
  );
};
