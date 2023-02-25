import { Paper, Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function ReviewRehabComponent() {
	const exerciseInformation = useSelector(
		(store) => store.allExercisesDoneReducer
	);

	const timeInformation = useSelector((store) => store.rehabTimerReducer);

	const muscleWorkInformation = useSelector(
		(store) => store.muscleWorkToBeDoneReducer
	);

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
			</Box>
		</>
	);
}
