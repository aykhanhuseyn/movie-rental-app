let express = require("express");
let apiRoutes = require("./api-routes");
let bodyParser = require("body-parser");
let bcrypt = require("bcrypt");
let mongoose = require("mongoose");
const auth = require("./middleware/auth");
var cors = require("cors");
require("dotenv").config();

var port = process.env.PORT || 8080;

let app = express();

// database
const globaluri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.j4deo.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const localuri = `mongodb://localhost/${process.env.DBNAME}`;
mongoose.connect(localuri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
// Added check for DB connection
if (!db) console.log("Databazaya qoşulmada xəta baş verdi.");
else console.log("Databazaya qoşulma uğurludur.");

app.use(auth);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => res.send("Hello World with Express"));

app.listen(port, function () {
  console.log("Running Movie-Rental-App on port " + port);
});
