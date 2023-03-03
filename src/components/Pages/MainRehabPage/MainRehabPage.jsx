import ExerciseDocumentationComponent from "./RehabComponents/ExerciseDocumentationComponent";
import MuscleWorkDocumentation from "./RehabComponents/MuscleWorkDocumentationComponent";
import ReviewRehabComponent from "./RehabComponents/ReviewRehabComponent";
import RehabTimer from "./RehabComponents/RehabTimer";
import { Stack } from "@mui/system";

export default function MainRehabPage() {
	return (
		<Stack spacing={2}>
			{/* <RehabTimer /> */}
			<ExerciseDocumentationComponent />
			<MuscleWorkDocumentation />
			<ReviewRehabComponent />
		</Stack>
	);
}
