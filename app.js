const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// Database
const db = require("./config/database");
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// express initialization
const app = express();
const PORT = process.env.PORT || 3000;

// handlebars
const hbs = exphbs.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true, // Allow prototype properties
    allowProtoMethodsByDefault: true, // Allow prototype methods (optional)
  },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
// set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { layout: "landing" });
});

app.use("/gigs", require("./routes/gigs"));

app.listen(PORT, console.log(`Server started on port ${PORT}`));
