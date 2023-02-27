import React, { useEffect, useState } from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { Autocomplete, Button, Paper, Stack, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";

function UserPage() {
	// this component doesn't do much to start, just renders some user reducer info to the DOM
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((store) => store.user);
	const patientsWithTreatmentPlans = useSelector(
		(store) => store.patientReducer
	);

	const [treatmentPlanId, setTreatmentPlanId] = useState(null);

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
			<Box>
				<h2>Welcome, {user.first_name}!</h2>
				<p>
					Your are a logged in as a{" "}
					{user.is_doctor ? "Doctor" : "Rehab Therapist"}
				</p>
			</Box>
			<Paper
				elevation={3}
				sx={{
					width: 400,
					padding: 3,
				}}
			>
				<h2>Begin Rehab Session</h2>
				<h3>Lookup patient</h3>
				<Autocomplete
					sx={{
						width: 300,
						marginBottom: 2,
					}}
					value={treatmentPlanId}
					onChange={(event, newValue) =>
						setTreatmentPlanId(newValue.treatment_plan_id)
					}
					id="patient-lookup"
					getOptionLabel={(patientsWithTreatmentPlans) =>
						`${patientsWithTreatmentPlans.first_name} ${patientsWithTreatmentPlans.last_name}`
					}
					options={patientsWithTreatmentPlans}
					isOptionEqualToValue={(option, value) =>
						option.treatment_plan_id === value.treatment_plan_id
					}
					noOptionsText={"No patients with this name"}
					renderOption={(props, patientsWithTreatmentPlans) => (
						<Box component="li" {...props} key={patientsWithTreatmentPlans.id}>
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
						history.push(`/rehab/${treatmentPlanId}`);
					}}
				>
					Next
				</Button>
			</Paper>
			<Paper
				elevation={3}
				sx={{
					padding: 3,
				}}
			>
				<h3>Add New Treatment Plan</h3>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push("/make-treatment-plan")}
				>
					Go
				</Button>
			</Paper>
			<Paper
				elevation={3}
				sx={{
					padding: 3,
				}}
			>
				<h3>Add New Patient</h3>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push(`/add-patient`)}
				>
					Go
				</Button>
			</Paper>
		</Stack>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
