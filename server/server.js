const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const exerciseRouter = require('./routes/exercise.router');
const treatmentPlanRouter = require('./routes/treatment.plan.router');
const visitInfoRouter = require('./routes/visit.information.router');
const patientRouter = require('./routes/patient.router');
const muscleWorkRouter = require('./routes/muscle.work.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/exercise', exerciseRouter);
app.use('/api/treatment-plan', treatmentPlanRouter);
app.use('/api/visit-information', visitInfoRouter);
app.use('/api/patients', patientRouter);
app.use('/api/muscle-work', muscleWorkRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
