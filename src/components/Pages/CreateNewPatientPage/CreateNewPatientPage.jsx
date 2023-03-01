import {
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
		<Stack
			spacing={2}
			sx={{
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					width: 500,
					padding: 3,
				}}
			>
				<Typography component="h3" variant="h5">
					Enter Patient Name
				</Typography>
				<br />
				<TextField
					label="Enter First Name"
					value={firstName}
					onChange={(event) => setFirstName(event.target.value)}
					sx={{
						marginRight: 3,
					}}
				/>
				<TextField
					label="Enter Last Name "
					value={lastName}
					onChange={(event) => setLastName(event.target.value)}
				/>
				<br />
				<br />
				<Button variant="contained" onClick={addPatient}>
					Add Patient
				</Button>
			</Paper>
			<Paper
				elevation={3}
				sx={{
					width: 500,
					padding: 3,
				}}
			>
				<Typography component="h3" variant="h5">
					Current Patients
				</Typography>
				<TableContainer
					sx={{
						maxHeight: 440,
						maxWidth: 500,
					}}
				>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell align="center">First Name</TableCell>
								<TableCell align="center">Last Name</TableCell>
								<TableCell align="center">Has Treatment Plan?</TableCell>
								<TableCell align="center">Delete Patient</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allPatients.map((patient) => (
								<TableRow key={patient.id}>
									<TableCell align="center">{patient.first_name}</TableCell>
									<TableCell align="center">{patient.last_name}</TableCell>
									<TableCell align="center">
										{patient.has_treatment_plan ? "Yes" : "No"}
									</TableCell>
									<TableCell align="center">
										<Button
											onClick={() =>
												dispatch({
													type: "DELETE_PATIENT",
													payload: patient.id,
												})
											}
										>
											<DeleteForeverIcon />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Stack>
	);
}
