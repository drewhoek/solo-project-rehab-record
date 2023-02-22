import { Button, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function MakeTreatmentPlanPage() {
	const dispatch = useDispatch();

	// All of the following will be dispatched to the treatment plan saga/reducer
	const [patientId, setPatientId] = useState(null);
	const [unitsOfTherapy, setUnitsOfTherapy] = useState(null);
	const [primaryComplaintArea, setPrimaryComplaintArea] = useState("");
	const [primaryExerciseFocus, setPrimaryExerciseFocus] = useState("");
	const [secondaryExerciseFocus, setSecondaryExerciseFocus] = useState("");
	const [visitCount, setVisitCount] = useState(0);
	const [coconutAllergy, setCoconutAllergy] = useState(false);
	const [notes, setNotes] = useState("");

	// This will be sent to the muscle work saga/reducer
	const [muscleWork, setMuscleWork] = useState([]);

	const handleSubmitTreatmentPlan = () => {
		const newTreatmentPlanObject = {
			patient_id: patientId,
			visit_count: visitCount,
			primary_complaint_area: primaryComplaintArea,
			primary_exercise_focus: primaryExerciseFocus,
			secondary_exercise_focus: secondaryExerciseFocus,
			units: unitsOfTherapy,
			coconut_allergy: coconutAllergy,
		};
		dispatch({ type: "ADD_TREATMENT_PLAN", payload: newTreatmentPlanObject });
	};

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
					width: 800,
					padding: 3,
				}}
			>
				<form>
					<TextField label="Patient Name" />
					{/*this will eventually be an autofill*/}
					<TextField label="Units of Therapy" />
					<TextField label="Primary Area of Complaint" />
					<TextField label="Primary Exercise Focus" />
					<TextField label="Secondary Exercise Focus" />
					<TextField label="Muscle Work" />
					{/*this will eventually be an autofill*/}
					<TextField label="Visit Count" />
					<TextField label="Coconut Allergy" />
					<TextField label="Noted for Rehab" />
					<Button variant="contained" onClick={handleSubmitTreatmentPlan}>
						Add
					</Button>
				</form>
			</Paper>
		</Box>
	);
}
