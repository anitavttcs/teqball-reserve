import { useHistory, useLocation } from "react-router-dom";

export default function AddMember() {
	const history = useHistory();
	const location = useLocation();
	const groupId = location.groupId;
	const groupName = location.groupName;

	const addMember = () => {
		console.log("post");
	};
	//TODO: BE: van v nincs DB-ben?

	return (
		<div>
			<h1>Invite Member to {groupName}</h1>
			<div className="card w-50">
				<div className="card-body vertical">
					<div>
						<label htmlFor="inpEmail">E-mail address:</label>
						<input id="inpEmail" type="email" />
					</div>
					<button className="btn btn-primary" onClick={addMember}>
						Invite
					</button>
					<div>
						<button className="btn btn-outline-primary" onClick={() => history.push(`/group/${groupId}`)}>Back</button>
					</div>
				</div>
			</div>
		</div>
	)
};