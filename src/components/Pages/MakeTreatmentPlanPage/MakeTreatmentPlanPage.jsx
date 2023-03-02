import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
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
			<Paper
				elevation={3}
				sx={{
					width: 600,
					padding: 3,
				}}
			>
				<Box>
					<Typography component="h3" variant="h5">
						Create a New Treatment Plan
					</Typography>
					<Typography component="h5" variant="h6">
						Get Corresponding Information from PCP
					</Typography>
				</Box>
				<br />
				<Stack
					sx={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<TextField
						label="Patient ID"
						required
						type="number"
						value={patientId}
						variant="filled"
						sx={{
							marginBottom: 1,
						}}
						onChange={(event) => setPatientId(event.target.value)}
					/>
					<TextField
						required
						type="number"
						label="Units of Therapy"
						value={unitsOfTherapy}
						variant="filled"
						sx={{
							marginBottom: 1,
						}}
						onChange={(event) => setUnitsOfTherapy(event.target.value)}
					/>
					<TextField
						required
						label="Primary Area of Complaint"
						value={primaryComplaintArea}
						variant="filled"
						sx={{
							marginBottom: 1,
							width: 250,
						}}
						onChange={(event) => setPrimaryComplaintArea(event.target.value)}
					/>
					<TextField
						required
						label="Primary Exercise Focus"
						value={primaryExerciseFocus}
						variant="filled"
						sx={{
							marginBottom: 1,
							width: 250,
						}}
						onChange={(event) => setPrimaryExerciseFocus(event.target.value)}
					/>
					<TextField
						required
						label="Secondary Exercise Focus"
						value={secondaryExerciseFocus}
						variant="filled"
						sx={{
							marginBottom: 1,
							width: 250,
						}}
						onChange={(event) => setSecondaryExerciseFocus(event.target.value)}
					/>
					<TextField
						required
						type="number"
						label="Visit Count"
						value={visitCount}
						variant="filled"
						sx={{
							marginBottom: 1,
						}}
						onChange={(event) => setVisitCount(event.target.value)}
					/>
					<TextField
						multiline
						rows={4}
						label="Notes for Rehab"
						value={notes}
						variant="filled"
						sx={{
							marginBottom: 1,
						}}
						onChange={(event) => setNotes(event.target.value)}
					/>
				</Stack>
				<br />
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
		</Box>
	);
}
