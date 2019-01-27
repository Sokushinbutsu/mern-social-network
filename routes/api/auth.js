const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

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

module.exports = router;
