import React from "react";
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import { Link, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function LoginPage() {
	const history = useHistory();

	return (
		<Stack
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<Paper
				sx={{
					width: 300,
					display: "flex",
					flexDirection: "column",
					padding: 3,
				}}
			>
				<LoginForm />
			</Paper>
			<br />
			<center>
				<Typography component="h4" variant="subtitle1">
					Don't Have an Account?
				</Typography>

				<Link
					onClick={() => {
						history.push("/registration");
					}}
				>
					Register Here
				</Link>
			</center>
		</Stack>
	);
}

export default LoginPage;
