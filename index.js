const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const schedulesRoutes = require("./routes/schedules");
const coursesRouters = require("./routes/courses");
const professorsRouters = require("./routes/professors");
const departmentsRouters = require("./routes/departments");
const userRouters = require("./routes/user");
const majorsRouters = require("./routes/majors");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");
const isAuthenticatedRouter = require("./routes/is_authenticated");
require("./services/passport");
const session = require("express-session");
const reviewsRouters = require("./routes/reviews");

const app = express();

const corsOption = {
  origin: [process.env.DEV_CLIENT_URL, process.env.PROD_CLIENT_URL],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note: the `secure` option should be true only if you're using HTTPS
  })
);

app.use(cors(corsOption));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

app.use("/schedules", schedulesRoutes);
app.use("/courses", coursesRouters);
app.use("/professors", professorsRouters);
app.use("/departments", departmentsRouters);
app.use("/is_authenticated", isAuthenticatedRouter);
app.use("/reviews", reviewsRouters);
app.use("/majors", majorsRouters);
app.use("/user", userRouters);

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.listen(5000, () => console.log("Example app is listening on port 5000."));
