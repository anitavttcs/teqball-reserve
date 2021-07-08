const express = require("express");
const { google } = require("googleapis");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/database");

require("dotenv/config");

// parsing http reqs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Database
connectDB();

// Routes
const loginRoutes = require("./routes/loginRoutes");
app.use("/api/login", loginRoutes);
const refreshTokenRoute = require("./routes/refreshTokenRoute");
app.use("/api/refresh-token", refreshTokenRoute);
const groupRoutes = require("./routes/groupRoutes");
app.use("/api/group", groupRoutes);
const eventRoutes = require("./routes/eventRoutes");
app.use("/api/event", eventRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);
const gCalRoutes = require("./routes/gCalRoutes");
app.use("/api/google-calendar", gCalRoutes);

app.get("/api/authorize", (req, res) => {
  const oAuth2Client = require("./oAuth2Clent")();
  const SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    "openid",
    "profile",
    "email",
  ];

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  res.redirect(authUrl);
});

app.use(function errorHandler(err, req, res, next) {
  res.status(500).json({ message: "Server error" });
  console.log("Server error: ", err);
});

// Server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
