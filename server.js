// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(cookieSession({
  name: 'session',
  keys: ['abc'],
}))


app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const mentorListings = require("./routes/mentorListings");
const dashboardRoutes = require("./routes/dashboard");
const { getUserFromSession } = require("./src/getUserFromSession");
const loginRoute = require("./routes/login");
const availableSpots = require("./routes/availableSpots");
const bookPayment  = require("./routes/bookpayment");
const booksession = require("./routes/booksession");
const getMonths = require("./routes/getMonths");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/mentorListings", mentorListings(db));
app.use("/api/dashboard", dashboardRoutes(db));
app.use("/api/login", loginRoute(db));
app.use("/api/getspots", availableSpots(db));
app.use("/api/paymentcheckout", bookPayment());
app.use("/api/booksession",booksession(db));
app.use("/api/getmonths",getMonths(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
