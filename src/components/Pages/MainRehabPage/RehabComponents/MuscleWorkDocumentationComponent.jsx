import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import { Stack } from "@mui/system";

export default function MuscleWorkDocumentation() {
	const params = useParams();
	const visitId = params.id;

	const dispatch = useDispatch();

	const muscleWorkToBeDonePerVisit = useSelector(
		(store) => store.muscleWorkToBeDonePerSessionReducer
	);

	function markMuscleWorkComplete(toBeDoneId) {
		dispatch({
			type: "MARK_MUSCLE_WORK_COMPLETE",
			payload: {
				id: toBeDoneId,
				visit_information_id: visitId,
			},
		});
	}

	useEffect(() => {
		dispatch({
			type: "FETCH_MUSCLE_WORK_TO_BE_DONE_PER_SESSION",
			payload: visitId,
		});
	}, []);

	return (
		<Stack
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					width: 600,
					padding: 3,
				}}
			>
				<Typography component="h1" variant="h4" fontWeight="bold">
					Muscle Work that needs to be done
				</Typography>
				<Typography component="h3" variant="h6">
					Please Mark Off Muscle Work When Complete
				</Typography>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Mark Complete</TableCell>
							<TableCell>Area</TableCell>
							<TableCell>Method</TableCell>
							<TableCell>Complete?</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{muscleWorkToBeDonePerVisit.map((muscleWork) => (
							<TableRow key={muscleWork.MWTBDPV_id}>
								<TableCell>
									<IconButton
										variant="contained"
										onClick={() =>
											markMuscleWorkComplete(muscleWork.MWTBDPV_id)
										}
									>
										{muscleWork.is_done ? (
											<CheckBoxSharpIcon fontSize="large" color="success" />
										) : (
											<CheckBoxOutlineBlankSharpIcon fontSize="large" />
										)}
									</IconButton>
								</TableCell>
								<TableCell>{muscleWork.muscle_work_name}</TableCell>
								<TableCell>{muscleWork.muscle_work_type}</TableCell>
								<TableCell>{muscleWork.is_done ? "Yes" : "No"}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		</Stack>
	);
}
