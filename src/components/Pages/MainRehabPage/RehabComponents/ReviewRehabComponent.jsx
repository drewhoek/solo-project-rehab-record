import { Paper, Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function ReviewRehabComponent() {
	const exerciseInformation = useSelector(
		(store) => store.allExercisesDoneReducer
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
				</Paper>
				<Paper
					sx={{
						width: 200,
					}}
				>
					Review Exercises Done
					<pre>{JSON.stringify(exerciseInformation)}</pre>
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
