import { Box, Stack } from "@mui/system";
import {
	Paper,
	Button,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

export default function ViewPlanPage() {
	const dispatch = useDispatch();
	const params = useParams();
	const history = useHistory();
	const treatmentPlanId = Number(params.id);

	const treatmentPlanInformation = useSelector(
		(store) => store.currentTreatmentPlanReducer
	);

	const lastVisitInformation = useSelector(
		(store) => store.visitInformationReducer
	);

	const muscleWorkToBeDoneInformation = useSelector(
		(store) => store.muscleWorkToBeDoneReducer
	);

	const exercisesDoneLastVisit = useSelector(
		(store) => store.allExercisesDoneReducer
	);

	let newDate = moment.utc(lastVisitInformation.date).format("MMM Do, YYYY");

	useEffect(() => {
		dispatch({
			type: "FETCH_PREVIOUS_VISIT_INFORMATION",
			payload: treatmentPlanId,
		});
		dispatch({
			type: "FETCH_CURRENT_TREATMENT_PLAN",
			payload: treatmentPlanId,
		});
		dispatch({
			type: "FETCH_MUSCLE_WORK_TO_BE_DONE",
			payload: treatmentPlanId,
		});
	}, []);

	useEffect(() => {
		if (lastVisitInformation.id !== undefined) {
			dispatch({
				type: "FETCH_ALL_EXERCISES_DONE",
				payload: lastVisitInformation.id,
			});
		}
	}, [lastVisitInformation]);

	return (
		<Stack spacing={2}>
			{/* <pre>{JSON.stringify(lastVisitInformation)}</pre>
			<pre>{JSON.stringify(treatmentPlanInformation)}</pre>
			<pre>{JSON.stringify(muscleWorkToBeDoneInformation)}</pre>
			<pre>{JSON.stringify(exercisesDoneLastVisit)}</pre> */}

			<Typography variant="h2" component="h2">
				Viewing Current Treatment Plan For {treatmentPlanInformation.first_name}{" "}
				{treatmentPlanInformation.last_name}
			</Typography>
			<Paper
				elevation={3}
				sx={{
					width: 300,
				}}
			>
				<Typography variant="subtitle1" component="h3">
					Treatment Plan Information
				</Typography>

				<Typography variant="subtitle1" component="h3">
					Complaint Area: {treatmentPlanInformation.primary_complaint_area}
				</Typography>
				<Typography variant="subtitle1" component="h3">
					Primary Exercise Focus:{" "}
					{treatmentPlanInformation.primary_exercise_focus}
				</Typography>
				<Typography variant="subtitle1" component="h3">
					Secondary Exercise Focus:{" "}
					{treatmentPlanInformation.secondary_exercise_focus}
				</Typography>
				<h4>Muscle work to be completed during rehab visit</h4>
				<ul>
					{muscleWorkToBeDoneInformation.map((muscleWork) => (
						<li key={muscleWork.id}>
							{muscleWork.muscle_work_name} {muscleWork.muscle_work_type}
						</li>
					))}
				</ul>
			</Paper>
			{!lastVisitInformation ? (
				<Typography>No previous information visit information</Typography>
			) : (
				<>
					<Typography>Last Visit Date: {newDate}</Typography>
					<Typography>
						{lastVisitInformation.units_completed} units completed Last Visit
					</Typography>
					<Typography>Exercises Done Last Visit:</Typography>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Exercise Name</TableCell>
								<TableCell>Exercise Variation</TableCell>
								<TableCell>Sets Done</TableCell>
								<TableCell>Reps Done</TableCell>
								<TableCell>Notes</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{exercisesDoneLastVisit.map((exercise) => (
								<TableRow key={exercise.id}>
									<TableCell>{exercise.exercise_name}</TableCell>
									<TableCell>{exercise.exercise_variation}</TableCell>
									<TableCell>{exercise.sets_done}</TableCell>
									<TableCell>{exercise.reps_done}</TableCell>
									<TableCell>
										{exercise.notes_for_exercise
											? exercise.notes_for_exercise
											: "None"}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<img
						src="http://www.learnmuscles.com/wp-content/uploads/2017/08/figure_1-16B.jpg"
						width={200}
						height={350}
					/>
				</>
			)}
			<Paper
				sx={{
					width: 400,
					padding: 3,
				}}
			>
				Start a Rehab Visit for this Treatment Plan
				<Button variant="contained" onClick={() => history.push("/rehab")}>
					Go
				</Button>
			</Paper>
		</Stack>
	);
}
