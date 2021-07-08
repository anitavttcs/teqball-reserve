const User = require("../models/User");
const Group = require("../models/Group");

async function getUser(email) {
	const user = await User.findOne({ email });
	return user;
};

async function insertUser(user) {
	const newUser = new User({
		name: user.name,
		email: user.email,
		googleId: user.googleId,
		calExport: user.calExport,
		access_token: user.access_token
	});

	await newUser.save().then((user) => {
		console.log("User created: ", newUser);
	});
};

async function getAdminRoles(id) {
	// const adminRoles = await Group.find();
	const adminRoles = await Group.find({ admins: id });
	return adminRoles;
};

async function getMemberRoles(id) {
	const memberRoles = await Group.find({ members: id });
	return memberRoles;
};

module.exports = { getUser, insertUser, getAdminRoles, getMemberRoles };
