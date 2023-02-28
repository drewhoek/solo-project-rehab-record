import { Button, Table, TextField } from "@mui/material";
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
		<Box>
			<h1>Exercise Documentation</h1>
			<Box>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Exercise Name"
						value={exerciseName}
						onChange={(event) => setExerciseName(event.target.value)}
					/>
					<TextField
						label="Exercise Variation"
						value={exerciseVariation}
						onChange={(event) => setExerciseVariation(event.target.value)}
					/>
					<TextField
						label="Sets"
						value={sets}
						onChange={(event) => setSets(event.target.value)}
					/>
					<TextField
						label="Reps"
						value={reps}
						onChange={(event) => setReps(event.target.value)}
					/>
					<TextField
						label="Notes"
						value={notes}
						onChange={(event) => setNotes(event.target.value)}
					/>
					<Button type="submit" variant="contained">
						Add Exercise
					</Button>
				</form>
			</Box>
			<Box>
				<table>
					<thead>
						<tr>
							<th>Exercise Name and Variation</th>
							<th>Sets</th>
							<th>Reps</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{exercisesDone.map((exercise) => (
							<tr>
								<td>
									{exercise.exercise_id} {exercise.variation_id}
								</td>
								<td>{exercise.sets_done}</td>
								<td>{exercise.reps_done}</td>
								<td>
									{!exercise.notes_for_exercise
										? "No notes"
										: exercise.notes_for_exercise}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Box>
		</Box>
	);
}
