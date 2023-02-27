import { Box, Stack } from "@mui/system";
import { Paper, Button } from "@mui/material";
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

    const muscleWorkInformation = 

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
	}, []);

	return (
		<Stack spacing={2}>
			<pre>{JSON.stringify(lastVisitInformation)}</pre>
			<pre>{JSON.stringify(treatmentPlanInformation)}</pre>

			<h2>
				Viewing Current Treatment Plan For {treatmentPlanInformation.first_name}{" "}
				{treatmentPlanInformation.last_name}
			</h2>
			{!lastVisitInformation ? (
				<h2>No previous information visit information</h2>
			) : (
				<>
					<h2>Last Visit Date: {newDate}</h2>
					<h2>{lastVisitInformation.units_completed} units completed</h2>
					<img
						src="http://www.learnmuscles.com/wp-content/uploads/2017/08/figure_1-16B.jpg"
						width={200}
						height={350}
					/>
				</>
			)}
			<Box>
				<h3>
					Complaint Area: {treatmentPlanInformation.primary_complaint_area}
				</h3>
				<h3>
					Primary Exercise Focus:{" "}
					{treatmentPlanInformation.primary_exercise_focus}
				</h3>
				<h3>
					Secondary Exercise Focus:{" "}
					{treatmentPlanInformation.secondary_exercise_focus}
				</h3>
				<h4>Muscle work that needs to be done</h4>

				<h3>Summary of Last Visit</h3>
				<h3></h3>
				<h4>Exercises that have been done during past visits</h4>
			</Box>
			<Paper
				sx={{
					width: 400,
					padding: 3,
				}}
			>
				Start a Rehab Session for this Treatment Plan
				<Button variant="contained" onClick={() => history.push("/rehab")}>
					Go
				</Button>
			</Paper>
		</Stack>
	);
}
