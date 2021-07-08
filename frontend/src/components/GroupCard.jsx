import { useHistory } from "react-router-dom";

export default function GroupCard({ group }) {
	const history = useHistory();

	return (
		<div className="card w-100">
			<div className="card-body">
				<h5 className="card-title">{group.name}</h5>
				<button className="btn btn-outline-primary" onClick={() => history.push(`/group/${group._id}`)}>Details</button>
			</div>
		</div>
	);
};