const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");

const profile = require("./routes/api/profile");

const posts = require("./routes/api/posts");

const app = express();

// mlab connection config
const db = require("./config/keys").mongoURI;

// connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("Connected to mlab"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

// routes
app.use("./routes/api/users", users);
app.use("./routes/api/profile", profile);
app.use("./routes/api/posts", posts);

const port = process.env.port || 4000;

app.listen(port, () => console.log(`Server is running on ${port}`));
