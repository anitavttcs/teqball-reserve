const mongoose = require("mongoose");

require("dotenv/config");

const connection = process.env.DB_CONNECTION;

const connectDB = async () => {
	await mongoose
		.connect(connection, {
			useCreateIndex: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false
		})
		.then(() => console.log("MongoDB connected..."))
		.catch((err) => console.log("MongoDB NOT connected ", err));
}


module.exports = connectDB;