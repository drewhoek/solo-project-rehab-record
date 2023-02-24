import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import moment from "moment";

export default function RehabSummaryComponent() {
	// Access last visit information
	const lastVisitInformation = useSelector(
		(store) => store.visitInformationReducer
	);

	let newDate = moment.utc(lastVisitInformation.date).format("MMM Do, YYYY");
	return (
		<Box>
			<pre>{JSON.stringify(lastVisitInformation)}</pre>
			<h1>Complaint Area</h1>
			<h2>{newDate}</h2>
			<h2>{lastVisitInformation.units_completed} units completed</h2>
			<img
				src="http://www.learnmuscles.com/wp-content/uploads/2017/08/figure_1-16B.jpg"
				width={200}
				height={350}
			/>
		</Box>
	);
}
