import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	FormControl,
	FormLabel,
	TextField,
	RadioGroup,
	Radio,
	FormControlLabel,
} from "@mui/material";

function RegisterForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [isDoctor, setIsDoctor] = useState(false);
	const errors = useSelector((store) => store.errors);
	const dispatch = useDispatch();

	const registerUser = (event) => {
		event.preventDefault();

		dispatch({
			type: "REGISTER",
			payload: {
				first_name: firstName,
				last_name: lastName,
				username: username,
				password: password,
				is_doctor: isDoctor,
			},
		});
	}; // end registerUser

	return (
		<form className="formPanel" onSubmit={registerUser}>
			<h2>Register User</h2>
			{errors.registrationMessage && (
				<h3 className="alert" role="alert">
					{errors.registrationMessage}
				</h3>
			)}
			<div>
				<FormLabel htmlFor="first_name">
					First Name:
					<TextField
						type="text"
						name="first_name"
						value={firstName}
						required
						onChange={(event) => setFirstName(event.target.value)}
					/>
				</FormLabel>
			</div>
			<div>
				<FormLabel htmlFor="last_name">
					Last Name:
					<TextField
						type="text"
						name="last_name"
						value={lastName}
						required
						onChange={(event) => setLastName(event.target.value)}
					/>
				</FormLabel>
			</div>
			<div>
				<FormLabel htmlFor="username">
					Username:
					<TextField
						type="text"
						name="username"
						value={username}
						required
						onChange={(event) => setUsername(event.target.value)}
					/>
				</FormLabel>
			</div>
			<div>
				<FormLabel htmlFor="password">
					Password:
					<TextField
						type="password"
						name="password"
						value={password}
						required
						onChange={(event) => setPassword(event.target.value)}
					/>
				</FormLabel>
			</div>
			<div>
				<FormLabel htmlFor="is_doctor">Are you a Doctor?:</FormLabel>
				<RadioGroup
					defaultValue="No"
					name="radio-buttons-group"
					onChange={() => {
						setIsDoctor(event.target.value);
					}}
				>
					<FormControlLabel value={true} control={<Radio />} label="Yes" />
					<FormControlLabel value={false} control={<Radio />} label="No" />
				</RadioGroup>
			</div>
			<div>
				<Button
					variant="contained"
					className="btn"
					type="submit"
					value="Register"
				>
					Submit
				</Button>
			</div>
		</form>
	);
}

export default RegisterForm;
