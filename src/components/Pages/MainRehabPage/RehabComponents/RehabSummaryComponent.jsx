import { AppBar, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function RehabSummaryComponent() {
	const params = useParams();
	const dispatch = useDispatch();
	const treatmentPlanId = Number(params.id);

	// Access last visit information
	const lastVisitInformation = useSelector(
		(store) => store.visitInformationReducer[0]
	);

	let newDate = moment.utc(lastVisitInformation.date).format("MMM Do, YYYY");

	useEffect(() => {
		dispatch({
			type: "FETCH_PREVIOUS_VISIT_INFORMATION",
			payload: treatmentPlanId,
		});
	}, []);

	return (
		<Box>
			<pre>{JSON.stringify(lastVisitInformation)}</pre>
			<h1>Complaint Area</h1>
			<h2>{newDate}</h2>
			<h2>{lastVisitInformation.units_completed} units completed</h2>
			<h3>Notes from muscle work: {lastVisitInformation.muscle_work_notes}</h3>
			<h3>Notes from exercises: {lastVisitInformation.exercise_notes}</h3>{" "}
			<RehabTimer />
			<img
				src="http://www.learnmuscles.com/wp-content/uploads/2017/08/figure_1-16B.jpg"
				width={200}
				height={350}
			/>
		</Box>
	);
}
