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
	Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";

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
		<Stack
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<form className="formPanel" onSubmit={registerUser}>
				<Typography component="h2" variant="h5">
					Register User
				</Typography>
				{errors.registrationMessage && (
					<Typography
						component="h3"
						variant="h6"
						className="alert"
						role="alert"
					>
						{errors.registrationMessage}
					</Typography>
				)}
				<br />
				<Typography component="p" variant="caption">
					Please fill out all information below
				</Typography>
				<div>
					<TextField
						type="text"
						name="first_name"
						value={firstName}
						label="First Name"
						required
						onChange={(event) => setFirstName(event.target.value)}
					/>
				</div>
				<br />
				<div>
					<TextField
						type="text"
						name="last_name"
						value={lastName}
						label="Last Name"
						required
						onChange={(event) => setLastName(event.target.value)}
					/>
				</div>
				<br />
				<div>
					<TextField
						type="text"
						name="username"
						value={username}
						label="Create Username"
						required
						onChange={(event) => setUsername(event.target.value)}
					/>
				</div>
				<br />
				<div>
					<TextField
						type="password"
						name="password"
						value={password}
						label="Create Password"
						required
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>
				<br />
				{/* <div>
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
			</div> */}
				<br />
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Button
						variant="contained"
						className="btn"
						type="submit"
						value="Register"
					>
						Submit
					</Button>
				</Box>
			</form>
		</Stack>
	);
}

export default RegisterForm;
