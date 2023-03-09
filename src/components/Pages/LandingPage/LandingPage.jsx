import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterPage/RegisterForm";
import { Button, Typography, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Stack } from "@mui/system";

function LandingPage() {
	const history = useHistory();

	const onLogin = (event) => {
		history.push("/login");
	};

	return (
		<Stack
			className="container"
			spacing={2}
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				sx={{
					padding: 3,
					width: 600,
				}}
			>
				<Typography component="h2" variant="h4" fontWeight="bold">
					Welcome! Let's Do Some Rehab!
				</Typography>
			</Paper>
			<Box
				sx={{
					display: "flex",
					width: 650,
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Paper
						elevation={3}
						sx={{
							padding: 3,
							width: 275,
						}}
					>
						<RegisterForm />
					</Paper>
					<br />
					<center>
						<Typography component="h4" variant="h6">
							Already have an Account?
						</Typography>
						<Button variant="outlined" onClick={onLogin}>
							<LoginIcon />
						</Button>
					</center>
				</Box>
				<Paper
					elevation={3}
					sx={{
						padding: 3,
						width: 250,
					}}
				>
					<Stack
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<Box textAlign="center">
							<Typography component="h4" variant="h5" fontWeight="bold">
								Purpose
							</Typography>
							<br />
							<Typography component="p" variant="p">
								Our purpose is to make it easier for you to document during a
								rehab session. We handle the math and make it easy for you to
								pay more attention to those that need it, your patients!
								Specializing in chiropractic rehabilitation care we help you
								document your active muscle release, therapeutic exercises and
								make tracking your unit times a breeze!
							</Typography>
							<br />
							<Typography component="p" variant="p">
								Make an account as a rehab specialist to get right into
								documenting your rehab sessions.
							</Typography>
							<br />
							<Typography component="p" variant="p">
								If you are a doctor, contact a member of your IT department for
								your account information.
							</Typography>
						</Box>
						<img
							width="150"
							src="https://res.cloudinary.com/im2015/image/upload/c_scale,w_400/blog/Running_cover.jpg"
						/>
					</Stack>
				</Paper>
			</Box>
		</Stack>
	);
}

export default LandingPage;
