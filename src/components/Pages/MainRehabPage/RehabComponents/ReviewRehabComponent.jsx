import { Paper, Box, Typography, List, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { Stack } from "@mui/system";

export default function ReviewRehabComponent() {
	const dispatch = useDispatch();
	const params = useParams();
	const history = useHistory();

	const visitId = params.id;

	const exerciseInformation = useSelector(
		(store) => store.allExercisesDoneDuringVisitReducer
	);

	const timeInformation = useSelector((store) => store.rehabTimerReducer);

	const muscleWorkInformation = useSelector(
		(store) => store.muscleWorkToBeDonePerSessionReducer
	);

	function determineUnits(num) {
		let units_completed = 0;
		if (num >= 8 && num < 23) {
			units_completed = 1;
		} else if (num >= 23 && num < 38) {
			units_completed = 2;
		} else if (num >= 38 && num < 54) {
			units_completed = 3;
		} else if (num < 8) {
			units_completed = 0;
		} else if (num >= 54) {
			units_completed = 4;
		}
		return units_completed;
	}

	function handleSubmitInformation() {
		const visitInfoObject = {
			visit_id: visitId,
			date: timeInformation.date,
			time_in: timeInformation.time_in,
			time_out: timeInformation.time_out,
			total_time: timeInformation.total_time,
			unit_completed: determineUnits(timeInformation.total_time),
		};
		dispatch({ type: "UPDATE_VISIT_INFORMATION", payload: visitInfoObject });

		for (let i = 0; i < exerciseInformation.length; i++) {
			const exercise = exerciseInformation[i];
			const exercisesObject = {
				exercise_id: exercise.exercise_id,
				variation_id: exercise.variation_id,
				sets_done: exercise.sets_done,
				reps_done: exercise.reps_done,
				notes_for_exercise: exercise.notes_for_exercise,
				visit_information_id: Number(visitId),
			};
			dispatch({
				type: "ADD_EXERCISE_DONE_DURING_VISIT",
				payload: exercisesObject,
			});
		}
		dispatch({ type: "UNSET_ALL_EXERCISES_DONE_DURING_VISIT" });
		dispatch({ type: "UNSET_TIME_AND_DATE" });
		history.push("/user");
	}

	return (
		<Stack
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					padding: 3,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: 700,
				}}
			>
				<Typography component="h4" variant="h4">
					Review
				</Typography>
				{/* <pre>{JSON.stringify(exerciseInformation)}</pre> */}

				<br />
				<Typography component="h5" variant="h6">
					Review all info and finish when ready
				</Typography>
				<br />
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
					}}
				>
					<Paper
						elevation={3}
						sx={{
							width: 175,
							marginRight: 1,
							padding: 3,
						}}
					>
						<Typography
							component="h5"
							variant="h5"
							sx={{
								textDecoration: "underline",
							}}
						>
							Time/Units
						</Typography>
						<br />
						<Typography component="h4" variant="h6">
							Date: {timeInformation.date}
						</Typography>
						<Typography component="h4" variant="h6">
							Time In: {timeInformation.time_in}
						</Typography>
						<Typography component="h4" variant="h6">
							Time Out: {timeInformation.time_out}
						</Typography>
						<Typography component="h4" variant="h6">
							Total Time: {timeInformation.total_time}
						</Typography>
					</Paper>
					<Paper
						elevation={3}
						sx={{
							width: 175,
							marginRight: 1,
							padding: 3,
						}}
					>
						<Typography
							component="h5"
							variant="h5"
							sx={{
								textDecoration: "underline",
							}}
						>
							Exercises
						</Typography>
						{exerciseInformation.map((exercise) => (
							<Stack key={exercise.exercise_id} spacing={1}>
								<List>
									<Typography component="h4" variant="h6">
										Name: {exercise.exercise}
									</Typography>
									<ListItem>Variation: {exercise.variation}</ListItem>
									<ListItem>Sets: {exercise.sets_done}</ListItem>
									<ListItem>Reps: {exercise.reps_done}</ListItem>

									{exercise.notes_for_exercise ? (
										<ListItem>Notes: {exercise.notes_for_exercise}</ListItem>
									) : (
										""
									)}
									<hr />
								</List>
								<br />
							</Stack>
						))}
					</Paper>
					<Paper
						elevation={3}
						sx={{
							width: 175,
							padding: 3,
						}}
					>
						<Typography
							component="h5"
							variant="h5"
							sx={{
								textDecoration: "underline",
							}}
						>
							Muscle Work
						</Typography>
						{muscleWorkInformation.map((muscleWork) => (
							<Stack key={muscleWork.exercise_id} spacing={1}>
								<List>
									<ListItem>Name: {muscleWork.muscle_work_name} </ListItem>
									<ListItem>Type: {muscleWork.muscle_work_type}</ListItem>
									<ListItem>
										Completed?: {muscleWork.is_done ? "Yes" : "No"}
									</ListItem>
								</List>
								<hr />
							</Stack>
						))}
					</Paper>
				</Box>
				<br />
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Button variant="contained" onClick={handleSubmitInformation}>
						FINISH
					</Button>
				</Box>
			</Paper>
		</Stack>
	);
}
