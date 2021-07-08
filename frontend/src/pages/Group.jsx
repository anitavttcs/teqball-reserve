import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import EventCard from "../components/EventCard";

export default function Group({ user }) {
	const { id } = useParams();
	const history = useHistory();
	const [group, setGroup] = useState([]);
	// const [admin, setAdmin] = useState(false);
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		isAdmin();
		getGroup();
	}, []);

	const getGroup = async () => {
		const jwt = localStorage.getItem("token");

		if (jwt) {
			const response = await axios
				.get(`http://localhost:5000/api/group/${id}`, {
					headers: {
						"Content-type": "application/json",
						authorization: `Bearer ${jwt}`,
					},
				});
			// console.log(response.data);
			setGroup(response.data);
		}
	};

	const isAdmin = () => {
		user.admin?.map((group) => {
			// console.log(group);
			if (group._id === id)
				setAdmin(true);
		});
	};

	const makeAdmin = (id) => {
		console.log("make", id, "user admin");
		// /api/group/:id/admin
		const jwt = localStorage.getItem("token");
		const url = `http://localhost:5000/api/group/${id}/admin`;

		axios({
			method: "put",
			url: url,
			headers: {
				authorization: `Bearer ${jwt}`,
			},
			data: {
				// participation,
			},
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h1>{group.name}</h1>
			<div className="card w-50">
				<div className="card-body vertical">
					<h5>Group members</h5>
					{group?.admins?.map((admin, i) =>
						<div className="divLine" key={admin._id}>
							{admin.name}, <em>role:</em> admin
						</div>
					)}
					{group?.members?.map((member, i) =>
						<div className="divLine" key={member._id}>
							{member.name}, <em>role:</em> member
							{admin &&
								<button className="btn btn-outline-danger" id={member} onClick={e => makeAdmin(e.target.id)}>
									Make admin
								</button>}
						</div>
					)}
					<div>
						{admin &&
							<button className="btn btn-primary" onClick={() => history.push({ pathname: "/add-member", groupId: id, groupName: group.name })}>
								Invite new member
							</button>
						}
					</div>
					<h5>Events</h5>
					{group?.events?.map((event, index) =>
						<EventCard event={event} key={index} user={user} />
						// <div key={event._id}>
						// 	{event.title}
						// 	<button className="btn btn-outline-primary">Details</button>
						// </div>
					)}
					<div>
						{admin &&
							<button className="btn btn-primary" onClick={() => history.push({ pathname: "/add-event", groupId: id, groupName: group.name })}>
								Create new event
							</button>
						}
					</div>
					<div>
						<button className="btn btn-outline-primary" onClick={() => history.push("/groups")}>Back</button>
					</div>
				</div>
			</div>
		</div>
	)
};