import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function MakeTreatmentPlanPage() {
	const dispatch = useDispatch();
	const history = useHistory();

	// All of the following will be dispatched to the treatment plan saga/reducer
	const [patientId, setPatientId] = useState("");
	const [unitsOfTherapy, setUnitsOfTherapy] = useState("");
	const [primaryComplaintArea, setPrimaryComplaintArea] = useState("");
	const [primaryExerciseFocus, setPrimaryExerciseFocus] = useState("");
	const [secondaryExerciseFocus, setSecondaryExerciseFocus] = useState("");
	const [visitCount, setVisitCount] = useState("");
	const [notes, setNotes] = useState("");

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
			history: history,
		});

		// Sets patient info column has_treatment_plan to TRUE
		dispatch({ type: "UPDATE_PATIENT_INFO", payload: patientId });

		setPatientId("");
		setUnitsOfTherapy("");
		setPrimaryComplaintArea("");
		setPrimaryExerciseFocus("");
		setSecondaryExerciseFocus("");
		setVisitCount("");
		setNotes("");
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography component="h3" variant="h5">
				Create a New Treatment Plan
			</Typography>
			<Typography component="h5" variant="h6">
				Get Corresponding Information from PCP
			</Typography>
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
				<br />
				<br />
				<Button
					variant="contained"
					type="button"
					onClick={handleSubmitTreatmentPlan}
				>
					Add
				</Button>
			</Paper>
		</Box>
	);
}
