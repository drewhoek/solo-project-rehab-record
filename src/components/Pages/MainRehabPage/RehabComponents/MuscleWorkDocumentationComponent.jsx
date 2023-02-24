import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function MuscleWorkDocumentation({ treatmentPlanId }) {
	const muscleWorkToBeDone = useSelector(
		(store) => store.muscleWorkToBeDoneReducer
	);

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
					</tr>
				</thead>
				<tbody>
					{muscleWorkToBeDone.map((muscleWork) => (
						<tr key={muscleWork.muscle_work_to_be_done_per_visit_id}>
							<td>
								<Button>Mark Complete</Button>
							</td>
							<td>{muscleWork.muscle_work_name}</td>
							<td>{muscleWork.muscle_work_type}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
