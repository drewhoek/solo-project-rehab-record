import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
				<label htmlFor="first_name">
					First Name:
					<input
						type="text"
						name="first_name"
						value={firstName}
						required
						onChange={(event) => setFirstName(event.target.value)}
					/>
				</label>
			</div>
			<div>
				<label htmlFor="last_name">
					Last Name:
					<input
						type="text"
						name="last_name"
						value={lastName}
						required
						onChange={(event) => setLastName(event.target.value)}
					/>
				</label>
			</div>
			<div>
				<label htmlFor="username">
					Username:
					<input
						type="text"
						name="username"
						value={username}
						required
						onChange={(event) => setUsername(event.target.value)}
					/>
				</label>
			</div>
			<div>
				<label htmlFor="password">
					Password:
					<input
						type="password"
						name="password"
						value={password}
						required
						onChange={(event) => setPassword(event.target.value)}
					/>
				</label>
			</div>
			<div>
				<label htmlFor="username">
					Are you a Doctor?:
					<input
						type="text"
						name="is_doctor"
						value={isDoctor}
						required
						onChange={(event) => setIsDoctor(event.target.value)}
					/>
				</label>
			</div>
			<div>
				<input className="btn" type="submit" name="submit" value="Register" />
			</div>
		</form>
	);
}

export default RegisterForm;
