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
	Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function ExerciseDocumentationComponent() {
	const dispatch = useDispatch();

	const treatmentPlanInformation = useSelector(
		(store) => store.currentTreatmentPlanReducer
	);

	const exercisesDone = useSelector(
		(store) => store.allExercisesDoneDuringVisitReducer
	);
	const allExercises = useSelector((store) => store.exercisesReducer);
	const variationsForExercises = useSelector(
		(store) => store.exerciseVariationsReducer
	);

	const [exerciseName, setExerciseName] = useState(allExercises[0]);
	const [exerciseNameInput, setExerciseNameInput] = useState("");
	const [exerciseVariation, setExerciseVariation] = useState(
		variationsForExercises[0]
	);
	const [exerciseVariationInput, setExerciseVariationInput] = useState("");

	const [sets, setSets] = useState("");
	const [reps, setReps] = useState("");
	const [notes, setNotes] = useState("");

	const [fieldDisabled, setFieldDisabled] = useState(true);

	function handleSubmit(event) {
		event.preventDefault();
		const exerciseObject = {
			exercise_id: exerciseName.id,
			exercise: exerciseName.exercise_name,
			variation: exerciseVariation.exercise_variation,
			variation_id: exerciseVariation.id,
			sets_done: Number(sets),
			reps_done: Number(reps),
			notes_for_exercise: notes,
		};
		dispatch({
			type: "SET_ALL_EXERCISES_DONE_DURING_VISIT",
			payload: exerciseObject,
		});
		setExerciseName("");
		setExerciseVariation("");
		setSets("");
		setReps("");
		setNotes("");
		setExerciseNameInput("");
		setExerciseVariationInput("");
		setExerciseName(allExercises[0]);
		setExerciseVariation(variationsForExercises[0]);
	}

	useEffect(() => {
		dispatch({ type: "FETCH_EXERCISES" });
	}, []);

	return (
		<Stack
			spacing={2}
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			{/* <pre>{JSON.stringify(exercisesDone)}</pre>
			<pre>{JSON.stringify(allExercises)}</pre>
			<pre>{JSON.stringify(variationsForExercises)}</pre> */}
			{/* <pre>{JSON.stringify(treatmentPlanInformation)}</pre> */}

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
					<Typography component="h4" variant="h4" fontWeight="bold">
						Add Exercise
					</Typography>
					<Typography component="h5" variant="subtitle1">
						A Record of Exercises Will Show Once an Exercise is Added
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
								<Autocomplete
									required
									sx={{
										marginRight: 1,
										marginBottom: 1,
										width: 200,
									}}
									value={exerciseName}
									onChange={(event, newValue) => {
										setExerciseName(newValue);
										setFieldDisabled(false);
										dispatch({
											type: "FETCH_EXERCISE_VARIATIONS",
											payload: newValue.id,
										});
									}}
									inputValue={exerciseNameInput}
									onInputChange={(event, newInputValue) => {
										setExerciseNameInput(newInputValue);
									}}
									id="all-exercises-autofill"
									getOptionLabel={(allExercises) =>
										`${allExercises.exercise_name}`
									}
									renderOption={(props, allExercises) => (
										<Box component="li" {...props} key={allExercises.id}>
											{allExercises.exercise_name}
										</Box>
									)}
									options={allExercises}
									noOptionsText="No exercise with that name"
									renderInput={(params) => (
										<TextField {...params} label="Search Exercises" />
									)}
								/>
								<Autocomplete
									required
									sx={{
										marginRight: 1,
										marginBottom: 1,
										width: 200,
									}}
									value={exerciseVariation}
									onChange={(event, newValue) => {
										setExerciseVariation(newValue);
									}}
									inputValue={exerciseVariationInput}
									onInputChange={(event, newInputValue) => {
										setExerciseVariationInput(newInputValue);
									}}
									id="exercise-variation-autofill"
									getOptionLabel={(variationsForExercises) =>
										`${variationsForExercises.exercise_variation}`
									}
									options={variationsForExercises}
									renderOption={(props, variationsForExercises) => (
										<Box
											component="li"
											{...props}
											key={variationsForExercises.id}
										>
											{variationsForExercises.exercise_variation}
										</Box>
									)}
									noOptionsText="No variation with that name"
									renderInput={(params) => (
										<TextField {...params} label="Search Variations" />
									)}
									disabled={fieldDisabled}
								/>
							</Box>
							<Box>
								<TextField
									required
									label="Sets"
									type="number"
									value={sets}
									onChange={(event) => setSets(event.target.value)}
									sx={{
										marginRight: 1,
										marginBottom: 1,
										width: 200,
									}}
									variant="filled"
								/>
								<TextField
									required
									label="Reps"
									type="number"
									value={reps}
									onChange={(event) => setReps(event.target.value)}
									sx={{
										marginBottom: 1,
										width: 200,
									}}
									variant="filled"
								/>
							</Box>
							<Box>
								<TextField
									label="Notes"
									value={notes}
									onChange={(event) => setNotes(event.target.value)}
									sx={{
										marginBottom: 1,
										width: 200,
									}}
									variant="filled"
								/>
							</Box>
						</Box>
						<Button type="submit" variant="contained">
							Add Exercise
						</Button>
					</form>
				</Stack>
			</Paper>
			{exercisesDone.length > 0 ? (
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
						<Typography component="h4" variant="h4" fontWeight="bold">
							Current Exercises Done
						</Typography>

						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Variation</TableCell>
									<TableCell>Sets</TableCell>
									<TableCell>Reps</TableCell>
									<TableCell>Notes</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{exercisesDone.map((exercise, index) => (
									<TableRow key={index}>
										<TableCell>{exercise.exercise}</TableCell>
										<TableCell>{exercise.variation}</TableCell>
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
			) : (
				""
			)}
		</Stack>
	);
}
