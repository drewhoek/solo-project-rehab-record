import {
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function ExerciseDocumentationComponent() {
	const dispatch = useDispatch();

	const exercisesDone = useSelector((store) => store.allExercisesDoneReducer);

	const [exerciseName, setExerciseName] = useState(""); //PLACEHOLDER TILL CAN FIGURE OUT AUTOCOMPLETE/DROPDOWN
	const [exerciseVariation, setExerciseVariation] = useState(""); //PLACEHOLDER TILL CAN FIGURE OUT AUTOCOMPLETE/DROPDOWN
	const [sets, setSets] = useState("");
	const [reps, setReps] = useState("");
	const [notes, setNotes] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		const exerciseObject = {
			exercise_id: Number(exerciseName),
			variation_id: Number(exerciseVariation),
			sets_done: Number(sets),
			reps_done: Number(reps),
			notes_for_exercise: notes,
		};
		dispatch({ type: "SET_ALL_EXERCISES_DONE", payload: exerciseObject });
		setExerciseName("");
		setExerciseVariation("");
		setSets("");
		setReps("");
		setNotes("");
	}

	return (
		<Stack
			spacing={2}
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<pre>{JSON.stringify(exercisesDone)}</pre>
			<Paper
				sx={{
					padding: 3,
					width: 600,
				}}
			>
				<Stack
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Typography component="h4" variant="h4">
						Exercise Documentation
					</Typography>
					<br />
					<form onSubmit={handleSubmit}>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								flexDirection: "column",
							}}
						>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<TextField
									label="Exercise Name"
									value={exerciseName}
									onChange={(event) => setExerciseName(event.target.value)}
									sx={{
										marginBottom: 1,
										marginRight: 1,
									}}
								/>
								<TextField
									label="Exercise Variation"
									value={exerciseVariation}
									onChange={(event) => setExerciseVariation(event.target.value)}
									sx={{
										marginBottom: 1,
									}}
								/>
							</Box>
							<Box>
								<TextField
									label="Sets"
									value={sets}
									onChange={(event) => setSets(event.target.value)}
									sx={{
										marginRight: 1,
										marginBottom: 1,
									}}
								/>
								<TextField
									label="Reps"
									value={reps}
									onChange={(event) => setReps(event.target.value)}
									sx={{
										marginBottom: 1,
									}}
								/>
							</Box>
							<Box>
								<TextField
									label="Notes"
									value={notes}
									onChange={(event) => setNotes(event.target.value)}
									sx={{
										marginBottom: 1,
									}}
								/>
							</Box>
						</Box>
						<Button type="submit" variant="contained">
							Add Exercise
						</Button>
					</form>
				</Stack>
			</Paper>
			<Paper
				sx={{
					padding: 3,
					width: 600,
				}}
			>
				<Stack
					sx={{
						alignItems: "center",
					}}
				>
					<Typography component="h4" variant="h4">
						Current Exercises Done
					</Typography>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Exercise Name and Variation</TableCell>
								<TableCell>Sets</TableCell>
								<TableCell>Reps</TableCell>
								<TableCell>Notes</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{exercisesDone.map((exercise) => (
								<TableRow>
									<TableCell>
										{exercise.exercise_id} {exercise.variation_id}
									</TableCell>
									<TableCell>{exercise.sets_done}</TableCell>
									<TableCell>{exercise.reps_done}</TableCell>
									<TableCell>
										{!exercise.notes_for_exercise
											? "No notes"
											: exercise.notes_for_exercise}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Stack>
			</Paper>
		</Stack>
	);
}
