const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Posts model
const Post = require("../../models/Posts");

// @route GET api/posts/test
// @desc Tests posts route
// @access Public
//router.get("/test", (req, res) => res.json({ msg: "posts works" }));

// @route POST api/posts/
// @desc Create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.body.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
