const { google } = require("googleapis");
//const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport");
const oAuth2Client = require("./getAuthClient");

async function createEvents(
  user_id,
  eventName,
  startDate = "2021-07-07T09:00:00",
  endDate = "2021-07-07T17:00:00"
) {
  let auth = await oAuth2Client(user_id);

  const calendar = google.calendar({ version: "v3", auth });

  var event = {
    summary: eventName,
    location: "800 Howard St., San Francisco, CA 94103",
    description: "Teqball Event for Masters",
    start: {
      //dateTime: "2021-07-07T09:00:00",
      dateTime: startDate,
      timeZone: "Europe/Budapest",
    },
    end: {
      //dateTime: "2021-07-07T17:00:00",
      dateTime: endDate,
      timeZone: "Europe/Budapest",
    },
    /* 'recurrence': [
			'RRULE:FREQ=DAILY;COUNT=2'
		], */
    /* 'attendees': [
			{'email': 'lpage@example.com'},
			{'email': 'sbrin@example.com'},
		], */
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
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
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }
      console.log("Event created: %s", event.data.htmlLink);
    }
  );
}

module.exports = createEvents;
