import { AppBar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";

function RehabTimer() {
	const dispatch = useDispatch();
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [pausedTime, setPausedTime] = useState(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [timerId, setTimerId] = useState(null);
	const [isPaused, setIsPaused] = useState(false);

	// When there is an end time present run this useEffect
	useEffect(() => {
		if (startTime && endTime) {
			const timeString = formatTime(endTime);
			const totalTime = convertToMinutes(timeString);
			if (totalTime === null) {
				console.error(`Invalid time format: "${timeString}"`);
				return;
			}
			const timeObject = {
				date: formatDate(startTime),
				time_in: formatTimeOfDay(startTime),
				time_out: formatTimeOfDay(endTime),
				total_time: totalTime,
			};
			dispatch({ type: "SET_TIME_AND_DATE", payload: timeObject });
		}
	}, [endTime]);

	function convertToMinutes(timeString) {
		const match = timeString.match(/^(\d+) minute(s)? (\d+)? second(s)?$/);
		if (!match) {
			return null;
		}
		const [_, minutes, __, seconds] = match;
		const totalSeconds =
			parseInt(minutes, 10) * 60 + parseInt(seconds || 0, 10);
		const totalMinutes = Math.floor(totalSeconds / 60);
		return totalMinutes;
	}

	function startTimer() {
		const now = Date.now();
		setStartTime(now);
		setCurrentTime(now);
		const id = setInterval(() => {
			setCurrentTime(Date.now());
		}, 1000);
		setTimerId(id);
	}

	function stopTimer() {
		if (timerId) {
			clearInterval(timerId);
		}

		setEndTime(Date.now());
	}

	function pauseTimer() {
		if (timerId) {
			clearInterval(timerId);
		}
		setPausedTime(Date.now());
		setIsPaused(true);
	}

	function resumeTimer() {
		const now = Date.now();
		setStartTime(startTime + now - pausedTime);
		setCurrentTime(now);
		const id = setInterval(() => {
			setCurrentTime(Date.now());
		}, 1000);
		setTimerId(id);
		setPausedTime(null);
		setIsPaused(false);
	}

	function formatTime(timestamp) {
		const duration = Math.floor((timestamp - startTime) / 1000);
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		return `${minutes} minute${minutes === 1 ? "" : "s"} ${seconds} second${
			seconds === 1 ? "" : "s"
		}`;
	}

	function formatDate(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}-${month < 10 ? "0" : ""}${month}-${
			day < 10 ? "0" : ""
		}${day}`;
	}

	function formatTimeOfDay(timestamp) {
		const date = new Date(timestamp);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		return `${hours < 10 ? "0" : ""}${hours}:${
			minutes < 10 ? "0" : ""
		}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	}

	useEffect(() => {
		if (startTime && !endTime && !isPaused) {
			const id = setInterval(() => {
				setCurrentTime(Date.now());
			}, 1000);
			setTimerId(id);
		}
		return () => {
			if (timerId) {
				clearInterval(timerId);
			}
		};
	}, [startTime, endTime, isPaused]);

	return (
		<AppBar
			position="sticky"
			sx={{
				padding: 3,
				display: "flex",
				justifyContent: "space-around",
				marginBottom: 3,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box>
					<Typography component="h3" variant="h5">
						TIMER
					</Typography>
				</Box>
				<Box>
					{startTime && !endTime && !isPaused && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								minWidth: "500px",
							}}
						>
							<Typography
								component="h5"
								variant="h6"
								fontWeight="bold"
								sx={{
									textDecoration: "underline",
								}}
							>
								Start:
							</Typography>
							<Typography component="h5" variant="h6" fontWeight="bold">
								{moment(startTime).format("hh:mm A")}
							</Typography>
							<Typography
								component="h5"
								variant="h6"
								fontWeight="bold"
								sx={{
									textDecoration: "underline",
								}}
							>
								Elapsed:
							</Typography>
							<Typography component="h5" variant="h6" fontWeight="bold">
								{formatTime(currentTime)}
							</Typography>
						</Box>
					)}
					{startTime && !endTime && isPaused && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								minWidth: "400px",
							}}
						>
							{/* <Typography>Date: {formatDate(startTime)}</Typography> */}
							<Typography
								component="h5"
								variant="h6"
								fontWeight="bold"
								sx={{
									textDecoration: "underline",
								}}
							>
								Start:
							</Typography>
							<Typography component="h5" variant="h6" fontWeight="bold">
								{moment(startTime).format("hh:mm A")}
							</Typography>
							<Typography
								component="h5"
								variant="h6"
								fontWeight="bold"
								sx={{
									textDecoration: "underline",
								}}
							>
								Paused at:
							</Typography>
							<Typography component="h5" variant="h6" fontWeight="bold">
								{moment(currentTime).format("hh:mm A")}
							</Typography>
						</Box>
					)}
					{startTime && endTime && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								minWidth: "600px",
							}}
						>
							{/* <Typography>Date: {formatDate(startTime)}</Typography> */}
							<Box
								sx={{
									display: "flex",
								}}
							>
								<Typography
									component="h5"
									variant="h6"
									fontWeight="bold"
									sx={{
										textDecoration: "underline",
										justifyContent: "space-around",
										width: 60,
									}}
								>
									Start:
								</Typography>
								<Typography component="h5" variant="h6" fontWeight="bold">
									{moment(startTime).format("hh:mm A")}
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-around",
									minWidth: 150,
								}}
							>
								<Typography
									component="h5"
									variant="h6"
									fontWeight="bold"
									sx={{
										textDecoration: "underline",
									}}
								>
									End:
								</Typography>
								<Typography component="h5" variant="h6" fontWeight="bold">
									{moment(endTime).format("hh:mm A")}
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
								}}
							>
								<Typography
									component="h5"
									variant="h6"
									fontWeight="bold"
									sx={{
										textDecoration: "underline",
										justifyContent: "space-around",
										width: 65,
									}}
								>
									Total:
								</Typography>
								<Typography component="h5" variant="h6" fontWeight="bold">
									{formatTime(endTime)}
								</Typography>
							</Box>
						</Box>
					)}
				</Box>
				<Box>
					{!startTime && (
						<Button
							variant="contained"
							color="success"
							onClick={startTimer}
							endIcon={<PlayArrowIcon />}
							sx={{ display: "flex", alignItems: "center" }}
						>
							Start
						</Button>
					)}
					{startTime && !endTime && !isPaused && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								minWidth: "225px",
							}}
						>
							<Button
								variant="contained"
								color="secondary"
								onClick={pauseTimer}
								endIcon={<PauseIcon />}
								sx={{ display: "flex", alignItems: "center" }}
							>
								Pause
							</Button>
							<Button
								variant="contained"
								color="error"
								onClick={stopTimer}
								endIcon={<StopIcon />}
								sx={{ display: "flex", alignItems: "center" }}
							>
								Stop
							</Button>
						</Box>
					)}
					{startTime && !endTime && isPaused && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-evenly",
								minWidth: "236px",
							}}
						>
							<Button
								variant="contained"
								color="secondary"
								onClick={resumeTimer}
								endIcon={<PlayArrowIcon />}
								sx={{ display: "flex", alignItems: "center" }}
							>
								Resume
							</Button>
							<Button
								variant="contained"
								color="error"
								onClick={stopTimer}
								endIcon={<StopIcon />}
								sx={{ display: "flex", alignItems: "center" }}
							>
								Stop
							</Button>
						</Box>
					)}
				</Box>
			</Box>
		</AppBar>
	);
}

export default RehabTimer;
