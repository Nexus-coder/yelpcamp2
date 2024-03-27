if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log(process.env.SECRET);

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");
const { isLoggedin } = require("./middleware");
const { storage } = require("./cloudinary");

//Require routes
const userRoutes = require("./routes/user");
const campground = require("./routes/campground");
const reviews = require("./routes/reviews");
const { Session } = require("inspector");

mongoose.set("strictQuery", true);

const db_url = process.env.DB_URL;
//Open mongoose connection
mongoose
  .connect(db_url)
  .then(() => {
    console.log("Server opened!!");
  })
  .catch((err) => {
    console.log(err);
  });

//Check errors while it s connected
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connecton error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sessionConfig = {
  secret: "thisismysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middleware
app.use(express.static("public"));
//A place in a session to flash a message to a user that shows up oce and goes away and normally after an action
//Now all the requests after have a flash method in the request object
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//When we have this session now all the request objects will have a session object in the request body
//The cookie sent to me helps me or gives me some space in memory so that when i come back to the webpage it associates me with the memory
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//The res.locals is an object that contains response local variables scoped to the request and therefore available only to the views rendered on that request
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
//Retrieve the routes
app.use("/makeGrounds", campground);
app.use("/makeGrounds/:id/review", reviews);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.render("campgrounds/home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh Boy something went wrong";
  res.status(statusCode).render("campgrounds/error", { err });
});

//Open local server
app.listen(5510, () => {
  console.log(`opened on http://localhost:${5510}`);
});
