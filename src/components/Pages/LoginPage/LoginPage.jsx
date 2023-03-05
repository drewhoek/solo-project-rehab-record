import React from "react";
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import { Link, Paper, Typography, Box } from "@mui/material";
import { Stack } from "@mui/system";

function LoginPage() {
	const history = useHistory();

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
					display: "flex",
					justifyContent: "space-between",
					padding: 3,
				}}
			>
				<LoginForm />
				<Box>
					<img
						width="300px"
						src="https://res.cloudinary.com/im2015/image/upload/c_scale,w_400/v1585895087/Blog/v2/Trapezius_Pain_v1-09.jpg"
					/>
				</Box>
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
