import { useHistory } from "react-router-dom";
import GroupCard from "../components/GroupCard";

export default function Groups({ setUser, user }) {
	const history = useHistory();

	return (
		<>
			{user ?
				<>
					<h1>Groups</h1>
					<div className="card w-50 vertical">
						<div className="card-body">

							{user?.admin.map((group, i) =>
								<GroupCard group={group} key={"adm" + i} />
							)}
							{user?.member.map((group, i) =>
								<GroupCard group={group} key={"mem" + i} />
							)}
							<button className="btn btn-primary" onClick={() => history.push("/add-group")}>
								Add new group
							</button>
						</div>
					</div>
				</>
				:
				<>
					<h1>Welcome to Teqball Reserve</h1>
					<div className="pageContent">
						<p>Please sign in to continue</p>
					</div>
				</>
			}
		</>
	)
};