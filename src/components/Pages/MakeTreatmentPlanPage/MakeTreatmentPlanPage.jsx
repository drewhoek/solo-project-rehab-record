import { SetMealSharp, VpnLock } from "@mui/icons-material";
import { Button, Paper, TextField, Autocomplete } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MakeTreatmentPlanPage() {
	const dispatch = useDispatch();
	const muscleWorkBank = useSelector((store) => store.muscleWorkReducer);

	// All of the following will be dispatched to the treatment plan saga/reducer
	const [patientId, setPatientId] = useState(0);
	const [unitsOfTherapy, setUnitsOfTherapy] = useState(0);
	const [primaryComplaintArea, setPrimaryComplaintArea] = useState("");
	const [primaryExerciseFocus, setPrimaryExerciseFocus] = useState("");
	const [secondaryExerciseFocus, setSecondaryExerciseFocus] = useState("");
	const [visitCount, setVisitCount] = useState(0);
	const [notes, setNotes] = useState("");

	// This will be sent to the muscle work saga/reducer
	const [muscleWork, setMuscleWork] = useState([]);

	const handleSubmitTreatmentPlan = () => {
		const newTreatmentPlanObject = {
			patient_id: Number(patientId),
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
		});

		// Sets patient info column has_treatment_plan to TRUE
		dispatch({ type: "UPDATE_PATIENT_INFO", payload: patientId });

		setPatientId(0);
		setUnitsOfTherapy(0);
		setPrimaryComplaintArea("");
		setPrimaryExerciseFocus("");
		setSecondaryExerciseFocus("");
		setVisitCount(0);
		setNotes("");
	};

	// function handleSubmitMuscleWork() {
	// 	const muscleWorkObject = {
	// 		muscle_work_id:
	// 		treatment_plan_id:
	// 	}
	// }

	useEffect(() => {
		dispatch({ type: "FETCH_MUSCLE_WORK" });
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<h2>Create a New Treatment Plan</h2>
			<h4>Get Corresponding Information from PCP</h4>
			<Paper
				elevation={3}
				sx={{
					width: 600,
					padding: 3,
				}}
			>
				<TextField
					label="Patient ID"
					required
					type="number"
					value={patientId}
					onChange={(event) => setPatientId(event.target.value)}
				/>
				<TextField
					required
					type="number"
					label="Units of Therapy"
					value={unitsOfTherapy}
					onChange={(event) => setUnitsOfTherapy(event.target.value)}
				/>
				<TextField
					required
					label="Primary Area of Complaint"
					value={primaryComplaintArea}
					onChange={(event) => setPrimaryComplaintArea(event.target.value)}
				/>
				<TextField
					required
					label="Primary Exercise Focus"
					value={primaryExerciseFocus}
					onChange={(event) => setPrimaryExerciseFocus(event.target.value)}
				/>
				<TextField
					required
					label="Secondary Exercise Focus"
					value={secondaryExerciseFocus}
					onChange={(event) => setSecondaryExerciseFocus(event.target.value)}
				/>
				<TextField
					required
					type="number"
					label="Visit Count"
					value={visitCount}
					onChange={(event) => setVisitCount(event.target.value)}
				/>
				<TextField
					required
					label="Notes for Rehab"
					value={notes}
					onChange={(event) => setNotes(event.target.value)}
				/>
				<Button
					variant="contained"
					type="button"
					onClick={handleSubmitTreatmentPlan}
				>
					Add
				</Button>
				<Box>
					<select
						onDoubleClick={(event) => {
							setMuscleWork([...muscleWork, event.target]);
							console.log(event.target.value);
						}}
						multiple={true}
					>
						{muscleWorkBank.map((muscleWorkItem) => (
							<option value={muscleWorkItem.id}>
								{muscleWorkItem.muscle_work_name}{" "}
								{muscleWorkItem.muscle_work_type}
							</option>
						))}
					</select>
					{/* <Autocomplete
						value={muscleWork}
						onChange={(event, newValue) => {
							setMuscleWork([...muscleWork, newValue]);
							console.log(muscleWork);
						}}
						sx={{
							width: 600,
							marginBottom: 2,
						}}
						id="muscle-work-lookup"
						getOptionLabel={(muscleWorkBank) =>
							`${muscleWorkBank.id} ${muscleWorkBank.muscle_work_name} ${muscleWorkBank.muscle_work_type}`
						}
						options={muscleWorkBank}
						isOptionEqualToValue={(option, value) =>
							option.muscle_work_name === value.muscle_work_name
						}
						noOptionsText={"Not valid muscle work"}
						renderOption={(props, muscleWorkBank) => (
							<Box component="li" {...props} key={muscleWorkBank.id}>
								{muscleWorkBank.muscle_work_name}{" "}
								{muscleWorkBank.muscle_work_type}
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Search for Muscle Work"
								placeholder="Search"
							/>
						)}
					/>{" "} */}
					<ul>
						{muscleWork.map((individualMuscleWork) => (
							<li key={individualMuscleWork.id}>{individualMuscleWork.text}</li>
						))}
					</ul>
					<Button
						onClick={() =>
							dispatch({
								type: "ADD_MUSCLE_WORK_TO_BE_DONE",
								payload: muscleWork,
							})
						}
					>
						Submit
					</Button>
				</Box>
			</Paper>
		</Box>
	);
}
