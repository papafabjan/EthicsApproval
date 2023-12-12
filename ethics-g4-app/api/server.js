const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./auth.js");
const userRoutes = require("./routes/userRouter");
const applicationsRoutes = require("./routes/applicationsRouter");
const testapplicationsRoutes = require("./routes/testapplicationsRouter");
const commentsRoutes = require("./routes/commentsRouter");

app.use(express.json());


app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api", userRoutes);
app.use("/api", applicationsRoutes);
app.use("/api", testapplicationsRoutes);
app.use("/api", commentsRoutes);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
      secure: process.env.NODE_ENV === "production" ? "true" : "auto",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server listening on port 4000");
});
