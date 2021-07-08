const User = require("../models/User");

async function enableCalExport(req, res) {
	User.findOneAndUpdate({ googleId: req.params.sub }, { calExport: true })
		.then(() => res.send("calendar export enabled")) //ez majd kellhet Owernek
		.catch(err => console.log(err));
};

async function disableCalExport(req, res) {
	User.findOneAndUpdate({ googleId: req.params.sub }, { calExport: false })
		.then(() => res.send("calendar export disabled")) //ez majd kellhet Owernek
		.catch(err => console.log(err));
};

module.exports = { enableCalExport, disableCalExport };