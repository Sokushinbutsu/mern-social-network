const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Auth = mongoose.model("Auth");
const keys = require("../config/keys");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      /* jwt_payload contains:
       Id:
       name:
       avatar: gravatar url if exists, otherwise default
       iat: Issued At
       exp: expiration time*/
      console.log(jwt_payload);
    })
  );
};
