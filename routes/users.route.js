var express = require("express");
var router = express.Router();
const shortid = require("shortid");

var db = require("../db");

//default users view and search
router.get("/", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
});

//delete user
router.get("/delete/:id", function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
});
//update user
router.get("/update/:id", function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("users/update", {
    user: user
  });
});
router.post("/update/:id", function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  db.get("users")
    .find({ id: id })
    .assign({ name: name })
    .write();
  res.redirect("/users");
});
//create new user
router.post("/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
});

module.exports = router;
