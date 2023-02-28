import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchActiveTreatmentPlansSaga() {
    try {
        const response = yield axios.get('/api/patients/with-treatment-plan');
        yield put({ type: 'SET_ACTIVE_TREATMENT_PLANS', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* fetchAllTreatmentPlansSaga() {
    try {
        const response = yield axios.get('/api/treatment-plan');
        yield put({ type: 'SET_ALL_TREATMENT_PLANS', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* addTreatmentPlanSaga(action) {
    try {
        const response = yield axios.post('/api/treatment-plan', action.payload);
        console.log(response.data);
    } catch (error) {
        console.log('get post failed', error);
    }
}

function* fetchSpecificPlanSaga(action) {
    try {
        const response = yield axios.get(`/api/treatment-plan/${action.payload}`);
        yield put({ type: 'SET_CURRENT_PLAN', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* treatmentPlanSaga() {
    yield takeLatest('FETCH_ALL_TREATMENT_PLANS', fetchAllTreatmentPlansSaga);
    yield takeLatest('FETCH_ACTIVE_TREATMENT_PLANS', fetchActiveTreatmentPlansSaga);
    yield takeLatest('ADD_TREATMENT_PLAN', addTreatmentPlanSaga);
    yield takeLatest('FETCH_CURRENT_TREATMENT_PLAN', fetchSpecificPlanSaga);
}

export default treatmentPlanSaga;