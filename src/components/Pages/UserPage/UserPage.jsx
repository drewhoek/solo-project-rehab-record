import React, { useEffect } from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { Box, display, grid } from "@mui/system";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";

function UserPage() {
	// this component doesn't do much to start, just renders some user reducer info to the DOM
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const patientsWithTreatmentPlans = useSelector(
		(store) => store.patientReducer
	);

	useEffect(() => {
		dispatch({ type: "FETCH_PATIENTS_WITH_PLAN" });
	}, []);

	return (
		<Box
			className="container"
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				marginBottom: "10",
			}}
		>
			<Box>
				<h2>Welcome, {user.first_name}!</h2>
				<p>Your are a {user.is_doctor ? "Doctor" : "Rehab Therapist"}</p>
			</Box>
			<br />
			<h2>Begin Rehab Session</h2>
			<Paper sx={{ width: 500 }}>
				<h3>Lookup patient</h3>
				<Autocomplete
					sx={{ width: 300 }}
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
						<Box component="li" {...props} key={patientsWithTreatmentPlans.id}>
							{patientsWithTreatmentPlans.first_name}{" "}
							{patientsWithTreatmentPlans.last_name}
						</Box>
					)}
					renderInput={(params) => (
						<TextField {...params} label="Search for Patient" />
					)}
				/>
			</Paper>
			<Paper>
				<h3>Add New Treatment Plan</h3>
				<Button variant="contained" color="secondary">
					Go
				</Button>
			</Paper>
		</Box>
	);
}

// this allows us to use <App /> in index.js
export default UserPage;
