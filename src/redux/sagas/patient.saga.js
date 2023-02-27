import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchPatientSaga() {
    try {
        const response = yield axios.get('/api/patients/with-treatment-plan');
        yield put({ type: 'SET_PATIENTS_WITH_PLAN', payload: response.data });
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* fetchAllPatientsSaga() {
    try {
        const response = yield axios.get('/api/patients');
        yield put({ type: 'SET_ALL_PATIENTS', payload: response.data });
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* addPatientSaga(action) {
    try {
        yield axios.post('/api/patients', action.payload);
        yield put({ type: 'FETCH_ALL_PATIENTS' });
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* deletePatientSaga(action) {
    try {
        yield axios.delete(`/api/patients/${action.payload}`);
        yield put({ type: 'FETCH_ALL_PATIENTS' });
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* patientSaga() {
    yield takeLatest('FETCH_PATIENTS_WITH_PLAN', fetchPatientSaga);
    yield takeLatest('FETCH_ALL_PATIENTS', fetchAllPatientsSaga);
    yield takeLatest('ADD_PATIENT', addPatientSaga);
    yield takeLatest('DELETE_PATIENT', deletePatientSaga);
}

export default patientSaga;;