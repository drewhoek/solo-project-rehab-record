import { AppBar, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function RehabSummaryComponent() {
	const params = useParams();
	const dispatch = useDispatch();
	const treatmentPlanId = Number(params.id);

	// Access last visit information
	const lastVisitInformation = useSelector(
		(store) => store.visitInformationReducer
	);

	useEffect(() => {
		dispatch({
			type: "FETCH_PREVIOUS_VISIT_INFORMATION",
			payload: treatmentPlanId,
		});
		console.log(treatmentPlanId);
	}, []);

	return (
		<Box>
			<pre>{JSON.stringify(lastVisitInformation)}</pre>
			<h1>Complaint Area</h1>
			<h2>Last Visit Date</h2>
			<h2>Units of Therapy</h2>
			<h3>Previous Muscle Work</h3>
			<h3>Previous Exercises</h3>
			<h3>Notes from last rehab session</h3>
			<Button>Begin Therapy</Button>
			<img
				src="http://www.learnmuscles.com/wp-content/uploads/2017/08/figure_1-16B.jpg"
				width={200}
				height={350}
			/>
		</Box>
	);
}
