import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

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
		<div>
			<h2>Here is the timer</h2>
			{!startTime && <button onClick={startTimer}>Start</button>}
			{startTime && !endTime && !isPaused && (
				<div>
					<div>Date: {formatDate(startTime)}</div>
					<div>Start time: {formatTimeOfDay(startTime)}</div>
					<div>Time elapsed: {formatTime(currentTime)}</div>
					<button onClick={pauseTimer}>Pause</button>
					<button onClick={stopTimer}>Stop</button>
				</div>
			)}
			{startTime && !endTime && isPaused && (
				<div>
					<div>Date: {formatDate(startTime)}</div>
					<div>Start time: {formatTimeOfDay(startTime)}</div>
					<div>Paused at: {formatTime(currentTime)}</div>
					<button onClick={resumeTimer}>Resume</button>
					<button onClick={stopTimer}>Stop</button>
				</div>
			)}
			{startTime && endTime && (
				<div>
					<div>Date: {formatDate(startTime)}</div>
					<div>Start time: {formatTimeOfDay(startTime)}</div>
					<div>End time: {formatTimeOfDay(endTime)}</div>
					<div>Total time: {formatTime(endTime)}</div>
				</div>
			)}
		</div>
	);
}

export default RehabTimer;
