import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchPatientInfoSaga(action) {
    try {
        yield axios.get(`/api/patients/${action.payload}`);
        yield put({ type: 'SET_PATIENT_INFO' });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* updatePatientInfoSaga(action) {
    try {
        const response = yield axios.put(`/api/patients/${action.payload}`);
        yield put({ type: 'FETCH_PATIENT_INFO', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('put request failed', error);
    }
}

function* patientInfoSaga() {
    yield takeLatest('FETCH_PATIENT_INFO', fetchPatientInfoSaga);
    yield takeLatest('UPDATE_PATIENT_INFO', updatePatientInfoSaga);
}

export default patientInfoSaga;