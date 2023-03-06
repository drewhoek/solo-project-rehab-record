import { Paper, Box, Typography, List, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { Stack } from "@mui/system";

export default function ReviewRehabComponent() {
	const dispatch = useDispatch();
	const params = useParams();
	const history = useHistory();

	const visitId = Number(params.id);

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

	function isAllMuscleWorkDone() {
		for (const muscleWork of muscleWorkInformation) {
			if (!muscleWork.is_done) {
				return false;
			}
		}
		return true;
	}

	function handleSubmitInformation() {
		const visitInfoObject = {
			visit_id: visitId,
			date: timeInformation.date,
			time_in: timeInformation.time_in,
			time_out: timeInformation.time_out,
			total_time: timeInformation.total_time,
			units_completed: determineUnits(timeInformation.total_time),
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
					width: 600,
				}}
			>
				<Typography component="h4" variant="h4" fontWeight="bold">
					Review
				</Typography>
				<Typography component="h5" variant="h6">
					Review Info and Finish When Ready
				</Typography>
				<br />
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-evenly",
						width: 600,
					}}
				>
					<Box>
						<Typography
							component="h5"
							variant="h6"
							sx={{
								textDecoration: "underline",
							}}
						>
							Time/Units
						</Typography>
						<Typography component="h4" variant="body1">
							Date: {timeInformation.date}
						</Typography>
						<Typography component="h4" variant="body1">
							Time In: {timeInformation.time_in}
						</Typography>
						<Typography component="h4" variant="body1">
							Time Out: {timeInformation.time_out}
						</Typography>
						<Typography component="h4" variant="body1">
							Total Time: {timeInformation.total_time}
						</Typography>
					</Box>
					<Box>
						<Typography
							component="h5"
							variant="h6"
							sx={{
								textDecoration: "underline",
							}}
						>
							Exercises Done
						</Typography>
						<Stack
							sx={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<Box>
								<Typography component="h4" variant="h6">
									{exerciseInformation.length}
								</Typography>
							</Box>
						</Stack>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box>
							<Typography
								component="h5"
								variant="h6"
								sx={{
									textDecoration: "underline",
								}}
							>
								Is All Muscle Work Done?
							</Typography>
						</Box>
						<Stack
							sx={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<Box>
								<Typography component="h6" variant="h6">
									{isAllMuscleWorkDone(muscleWorkInformation) ? "Yes!" : "No"}
								</Typography>
							</Box>
						</Stack>
					</Box>
				</Box>
				<br />
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					{timeInformation.date ? (
						<Button variant="contained" onClick={handleSubmitInformation}>
							FINISH
						</Button>
					) : (
						""
					)}
				</Box>
			</Paper>
		</Stack>
	);
}
