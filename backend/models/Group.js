const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
	name: { type: String, required: true },
	// users: {
	admins: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			// unique: true		//A: nem jó ide a unique, mert akkor 1 ember csak 1 groupnak lehet adminja (DB indexként kezeli)
		}
	],
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			// unique: true		//A: uaz, mint fent
		}
	],
	// },
	events: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			// unique: true
		}
	]
});

module.exports = mongoose.model("Group", groupSchema);
