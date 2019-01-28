const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load Auth module
const Auth = require("../../models/Auth");

// @route GET api/auth/test
// @desc Tests auth route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "auth works" }));

// @route GET api/auth/register
// @desc Register a user
// @access Public
router.post("/register", (req, res) => {
  //check to make sure email is not already registered.
  Auth.findOne({ email: req.body.email }).then(auth => {
    if (auth) {
      return res.status(400).json({ email: "email already in use" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "r", // rating
        d: "mm" // default
      });
      const newUser = new Auth({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          //TODO: better error handling and research regarding password best practices.
        });
      });
    }
  });
});

// @route GET api/auth/login
// @desc User login / return JWT token
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const passwd = req.body.password;

  Auth.findOne({ email }).then(auth => {
    // Check user exists
    if (!auth) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check password
    bcrypt.compare(passwd, auth.password).then(isMatch => {
      if (isMatch) {
        // User + passwd match
        const payload = { id: auth.id, name: auth.name, avatar: auth.avatar }; // JWT payload

        // Token signing. 36000 = 1 hour.
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password wrong" });
      }
    });
  });
});

// @route GET api/auth/current
// @desc User login / return JWT token
// @access Private
// Will return Unauthorized without valid token
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ msg: "Success" });
  }
);

module.exports = router;
