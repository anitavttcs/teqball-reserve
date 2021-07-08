const fs = require("fs");
const { google } = require("googleapis");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

// node calendar.js
// http://localhost:3000/authorize

let oAuth2Client;

app.get("/login", (req, res) => {
  const { code } = req.query;

  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    oAuth2Client.setCredentials(token);
    // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return console.error(err);
      console.log("Token stored to", TOKEN_PATH);
    });

    // list events to console
    listEvents(oAuth2Client);
  });

  res.json(req.query);
});

app.get("/authorize", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  res.redirect(authUrl);
});

// TODO: add event to calendar
app.post("/add-event", (req, res) => {
  const { code } = req.query;

  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    oAuth2Client.setCredentials(token);
    // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return console.error(err);
      console.log("Token stored to", TOKEN_PATH);
    });

    addEvent(oAuth2Client);
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "openid",
  "profile",
  "email",
];

const TOKEN_PATH = "token.json";

fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);

  const credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
});

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
}

//TODO:
function addEvent(auth) {
  console.log("add event");
  const calendar = google.calendar({ version: "v3", auth });

  var event = {
    summary: "event title",
    location: "Reykjavik",
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: "2021-07-04T09:00:00",
      timeZone: "Europe/Budapest",
    },
    end: {
      dateTime: "2021-07-04T10:00:00",
      timeZone: "Europe/Budapest",
    },
    recurrence: [
      // 'RRULE:FREQ=DAILY;COUNT=2'
    ],
    attendees: [{ email: "codecool.testuser@gmail.com" }],
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", hours: 1 }],
    },
  };

  calendar.events.insert(
    {
      auth: auth,
      calendarId: "primary",
      resource: event,
    },
    function (err, event) {
      if (err) {
        console.log("There was an error contacting the Calendar service: " + err);
        return;
      }
      console.log("Event created: %s", event.htmlLink);
    }
  );
}
