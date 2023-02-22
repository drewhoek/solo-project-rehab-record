import { AppBar, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RehabSummaryComponent() {
	const lastVisitInformation = useSelector(
		(store) => store.visitInformationReducer
	);

	return (
		<Box>
			<AppBar></AppBar>
			<pre>{JSON.stringify(lastVisitInformation)}</pre>
			<h1>Complaint Area</h1>
			<h2>Last Visit Date</h2>
			<h2>Units of Therapy</h2>
			<h3>Previous Muscle Work</h3>
			<h3>Previous Exercises</h3>
			<h3>Notes from last rehab session</h3>
			<Button>Begin Therapy</Button>
		</Box>
	);
}
