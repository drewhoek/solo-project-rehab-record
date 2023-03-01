import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const errors = useSelector((store) => store.errors);
	const dispatch = useDispatch();

	const login = (event) => {
		event.preventDefault();

		if (username && password) {
			dispatch({
				type: "LOGIN",
				payload: {
					username: username,
					password: password,
				},
			});
		} else {
			dispatch({ type: "LOGIN_INPUT_ERROR" });
		}
	}; // end login

	return (
		<form className="formPanel" onSubmit={login}>
			<Typography component="h2" variant="h4">
				Login
			</Typography>
			<br />
			{errors.loginMessage && (
				<>
					<Typography
						component="h4"
						variant="subtitle1"
						className="alert"
						role="alert"
					>
						{errors.loginMessage}
					</Typography>
					<br />
				</>
			)}
			<div>
				<TextField
					label="Enter Username"
					type="text"
					name="username"
					required
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
			</div>
			<br />
			<div>
				<TextField
					label="Enter Password"
					type="password"
					name="password"
					required
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
			</div>
			<br />
			<div>
				<Button variant="contained" type="submit" name="submit" value="Log In">
					Log In
				</Button>
			</div>
		</form>
	);
}

export default LoginForm;
