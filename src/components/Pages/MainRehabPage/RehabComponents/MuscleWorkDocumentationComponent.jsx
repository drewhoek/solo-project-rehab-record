import { Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
		<>
			<h1>Muscle Work to be done</h1>
			<pre>{JSON.stringify(muscleWorkToBeDonePerVisit)}</pre>

			<table>
				<thead>
					<tr>
						<th>Mark Complete</th>
						<th>Area</th>
						<th>Method</th>
						<th>Complete?</th>
					</tr>
				</thead>
				<tbody>
					{muscleWorkToBeDonePerVisit.map((muscleWork) => (
						<tr key={muscleWork.MWTBDPV_id}>
							<td>
								<Button
									variant="contained"
									onClick={() => markMuscleWorkComplete(muscleWork.MWTBDPV_id)}
								>
									Mark Complete
								</Button>
							</td>
							<td>{muscleWork.muscle_work_name}</td>
							<td>{muscleWork.muscle_work_type}</td>
							<td>{muscleWork.is_done ? "Yes" : "No"}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
