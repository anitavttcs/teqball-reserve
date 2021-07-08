const { google } = require("googleapis");

async function getEvents(req, res) {
	// listEvents('eyJhbGciOiJSUzI1NiIsImtpZCI6IjExMmU0YjUyYWI4MzMwMTdkMzg1Y2UwZDBiNGM2MDU4N2VkMjU4NDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzODIzNDEwNzgxODItc3BvOHN0ZGhybzdsZnJndmZqamFyZGQ4dGR1ZmUzNmouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzODIzNDEwNzgxODItc3BvOHN0ZGhybzdsZnJndmZqamFyZGQ4dGR1ZmUzNmouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ2NzE0NjAwMjIwMzcyMzg4OTUiLCJlbWFpbCI6ImNvZGVjb29sLnRlc3R1c2VyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiUzlXd3VQVDktWFlyNFZkOWhnUHplZyIsIm5hbWUiOiJVc2VyIFRlc3QiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeWFzdkE1QzZOVXRZQW1OY3piRDdPYVZ1cENOdGpKdzVwV1dlU3U9czk2LWMiLCJnaXZlbl9uYW1lIjoiVXNlciIsImZhbWlseV9uYW1lIjoiVGVzdCIsImxvY2FsZSI6Imh1IiwiaWF0IjoxNjI1MTU1OTk1LCJleHAiOjE2MjUxNTk1OTV9.AllOzwaF4qnXoBEFX8qJfOR_3-xgHqXms8S6l0mbyiF72fIufdXXQW24zpPnEdwmv3T3_rh9hD8npL51mBAurIsGWGEh1Wv9Amb07MeYIXQh_wPYY77w3BzQC9NVwF4mFp43g5PgDDA2vFJI5hTwu34ib2Ekm1Q8YW6ZFj-gx6EecxQNdutlPcfW0Upc2z5cZIMZGvsSQyqQoy7XcYyUOocE8CFBT9jEQeTYTiI-On8xMgBnLKZnlCRMeoAWnVvA4vFBL34tdHCPOkJkX6_cS_-d72Se_zNLEUP61uTmNXXPLWcH9S5VGJAwvZH0FanQKbG-11Cq-6URm0cZc_0wEA');
	// listEvents('AIzaSyAMXb_qsB67h2SsLYHmxP6B-55rDWxlLmI');
	// listEvents('ya29.a0ARrdaM-_KuSGQ1Md3vO_uVmXT3VRz0NZGry8kKtvSXVXI1fzSYgqXhmRepvIe_cWK3D1Q6AcvLxkDsK3P5wjj4tJ2NtlM7_0DHpBB7e4oOsiWY9Sv4bNtqh5KxEByjoabft6REQR0fk2GaoQ29HUpQqY8WF-');
}

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
};

exports.getEvents = getEvents;