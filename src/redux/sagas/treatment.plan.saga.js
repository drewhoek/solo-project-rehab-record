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
        const response = yield axios.get('/api/patients/treatment-plan');
        yield put({ type: 'SET_ALL_TREATMENT_PLANS', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* addTreatmentPlanSaga() {
    try {
        yield axios.post('/api/patients/treatment-plan', action.payload);
        yield put({ type: 'FETCH_ALL_TREATMENT_PLANS' });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* treatmentPlanSaga() {
    yield takeLatest('FETCH_ALL_TREATMENT_PLANS', fetchAllTreatmentPlansSaga);
    yield takeLatest('FETCH_ACTIVE_TREATMENT_PLANS', fetchActiveTreatmentPlansSaga);
    yield takeLatest('ADD_TREATMENT_PLAN', addTreatmentPlanSaga);
}

export default treatmentPlanSaga;