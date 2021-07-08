import React, { useEffect } from "react";
import axios from "axios";
import UserGroupLi from "../components/UserGroupLi";

export default function User({ user }) {

	const googleExport = async (checked) => {
		const jwt = localStorage.getItem("token");

		const url = checked ?
			`http://localhost:5000/api/user/enable-cal-export/${user.google}` :
			`http://localhost:5000/api/user/disable-cal-export/${user.google}`

		axios({
			method: 'post',
			url: url,
			headers: {
				authorization: `Bearer ${jwt}`,
			}
		})
			.then(res => console.log(res))
			.catch(err => console.log(err));
	}

	useEffect(() => {
		console.log(user);
	}, []);

	return (
		<div id="userPage" >
			<h1>Account data</h1>
			<div className="pageContent">
				<div className="pageDiv">
					<label htmlFor="uName">Name:</label>
					<input type="text" id="uName" disabled value={user.name} />
				</div>
				<div className="pageDiv">
					<label htmlFor="uEmail">E-mail address:</label>
					<input type="text" id="uEmail" disabled value={user.email} />
				</div>
				<div className="pageDiv">
					<label htmlFor="uGroups">Current group memberships:</label>
					<ul>
						{user.admin.map((val, i) =>
							<UserGroupLi group={val.name} role="admin" key={"adm" + i} />
						)}
						{user.member.map((val, i) =>
							<UserGroupLi group={val.name} role="member" key={"mem" + i} />
						)}
					</ul>
				</div>
				<div className="pageDiv">
					<label htmlFor="chkbCalExp">Export to Google calendar:</label>
					<input type="checkbox" id="chkbCalExp" defaultChecked={user.calExport} onClick={e => googleExport(e.target.checked)} />
				</div>
			</div>
		</div>
	);
};
