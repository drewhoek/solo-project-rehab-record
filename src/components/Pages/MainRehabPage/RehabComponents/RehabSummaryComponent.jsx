import { AppBar, Button } from "@mui/material";
import { Box } from "@mui/system";

export default function RehabSummaryComponent() {
	return (
		<Box>
			<AppBar></AppBar>
			<h1>Complaint Area</h1>
			<h2>Last Visit Date</h2>
			<h2>Units of Therapy</h2>
			<h3>Previous Muscle Work</h3>
			<h3>Previous Exercises</h3>
			<h3>Notes from lat rehab session</h3>
			<Button>Begin Therapy</Button>
		</Box>
	);
}
