import { Paper, Box } from "@mui/material";

export default function ReviewRehabComponent() {
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
				</Paper>
				<Paper
					sx={{
						width: 200,
					}}
				>
					Review Exercises Done
				</Paper>
				<Paper
					sx={{
						width: 200,
					}}
				>
					Review Muscle Work Done
				</Paper>
			</Box>
		</>
	);
}
