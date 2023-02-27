import { Paper, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

export default function ReviewRehabComponent() {
	const dispatch = useDispatch();

	const exerciseInformation = useSelector(
		(store) => store.allExercisesDoneReducer
	);

	const timeInformation = useSelector((store) => store.rehabTimerReducer);

	const muscleWorkInformation = useSelector(
		(store) => store.muscleWorkToBeDoneReducer
	);

	const therapist = useSelector((store) => store.user);

	function submitVisitInformation() {
		const visitInfoObject = {
			date: timeInformation.date,
			time_in: timeInformation.time_in,
			time_out: timeInformation.time_out,
			total_time: timeInformation.total_time,
			therapist: therapist.id,
			units_completed: determineUnits(timeInformation.total_time),
			treatment_plan_id: muscleWorkInformation[0].treatment_plan_id,
		};
		dispatch({ type: "ADD_VISIT_INFORMATION", payload: visitInfoObject });
	}

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

	function submitExerciseInformation() {
		for (let i = 0; i < exerciseInformation.length; i++) {
			const exercise = exerciseInformation[i];
			const exercisesDoneObj = {
				exercise_id: exercise.exercise_id,
				variation_id: exercise.variation_id,
				sets_done: exercise.sets_done,
				reps_done: exercise.reps_done,
				notes_for_exercise: exercise.notes_for_exercise,
				// visit_information_id:
			};
		}
	}

	return (
		<>
			<h1>Review Information</h1>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-around",
				}}
			>
				<Paper
					sx={{
						width: 200,
					}}
				>
					Review Time
					<h4>Date: {timeInformation.date}</h4>
					<h4>Time In: {timeInformation.time_in}</h4>
					<h4>Time Out: {timeInformation.time_out}</h4>
					<h4>Total Time: {timeInformation.total_time}</h4>
				</Paper>
				<Paper
					sx={{
						width: 200,
					}}
				>
					Review Exercises Done
					{/* <pre>{JSON.stringify(exerciseInformation)}</pre> */}
					{exerciseInformation.map((exercise) => (
						<Box key={exercise.exercise_id}>
							<h3>Exercise Name: {exercise.exercise_id}</h3>
							<ul>
								<li>Exercise Variation: {exercise.variation_id}</li>
								<li>Sets: {exercise.sets_done}</li>
								<li>Reps: {exercise.reps_done}</li>
								<li>Notes: {exercise.notes_for_exercise}</li>
							</ul>
						</Box>
					))}
				</Paper>
				<Paper
					sx={{
						width: 200,
					}}
				>
					Review Muscle Work Done
					{/* <pre>{JSON.stringify(muscleWorkInformation)}</pre> */}
					{muscleWorkInformation.map((muscleWork) => (
						<Box key={muscleWork.exercise_id}>
							<ul>
								<li>Muscle Work Name: {muscleWork.muscle_work_name} </li>
								<li>Muscle Work Type: {muscleWork.muscle_work_type}</li>
								<li>Completed: {muscleWork.is_done ? "Yes" : "No"}</li>
							</ul>
						</Box>
					))}
				</Paper>
				<Button variant="contained" onClick={submitExerciseInformation}>
					Submit Everything
				</Button>
			</Box>
		</>
	);
}
