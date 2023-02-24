import RehabSummaryComponent from "./RehabComponents/RehabSummaryComponent";
import ExerciseDocumentationComponent from "./RehabComponents/ExerciseDocumentationComponent";
import RehabTimer from "./RehabComponents/RehabTimer";
import MuscleWorkDocumentation from "./RehabComponents/MuscleWorkDocumentationComponent";
import ReviewRehabComponent from "./RehabComponents/ReviewRehabComponent";
import { Stack } from "@mui/system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function MainRehabPage() {
	const params = useParams();
	const dispatch = useDispatch();
	const treatmentPlanId = Number(params.id);

	useEffect(() => {
		dispatch({
			type: "FETCH_PREVIOUS_VISIT_INFORMATION",
			payload: treatmentPlanId,
		});
		dispatch({
			type: "FETCH_MUSCLE_WORK_TO_BE_DONE",
			payload: treatmentPlanId,
		});
	}, [treatmentPlanId]);

	return (
		<Stack spacing={2}>
			<h1>This is the main rehab page</h1>
			<RehabSummaryComponent />
			<RehabTimer />
			<ExerciseDocumentationComponent treatmentPlanId={treatmentPlanId} />
			<MuscleWorkDocumentation />
			<ReviewRehabComponent />
		</Stack>
	);
}
