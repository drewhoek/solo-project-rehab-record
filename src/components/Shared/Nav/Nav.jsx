import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

function Nav() {
	const user = useSelector((store) => store.user);

	return (
		<div className="nav">
			<Link to="/home">
				<Typography component="h2" variant="h3" className="nav-title">
					RehabRecord
				</Typography>
			</Link>
			<div>
				{/* If no user is logged in, show these links */}
				{!user.id && (
					// If there's no user, show login/registration links
					<Link className="navLink" to="/login">
						<Typography variant="overline">Login / Register</Typography>
					</Link>
				)}

				{/* If a user is logged in, show these links */}
				{user.id && (
					<>
						<Link className="navLink" to="/user">
							<Typography variant="overline">Home</Typography>
						</Link>

						<LogOutButton className="navLink" />
					</>
				)}
			</div>
		</div>
	);
}

export default Nav;
