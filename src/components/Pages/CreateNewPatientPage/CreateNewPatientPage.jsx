import { Box } from "@mui/system";
import { Button, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CreateNewPatientPage() {
	const allPatients = useSelector((store) => store.allPatientsReducer);
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

	useEffect(() => {
		dispatch({ type: "FETCH_ALL_PATIENTS" });
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-around",
				flexDirection: "column",
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
			<Paper>
				<h3>Current Patients</h3>
				<table>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Has Treatment Plan?</th>
							<th>DELETE</th>
						</tr>
					</thead>
					<tbody>
						{allPatients.map((patient) => (
							<tr key={patient.id}>
								<td>{patient.first_name}</td>
								<td>{patient.last_name}</td>
								<td>{patient.has_treatment_plan ? "Yes" : "No"}</td>
								<td>
									<Button variant="contained">Delete Patient</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Paper>
		</Box>
	);
}
