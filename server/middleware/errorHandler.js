// server/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
	console.error(err.stack);

	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode).json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
	});
};

// // server/middleware/errorHandler.js
// module.exports = (err, req, res, next) => {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get("env") === "development" ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render("error");
// };
