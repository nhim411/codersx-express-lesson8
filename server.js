const express = require("express");
const shortid = require("shortid");

const db = require('./db');
const usersRoute = require('./routes/users.route');
const booksRoute = require('./routes/books.route');
const transactionsRoute = require('./routes/transactions.route')

const app = express();
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", function(req, res) {
  res.render('index');
});

app.use('/users', usersRoute);
app.use('/books', booksRoute);
app.use('/transactions', transactionsRoute);

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
