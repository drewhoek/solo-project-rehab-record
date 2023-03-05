import {
	Button,
	Paper,
	TextField,
	Typography,
	Autocomplete,
	Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function AddMuscleWorkToPlan() {
	const history = useHistory();
	const params = useParams();
	const dispatch = useDispatch();

	const muscleWorkBank = useSelector((store) => store.muscleWorkReducer);

	const treatmentPlanId = params.id;

	// This will be sent to the muscle work saga/reducer
	const [muscleWork, setMuscleWork] = useState([]);
	const [muscleWorkInput, setMuscleWorkInput] = useState("");

	function handleSubmitMuscleWork() {
		for (let i = 0; i < muscleWork.length; i++) {
			const element = muscleWork[i];
			const muscleWorkObj = {
				muscle_work_id: element.id,
				treatment_plan_id: treatmentPlanId,
			};
			dispatch({
				type: "ADD_MUSCLE_WORK_TO_BE_DONE",
				payload: muscleWorkObj,
			});
		}
		history.push("/user");
	}

	useEffect(() => {
		dispatch({ type: "FETCH_MUSCLE_WORK" });
	}, []);

	return (
		<Stack
			className="container"
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					width: 600,
					padding: 3,
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Typography component="h2" variant="h4" fontWeight="bold">
					Add Muscle Work Areas to Plan
				</Typography>
				<Typography component="h4" variant="h6">
					You may add more than one area
				</Typography>
				<br />
				<Autocomplete
					limitTags={3}
					multiple
					sx={{
						width: 300,
						marginBottom: 2,
					}}
					value={muscleWork}
					onChange={(event, newValue) => setMuscleWork(newValue)}
					inputValue={muscleWorkInput}
					onInputChange={(event, newInputValue) =>
						setMuscleWorkInput(newInputValue)
					}
					id="add-muscle-work-to-plan-autocomplete"
					getOptionLabel={(muscleWorkBank) =>
						`${muscleWorkBank.muscle_work_name} ${muscleWorkBank.muscle_work_type}`
					}
					options={muscleWorkBank}
					isOptionEqualToValue={(option, value) =>
						option.muscle_work_name === value.muscle_work_name
					}
					noOptionsText={"No muscle work  with this name"}
					renderOption={(props, muscleWorkBank) => (
						<Box component="li" {...props} key={muscleWorkBank.id}>
							{muscleWorkBank.muscle_work_name}{" "}
							{muscleWorkBank.muscle_work_type}
						</Box>
					)}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Search for Muscle Work"
							placeholder="Search"
						/>
					)}
				/>
				<Button variant="contained" onClick={handleSubmitMuscleWork}>
					Submit
				</Button>
			</Paper>
		</Stack>
	);
}
