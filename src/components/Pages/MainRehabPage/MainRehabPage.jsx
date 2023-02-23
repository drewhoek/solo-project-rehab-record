import RehabSummaryComponent from "./RehabComponents/RehabSummaryComponent";
import ExerciseDocumentationComponent from "./RehabComponents/ExerciseDocumentationComponent";
import RehabTimer from "./RehabComponents/RehabTimer";
import { Stack } from "@mui/system";

export default function MainRehabPage() {
	return (
		<Stack spacing={2}>
			<h1>This is the main rehab page</h1>
			<RehabSummaryComponent />
			<RehabTimer />
			<ExerciseDocumentationComponent />
		</Stack>
	);
}
