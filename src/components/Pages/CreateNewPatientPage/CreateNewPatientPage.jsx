import { Box } from "@mui/system";
import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CreateNewPatientPage() {
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	function addPatient() {
		const patientObj = {
			first_name: firstName,
			last_name: lastName,
		};
		dispatch({ type: "ADD_PATIENT", payload: patientObj });
		setFirstName("");
		setLastName("");
	}

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				padding={3}
				sx={{
					width: 400,
				}}
			>
				<TextField
					label="Enter First Name"
					value={firstName}
					onChange={(event) => setFirstName(event.target.value)}
				/>
				<TextField
					label="Enter Last Name "
					value={lastName}
					onChange={(event) => setLastName(event.target.value)}
				/>
				<Button variant="contained" onClick={addPatient}>
					Add Patient
				</Button>
			</Paper>
		</Box>
	);
}
