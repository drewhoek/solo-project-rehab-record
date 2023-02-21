import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchPatientSaga() {
    try {
        const response = yield axios.get('/api/patients/with-treatment-plan');
        yield put({ type: 'SET_PATIENTS_WITH_PLAN', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* patientSaga() {
    yield takeLatest('FETCH_PATIENTS_WITH_PLAN', fetchPatientSaga);
}

export default patientSaga;