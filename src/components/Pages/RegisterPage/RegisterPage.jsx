import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function RegisterPage() {
	const history = useHistory();

	return (
		<Stack
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					padding: 3,
					width: 400,
				}}
			>
				<RegisterForm />
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
