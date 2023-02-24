import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function MuscleWorkDocumentation() {
	const dispatch = useDispatch();
	const muscleWorkToBeDone = useSelector(
		(store) => store.muscleWorkToBeDoneReducer
	);

	function markMuscleWorkComplete(toBeDoneId) {
		dispatch({
			type: "MARK_MUSCLE_WORK_COMPLETE",
			payload: {
				toBeDoneId: toBeDoneId,
				treatment_plan_id: muscleWorkToBeDone[0].treatment_plan_id,
			},
		});
		console.log("this is the whole reducer:", muscleWorkToBeDone);
	}

	return (
		<>
			<h1>Muscle Work to be done</h1>
			<pre>{JSON.stringify(muscleWorkToBeDone)}</pre>
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
					{muscleWorkToBeDone.map((muscleWork) => (
						<tr key={muscleWork.muscle_work_to_be_done_per_visit_id}>
							<td>
								<Button
									variant="contained"
									onClick={() =>
										markMuscleWorkComplete(
											muscleWork.muscle_work_to_be_done_per_visit_id
										)
									}
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
