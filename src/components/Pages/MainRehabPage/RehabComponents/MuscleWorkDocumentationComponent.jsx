import { useSelector } from "react-redux";

export default function MuscleWorkDocumentation({ treatmentPlanId }) {
	const muscleWorkToBeDone = useSelector(
		(store) => store.muscleWorkToBeDoneReducer
	);

	return (
		<>
			<h1>Muscle Work to be done</h1>
			<pre>{JSON.stringify(muscleWorkToBeDone)}</pre>
		</>
	);
}
