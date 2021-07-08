import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AddEvent({ user }) {
	const [evTitle, setEvTitle] = useState("");
	const [evDate, setEvDate] = useState("");
	const [evTime, setEvTime] = useState("");
	const [evLoc, setEvLoc] = useState("");
	const [message, setMessage] = useState("");

	const history = useHistory();
	const location = useLocation();
	const groupId = location.groupId;
	const groupName = location.groupName;

	//TODO: ha user.calExport, akkor gugliba is
	console.log("gugli export:", user.calExport);

	const addEvent = async () => {
		const jwt = localStorage.getItem("token");
		const url = "http://localhost:5000/api/event";

		axios({
			method: 'post',
			url: url,
			headers: {
				authorization: `Bearer ${jwt}`,
			},
			data: {
				groupId: groupId,
				title: evTitle,
				date: evDate,
				time: evTime,
				location: evLoc,
				googleExport: user.calExport
			},
		})
			.then(res => {
				console.log(res);
				setMessage("Event created!")
			})
			.catch(err => console.log(err));
	};

	return (
		<div>
			<h1>Add New Event for {groupName}</h1>
			<div className="card w-50">
				<div className="card-body vertical">
					<div>
						<label htmlFor="inpTitle">Event title:</label>
						<input id="inpTitle" type="text" onChange={e => setEvTitle(e.target.value)} />
					</div>
					<div>
						<label htmlFor="inpDate">Date:</label>
						<input id="inpDate" type="date" onChange={e => setEvDate(e.target.value)} />
						<label htmlFor="inpTime">Time:</label>
						<input id="inpTime" type="time" onChange={e => setEvTime(e.target.value)} />
					</div>
					<div>
						<label htmlFor="inpLoc">Location:</label>
						<input id="inpLoc" type="text" onChange={e => setEvLoc(e.target.value)} />
					</div>
					<div>
						<button className="btn btn-primary" onClick={addEvent}>
							Create Event
						</button>
						{message}
					</div>
					<div>
						<button className="btn btn-outline-primary" onClick={() => history.push(`/group/${groupId}`)}>Back</button>
					</div>
				</div>
			</div>
		</div>
	)
};