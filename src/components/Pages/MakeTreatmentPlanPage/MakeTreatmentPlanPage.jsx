import {
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
	Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function MakeTreatmentPlanPage() {
	const dispatch = useDispatch();
	const history = useHistory();

	const patientsWithoutPlans = useSelector(
		(store) => store.patientsWithoutPlansReducer
	);

	// All of the following will be dispatched to the treatment plan saga/reducer
	const [unitsOfTherapy, setUnitsOfTherapy] = useState("");
	const [primaryComplaintArea, setPrimaryComplaintArea] = useState("");
	const [primaryExerciseFocus, setPrimaryExerciseFocus] = useState("");
	const [secondaryExerciseFocus, setSecondaryExerciseFocus] = useState("");
	const [visitCount, setVisitCount] = useState("");
	const [notes, setNotes] = useState("");

	const [patient, setPatient] = useState(patientsWithoutPlans[0]);
	const [patientInput, setPatientInput] = useState("");

	const handleSubmitTreatmentPlan = () => {
		const newTreatmentPlanObject = {
			patient_id: Number(patient.id),
			visit_count: Number(visitCount),
			primary_complaint_area: primaryComplaintArea,
			primary_exercise_focus: primaryExerciseFocus,
			secondary_exercise_focus: secondaryExerciseFocus,
			notes_for_rehab: notes,
			units: Number(unitsOfTherapy),
		};
		console.log(newTreatmentPlanObject);
		// Creates new treatment plan
		dispatch({
			type: "ADD_TREATMENT_PLAN",
			payload: newTreatmentPlanObject,
			history: history,
		});

		// Sets patient info column has_treatment_plan to TRUE
		dispatch({ type: "UPDATE_PATIENT_INFO", payload: patient.id });

		setUnitsOfTherapy("");
		setPrimaryComplaintArea("");
		setPrimaryExerciseFocus("");
		setSecondaryExerciseFocus("");
		setVisitCount("");
		setNotes("");
	};

	useEffect(() => {
		dispatch({ type: "FETCH_PATIENTS_WITHOUT_PLAN" });
	}, []);

	return (
		<Stack
			className="container"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					width: 600,
					padding: 3,
				}}
			>
				<Box>
					<Typography component="h3" variant="h4" fontWeight="bold">
						Create a New Treatment Plan
					</Typography>
					<Typography component="h5" variant="h6">
						Get Corresponding Information from Doctor
					</Typography>
				</Box>
				<br />
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Box>
						<Stack
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "space-between",
								alignItems: "flex-start",
							}}
						>
							<Autocomplete
								sx={{
									width: 300,
									marginBottom: 2,
								}}
								value={patient}
								onChange={(event, newValue) => setPatient(newValue)}
								inputValue={patientInput}
								onInputChange={(event, newInputValue) =>
									setPatientInput(newInputValue)
								}
								id="patient-without-plan-lookup"
								getOptionLabel={(patientsWithoutPlans) =>
									`${patientsWithoutPlans.first_name} ${patientsWithoutPlans.last_name}`
								}
								options={patientsWithoutPlans}
								isOptionEqualToValue={(option, value) =>
									option.first_name === value.first_name
								}
								noOptionsText={"No patients with this name"}
								renderOption={(props, patientsWithoutPlans) => (
									<Box component="li" {...props} key={patientsWithoutPlans.id}>
										{patientsWithoutPlans.first_name}{" "}
										{patientsWithoutPlans.last_name}
									</Box>
								)}
								renderInput={(params) => (
									<TextField {...params} label="Search for Patient" />
								)}
							/>
							<TextField
								required
								type="number"
								label="Visit Count"
								value={visitCount}
								sx={{
									marginBottom: 1,
									width: 300,
								}}
								onChange={(event) => setVisitCount(event.target.value)}
								variant="filled"
							/>
							<TextField
								required
								type="number"
								label="Units of Therapy"
								value={unitsOfTherapy}
								sx={{
									marginBottom: 1,
									width: 300,
								}}
								onChange={(event) => setUnitsOfTherapy(event.target.value)}
								variant="filled"
							/>
							<TextField
								required
								label="Primary Area of Complaint"
								value={primaryComplaintArea}
								sx={{
									marginBottom: 1,
									width: 300,
								}}
								onChange={(event) =>
									setPrimaryComplaintArea(event.target.value)
								}
								variant="filled"
							/>
							<TextField
								required
								label="Primary Exercise Focus"
								value={primaryExerciseFocus}
								sx={{
									marginBottom: 1,
									width: 300,
								}}
								onChange={(event) =>
									setPrimaryExerciseFocus(event.target.value)
								}
								variant="filled"
							/>
							<TextField
								required
								label="Secondary Exercise Focus"
								value={secondaryExerciseFocus}
								sx={{
									marginBottom: 1,
									width: 300,
								}}
								onChange={(event) =>
									setSecondaryExerciseFocus(event.target.value)
								}
								variant="filled"
							/>

							<TextField
								multiline
								rows={4}
								label="Notes for Rehab"
								value={notes}
								sx={{
									marginBottom: 1,
									width: 300,
								}}
								onChange={(event) => setNotes(event.target.value)}
								variant="filled"
							/>
						</Stack>
					</Box>
					<Box>
						<img
							width="300px"
							src="https://res.cloudinary.com/im2015/image/upload/c_thumb,g_center,h_500,w_500/blog/spine_anatomy.jpg"
						/>
					</Box>
				</Box>
				<br />
				<Box>
					<Button
						variant="contained"
						type="button"
						onClick={handleSubmitTreatmentPlan}
					>
						Add
					</Button>
				</Box>
			</Paper>
		</Stack>
	);
}
