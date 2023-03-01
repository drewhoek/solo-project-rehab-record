import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterPage/RegisterForm";
import { Button, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

function LandingPage() {
	const history = useHistory();

	const onLogin = (event) => {
		history.push("/login");
	};

	return (
		<div className="container">
			<Typography component="h2" variant="h4">
				Welcome! Let's do some rehab!
			</Typography>
			<br />
			<br />
			<div className="grid">
				<div className="grid-col grid-col_8">
					<Typography component="p" variant="p">
						Our purpose is to make it easier for you to document during a rehab
						session. We handle the math and make it easy for you to pay more
						attention to those that need it, your patients! Specializing in
						chiropractic rehabilitation care we help you document your active
						muscle release, therapeutic exercises and make tracking your unit
						times a breeze!
					</Typography>
					<br />
					<Typography component="p" variant="p">
						Make an account as a rehab specialist to get right into documenting
						your rehab sessions.
					</Typography>
					<br />
					<Typography component="p" variant="p">
						If you are a doctor, contact a member of your IT department for your
						account information.
					</Typography>
					{/* <img src="./images/PT-image"></img> */}
				</div>
				<div className="grid-col grid-col_4">
					<RegisterForm />

					<center>
						<Typography component="h4" variant="h6">
							Already have an Account?
						</Typography>
						<Button variant="outlined" onClick={onLogin}>
							<LoginIcon />
						</Button>
					</center>
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
