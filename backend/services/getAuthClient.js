const { google } = require("googleapis");
const User = require("../models/User");

const oAuth2Client = require("../oAuth2Clent")();

module.exports = async (user_id) => {
  const { access_token } = await User.findOne({ _id: user_id });

  console.log("at: ", access_token);

  oAuth2Client.setCredentials(JSON.parse(access_token));

  console.log("client: ", oAuth2Client);
  return oAuth2Client;
};
