var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");

// .env
require("dotenv").config();

var apiRouter = require("./routes/api");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const logger = require("./services/logger");

var app = express();

// Connect to MongoDB
connectDB();

// Replace morgan with Winston logging
app.use((req, res, next) => {
	logger.info(`${req.method} ${req.url}`);
	next();
});

app.use(
	cors({
		origin: "http://localhost:5173", // or use "*" during development
	})
);

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve frontend in production
if (
	process.env.NODE_ENV === "production" ||
	process.env.NODE_ENV === "production-test"
) {
	app.use(express.static(path.join(__dirname, "public/build")));
	app.get("/", function (req, res) {
		res.sendFile(path.join(__dirname, "public/build", "index.html"));
	});
}

// API routes
app.use("/api/", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	logger.warn(`404 Not Found: ${req.originalUrl}`);
	next(createError(404));
});

// centralized error handler
app.use(errorHandler);

module.exports = app;

// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// var cors = require("cors");

// // .env
// require("dotenv").config();

// var apiRouter = require("./routes/api");
// const errorHandler = require("./middleware/errorHandler");

// var app = express();

// app.use(
// 	cors({
// 		origin: "http://localhost:5173", // or use "*" during development
// 	})
// );
// app.disable("x-powered-by");
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// if (
// 	process.env.NODE_ENV === "production" ||
// 	process.env.NODE_ENV === "production-test"
// ) {
// 	app.use(express.static(path.join(__dirname, "public/build")));
// 	app.get("/", function (req, res) {
// 		res.sendFile(path.join(__dirname, "public/build", "index.html"));
// 	});
// }

// app.use("/api/", apiRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// // error handler
// app.use(errorHandler);

// module.exports = app;
