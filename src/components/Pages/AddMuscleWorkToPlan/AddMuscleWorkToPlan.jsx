import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AddMuscleWorkToPlan() {
	const params = useParams();
	const dispatch = useDispatch();

	const muscleWorkBank = useSelector((store) => store.muscleWorkReducer);

	const treatmentPlanId = params.id;

	// This will be sent to the muscle work saga/reducer
	const [muscleWork, setMuscleWork] = useState([]);

	function handleSubmitMuscleWork() {
		for (let i = 0; i < muscleWork.length; i++) {
			const element = muscleWork[i];
			const muscleWorkObj = {
				muscle_work_id: element,
				treatment_plan_id: treatmentPlanId,
			};
			dispatch({
				type: "ADD_MUSCLE_WORK_TO_BE_DONE",
				payload: muscleWorkObj,
			});
		}
	}

	useEffect(() => {
		dispatch({ type: "FETCH_MUSCLE_WORK" });
	}, []);

	return (
		<Box>
			<select
				onClick={(event) => {
					setMuscleWork([...muscleWork, event.target.value]);
					console.log(event.target.value);
				}}
				multiple={true}
			>
				{muscleWorkBank.map((muscleWorkItem) => (
					<option value={muscleWorkItem.id}>
						{muscleWorkItem.muscle_work_name} {muscleWorkItem.muscle_work_type}
					</option>
				))}
			</select>
			<ul>
				{muscleWork.map((individualMuscleWork) => (
					<li key={individualMuscleWork.id}>{individualMuscleWork}</li>
				))}
			</ul>
			<Button variant="contained" onClick={handleSubmitMuscleWork}>
				Submit
			</Button>
		</Box>
	);
}
