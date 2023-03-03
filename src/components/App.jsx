import React, { useEffect } from "react";
import {
	HashRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Nav from "./Shared/Nav/Nav";
import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute";
import AboutPage from "./Pages/AboutPage/AboutPage";
import UserPage from "./Pages/UserPage/UserPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import MainRehabPage from "./Pages/MainRehabPage/MainRehabPage";
import MakeTreatmentPlanPage from "./Pages/MakeTreatmentPlanPage/MakeTreatmentPlanPage";
import CreateNewPatientPage from "./Pages/CreateNewPatientPage/CreateNewPatientPage";
import ViewPlanPage from "./Pages/ViewPlanPage/ViewPlanPage";
import AddMuscleWorkToPlan from "./Pages/AddMuscleWorkToPlan/AddMuscleWorkToPlan";
import Footer from "./Shared/Footer/Footer";
import RehabTimer from "./Pages/MainRehabPage/RehabComponents/RehabTimer";
import "./App.css";

function App() {
	const dispatch = useDispatch();

	const user = useSelector((store) => store.user);

	useEffect(() => {
		dispatch({ type: "FETCH_USER" });
	}, [dispatch]);

	return (
		<Router>
			<div className="content">
				<Nav />

				<Switch>
					{/* Visiting localhost:3000 will redirect to localhost:3000/home */}
					<Redirect exact from="/" to="/home" />

					{/* Visiting localhost:3000/about will show the about page. */}
					<Route
						// shows AboutPage at all times (logged in or not)
						exact
						path="/about"
					>
						<AboutPage />
					</Route>

					{/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
					<ProtectedRoute
						// logged in shows UserPage else shows LoginPage
						exact
						path="/user"
					>
						<UserPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/add-patient">
						<CreateNewPatientPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/rehab/:id">
						<RehabTimer />
						<MainRehabPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/make-treatment-plan">
						<MakeTreatmentPlanPage />
					</ProtectedRoute>

					<ProtectedRoute exact path="/add-muscle-work-to-plan/:id">
						<AddMuscleWorkToPlan />
					</ProtectedRoute>

					<ProtectedRoute exact path="/view-treatment-plan/:id">
						<ViewPlanPage />
					</ProtectedRoute>

					<Route exact path="/login">
						{user.id ? (
							// If the user is already logged in,
							// redirect to the /user page
							<Redirect to="/user" />
						) : (
							// Otherwise, show the login page
							<LoginPage />
						)}
					</Route>

					<Route exact path="/registration">
						{user.id ? (
							// If the user is already logged in,
							// redirect them to the /user page
							<Redirect to="/user" />
						) : (
							// Otherwise, show the registration page
							<RegisterPage />
						)}
					</Route>

					<Route exact path="/home">
						{user.id ? (
							// If the user is already logged in,
							// redirect them to the /user page
							<Redirect to="/user" />
						) : (
							// Otherwise, show the Landing page
							<LandingPage />
						)}
					</Route>

					{/* If none of the other routes matched, we will show a 404. */}
					<Route>
						<h1>404</h1>
					</Route>
				</Switch>
			</div>
			{/* <div className="footer">
				<Footer />
			</div> */}
		</Router>
	);
}

export default App;
