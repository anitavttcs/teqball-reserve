import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AddGroup() {
	const [groupName, setGroupName] = useState(null);

	const history = useHistory();

	const addGroup = async () => {
		const jwt = localStorage.getItem("token");
		const url = "http://localhost:5000/api/group";

		axios({
			method: 'post',
			url: url,
			headers: {
				authorization: `Bearer ${jwt}`,
			},
			data: {
				name: groupName
			},
		})
			.then(res => console.log(res))
			.catch(err => console.log(err));
	}

	return (
		<div>
			<h1>Add New Group</h1>
			<div className="card w-50">
				<div className="card-body vertical">
					<div>
						<label htmlFor="inpGroup">Group name:</label>
						<input id="inpGroup" type="text" onChange={e => setGroupName(e.target.value)} />
					</div>
					{/* <h5>Group members</h5>
					<button className="btn btn-primary" onClick={() => history.push("/add-member")}>
						Add new member
					</button>
					<h5>Events</h5>
					<button className="btn btn-primary" onClick={() => history.push("/add-event")}>
						Add new event
					</button> */}
					<button className="btn btn-primary" onClick={addGroup}>
						Create Group
					</button>
					<div>
						<button className="btn btn-outline-primary" onClick={() => history.push("/groups")}>Back</button>
					</div>
				</div>
			</div>
		</div>
	)
};