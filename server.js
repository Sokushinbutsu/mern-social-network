const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");

const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// body-parser middleware
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// mlab connection config
const db = require("./config/keys").mongoURI;

// connect to mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mlab"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

// routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.port || 4000;

app.listen(port, () => console.log(`Server is running on ${port}`));
