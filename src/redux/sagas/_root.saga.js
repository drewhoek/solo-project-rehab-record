import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import patientSaga from './patient.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import treatmentPlanSaga from './treatment.plan.saga';
import muscleWorkSaga from './muscle.work.saga';
import visitInformationSaga from './visit.information.saga';
import muscleWorkToBeDoneSaga from './muscle.work.to.be.done.saga';
import patientInfoSaga from './patient.info.saga';
import allExercisesDoneSaga from './all.exercises.done.saga';
import ExercisesSaga from './exercises.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    patientSaga(),
    treatmentPlanSaga(),
    muscleWorkSaga(),
    visitInformationSaga(),
    muscleWorkToBeDoneSaga(),
    patientInfoSaga(),
    allExercisesDoneSaga(),
    ExercisesSaga()
  ]);
}
