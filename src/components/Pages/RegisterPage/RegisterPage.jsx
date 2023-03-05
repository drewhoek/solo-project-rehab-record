import { Box, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function RegisterPage() {
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
					padding: 3,
					maxWidth: 600,
					minWidth: 599,
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<RegisterForm />
				<Box>
					<img
						width="300"
						src="https://res.cloudinary.com/im2015/image/upload/c_scale,w_400/web/diagnoses/broken_leg.jpg"
					/>
				</Box>
			</Paper>
			<br />
			<center>
				<button
					type="button"
					className="btn btn_asLink"
					onClick={() => {
						history.push("/login");
					}}
				>
					Login
				</button>
			</center>
		</Stack>
	);
}

export default RegisterPage;
