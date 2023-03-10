import React, { useEffect, useState } from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import {
	Autocomplete,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";

function UserPage() {
	// this component doesn't do much to start, just renders some user reducer info to the DOM
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((store) => store.user);
	const patientsWithTreatmentPlans = useSelector(
		(store) => store.patientReducer
	);

	// const [treatmentPlanId, setTreatmentPlanId] = useState(
	// 	patientsWithTreatmentPlans[0]
	// );
	// const [treatmentPlanIdInput, setTreatmentPlanIdInput] = useState("");

	const [patient, setPatient] = useState(patientsWithTreatmentPlans[0]);
	const [patientInput, setPatientInput] = useState("");

	useEffect(() => {
		dispatch({ type: "FETCH_PATIENTS_WITH_PLAN" });
	}, []);

	return (
		<Stack
			className="container"
			spacing={3}
			sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					width: 1 / 2,
				}}
			>
				<Paper
					elevation={3}
					sx={{
						minWidth: 600,
						padding: 3,
					}}
				>
					<Typography
						component="h2"
						variant="h4"
						sx={{
							fontWeight: "bold",
						}}
					>
						Welcome, {user.first_name}!
					</Typography>
					<hr />
					<br />
					<Typography component="p" variant="body1">
						Currently logged in as a{" "}
						{user.is_doctor ? "Doctor" : "Rehab Therapist"}
					</Typography>
				</Paper>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					minWidth: 650,
				}}
			>
				<Card sx={{ maxWidth: 345, minWidth: 300 }} elevation={3}>
					<CardMedia
						sx={{ height: 140 }}
						image="https://res.cloudinary.com/highereducation/image/upload/v1533591754/TheBestColleges.org/chiropractor-1.jpg"
						title="chiropractic consult"
					/>
					<CardContent sx={{ paddingLeft: 3, paddingRight: 3 }}>
						<Typography component="h3" variant="h5">
							Add New Treatment Plan
						</Typography>
					</CardContent>
					<CardActions
						sx={{ paddingLeft: 3, paddingBottom: 3, paddingRight: 3 }}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={() => history.push("/make-treatment-plan")}
						>
							Go
						</Button>
					</CardActions>
				</Card>
				<Card sx={{ maxWidth: 345, minWidth: 300 }} elevation={3}>
					<CardMedia
						sx={{ height: 140 }}
						image="https://www.yestoperfecthealth.com/wp-content/uploads/2020/09/Chiropractic-Irving-TX-New-Patients-Welcome.jpg"
						title="chiropractic new patient visit"
					/>
					<CardContent sx={{ paddingLeft: 3, paddingRight: 3 }}>
						<Typography component="h3" variant="h5">
							Add New Patient
						</Typography>
					</CardContent>
					<CardActions
						sx={{ paddingLeft: 3, paddingBottom: 3, paddingRight: 3 }}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={() => history.push(`/add-patient`)}
						>
							Go
						</Button>
					</CardActions>
				</Card>
			</Box>
			<Paper
				elevation={3}
				sx={{
					minWidth: 600,
					padding: 3,
				}}
			>
				<Typography component="h3" variant="h5" fontWeight="bold">
					View Treatment Plan for Patient
				</Typography>
				<hr />
				<br />
				<Autocomplete
					sx={{
						width: 300,
						marginBottom: 2,
					}}
					value={patient}
					onChange={(event, newValue) => setPatient(newValue)}
					inputValue={patientInput}
					onInputChange={(event, newInputValue) => {
						setPatientInput(newInputValue);
					}}
					id="patient-lookup"
					getOptionLabel={(patientsWithTreatmentPlans) =>
						`${patientsWithTreatmentPlans.first_name} ${patientsWithTreatmentPlans.last_name}`
					}
					options={patientsWithTreatmentPlans}
					isOptionEqualToValue={(option, value) =>
						option.first_name === value.first_name
					}
					noOptionsText={"No patients with this name"}
					renderOption={(props, patientsWithTreatmentPlans) => (
						<Box
							component="li"
							{...props}
							key={patientsWithTreatmentPlans.treatment_plan_id}
						>
							{patientsWithTreatmentPlans.first_name}{" "}
							{patientsWithTreatmentPlans.last_name}
						</Box>
					)}
					renderInput={(params) => (
						<TextField {...params} label="Search for Patient" />
					)}
				/>
				<Button
					variant="contained"
					onClick={() => {
						history.push(`/view-treatment-plan/${patient.treatment_plan_id}`);
						console.log(patient);
					}}
				>
					Next
				</Button>
			</Paper>
		</Stack>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
