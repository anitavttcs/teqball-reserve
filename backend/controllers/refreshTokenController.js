const jwt = require("jsonwebtoken");
require("dotenv/config");

const secret = process.env.SECRET;

async function refreshToken(req, res) {
	//done: 1. tokenbe letárolni groupokat + jogokat
	//TODO: 2. refresh: megnézni, ha változott (új group, új admin kinev.), frissíteni

};

module.exports = { refreshToken };