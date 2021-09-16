const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

module.exports = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/api/login/oauth2/redirect/facebook",
        profileFields: ['id', 'emails', 'name'],
        state: true
      },
      (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile);
      }
    )
  );
};
