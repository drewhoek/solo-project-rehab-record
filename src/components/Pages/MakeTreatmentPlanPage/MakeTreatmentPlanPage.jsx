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
	const [visitCount, setVisitCount] = useState(null);
	const [coconutAllergy, setCoconutAllergy] = useState(null);
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
				<form onSubmit={handleSubmitTreatmentPlan}>
					<TextField label="Patient Name" />
					{/*this will eventually be an autofill*/}
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
						onChange={(event) => secondaryExerciseFocus(event.target.value)}
					/>
					<TextField label="Muscle Work" />
					{/*this will eventually be an autofill*/}
					<TextField
						required
						type="number"
						label="Visit Count"
						value={visitCount}
						onChange={(event) => setVisitCount(event.target.value)}
					/>
					<TextField
						required
						label="Coconut Allergy"
						value={coconutAllergy}
						onChange={(event) => setCoconutAllergy(event.target.value)}
					/>
					<TextField
						required
						label="Notes for Rehab"
						value={notes}
						onChange={(event) => setNotes(event.target.value)}
					/>
					<Button variant="contained" type="submit">
						Add
					</Button>
				</form>
			</Paper>
		</Box>
	);
}
