var express = require("express");
var router = express.Router();
const shortid = require("shortid");

var db = require("../db");

//default books view and search
router.get("/", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

//delete book
router.get("/delete/:id", function(req, res) {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
});
//update book
router.get("/update/:id", function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("/books", {
    book: book
  });
});
router.post("/update/:id", function(req, res) {
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  db.get("books")
    .find({ id: id })
    .assign({ title: title, description: description })
    .write();
  res.redirect("/books");
});
//create new book
router.post("/create", function(req, res) {
  req.body.id = shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
});

module.exports = router;
