const jwt = require("jsonwebtoken");
const loginService = require("../services/loginService");
const fetch = require("node-fetch");
const jwtDecode = require("jwt-decode");
const { isValidObjectId } = require("mongoose");
const { google } = require("googleapis");
const oAuth2Client = require("../oAuth2Clent")();
require("dotenv/config");

const secret = process.env.SECRET;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
// let token;

async function loginCheck(req, res) {
  const code = req.body.code;

  // oAuth2Client.getToken(code, (err, token) => {
  //   if (err) return console.error("Error retrieving access token", err);
  //   oAuth2Client.setCredentials(token);

  //   console.log("Token: ", token);
  // });

  fetch("https://accounts.google.com/.well-known/openid-configuration") //ez csak opc.
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code: code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: "http://localhost:3000/login",
          grant_type: "authorization_code",
        }),
      };

      fetch(data.token_endpoint, fetchOptions) //tokent adja vissza
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // token = data;
          // oAuth(token);
          userCheck(data, res);
        })
        .catch((err) =>
          res.status(403).json({ msg: "Authentication failed." })
        );
    });
}

// const oAuth = (token) => {
//   const oAuth2Client = new google.auth.OAuth2(
//     clientId, clientSecret, "http://localhost:3000/login");

//   oAuth2Client.setCredentials(JSON.parse(token));
//   oAuth2Client.getToken(code, (err, token) => {
//     console.log(code);
//   })
// };

async function userCheck(data, res) {
  const { access_token } = data;
  console.log("access_token: ", access_token);
  const { name, email, sub } = jwtDecode(data.id_token); //sub: google ID
  let adminRoles = [];
  let memberRoles = [];
  const foundUser = await loginService.getUser(email); //még jobb volna sub-bal?? utána esetleg e-mail matchet nézünk, ha van pl. fb aut. is
  if (!foundUser) {
    //létrehozás, ha nincs még - jobb volna mongo "findOneAndUpdate"-tel ("upsert")??
    const newUser = {
      name: name,
      email: email,
      googleId: sub,
      calExport: false,
      access_token: JSON.stringify(data),
    };
    console.log(newUser);
    await loginService.insertUser(newUser); //mentés
  } else if (foundUser) {
    // foundUser.access_token = JSON.stringify(data);
    foundUser.save();
    adminRoles = await loginService.getAdminRoles(foundUser._id);
    memberRoles = await loginService.getMemberRoles(foundUser._id);
    // console.log(adminRoles);
    // console.log(memberRoles);
  }

  jwt.sign(
    {
      //token létreh.
      id: foundUser?._id,
      google: sub,
      name: name,
      email: email,
      admin: adminRoles,
      member: memberRoles,
      calExport: foundUser?.calExport || false,
    },
    secret,
    { expiresIn: "1h" },
    function (err, token) {
      res.json({ token: token }); //visszaküld. FE-re
    }
  );
}

module.exports = { loginCheck, secret };
