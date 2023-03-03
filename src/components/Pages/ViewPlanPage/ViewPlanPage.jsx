import { Stack } from "@mui/system";
import {
	Paper,
	Button,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	Typography,
	List,
	ListItem,
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

	function startVisit() {
		const arrayOfMuscleWorkIds = [];
		for (let i = 0; i < muscleWorkToBeDoneInformation.length; i++) {
			const muscleWorkToBeDoneId = muscleWorkToBeDoneInformation[i].id;
			console.log(arrayOfMuscleWorkIds);
			arrayOfMuscleWorkIds.push(muscleWorkToBeDoneId);
		}
		const startingVisitObject = {
			treatment_plan_id: treatmentPlanId,
			array_of_muscle_work_ids: arrayOfMuscleWorkIds,
		};
		dispatch({
			type: "ADD_VISIT_INFORMATION",
			payload: startingVisitObject,
			history,
		});
	}

	return (
		<Stack
			className="container"
			spacing={2}
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			{/* <pre>{JSON.stringify(lastVisitInformation)}</pre>  */}
			{/* <pre>{JSON.stringify(treatmentPlanInformation)}</pre> */}
			{/* <pre>{JSON.stringify(muscleWorkToBeDoneInformation)}</pre> */}
			{/* <pre>{JSON.stringify(exercisesDoneLastVisit)}</pre> */}

			<Paper
				elevation={3}
				sx={{
					width: 600,
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					padding: 3,
				}}
			>
				<Typography variant="h5" component="h4" align="center">
					Viewing Treatment Plan for {treatmentPlanInformation.first_name}{" "}
					{treatmentPlanInformation.last_name}
				</Typography>
				<Typography
					component="h3"
					variant="h5"
					sx={{
						textDecoration: "underline",
					}}
				>
					Overview
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
				{treatmentPlanInformation.notes_for_rehab ? (
					<Typography variant="subtitle1" component="h3">
						Notes from Doctor: {treatmentPlanInformation.notes_for_rehab}
					</Typography>
				) : (
					""
				)}

				<br />
			</Paper>
			<Paper
				elevation={3}
				sx={{
					width: 600,
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					padding: 3,
				}}
			>
				{!lastVisitInformation ? (
					<Typography>No previous visit information</Typography>
				) : (
					<>
						<Typography
							sx={{ textDecoration: "underline" }}
							component="h3"
							variant="h5"
						>
							From Previous Visit
						</Typography>
						<Typography>Date: {newDate}</Typography>
						<Typography>
							{lastVisitInformation.units_completed
								? lastVisitInformation.units_completed
								: 0}{" "}
							units completed
						</Typography>
						<br />
						<Typography sx={{ textDecoration: "underline" }}>
							Exercises Done Last Visit:
						</Typography>
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
					</>
				)}
			</Paper>
			<Paper
				elevation={3}
				sx={{
					width: 600,
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					padding: 3,
				}}
			>
				<Typography component="h4" variant="h5">
					Affected Muscle Group
				</Typography>
				<br />
				<img
					src="http://www.learnmuscles.com/wp-content/uploads/2017/08/figure_1-16B.jpg"
					width={200}
					height={350}
				/>
				<br />
				<Typography component="h4" variant="h6">
					Muscle work areas to be completed during rehab visit
				</Typography>
				<List>
					{muscleWorkToBeDoneInformation.map((muscleWork) => (
						<ListItem key={muscleWork.id}>
							{muscleWork.muscle_work_name} {muscleWork.muscle_work_type}
						</ListItem>
					))}
				</List>
			</Paper>
			<Paper
				elevation={3}
				sx={{
					width: 600,
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					padding: 3,
				}}
			>
				<Typography component="h4" variant="h6">
					Start a Rehab Visit for this Treatment Plan
				</Typography>
				<br />
				<Button variant="contained" onClick={startVisit}>
					Go
				</Button>
			</Paper>
		</Stack>
	);
}
