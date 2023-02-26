import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchLastVisitInformationSaga(action) {
    try {
        const response = yield axios.get(`/api/visit-information/patient-recent-visit/${action.payload}`);
        console.log(action.payload);
        yield put({ type: 'SET_PREVIOUS_VISIT_INFORMATION', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* addVisitInformationSaga(action) {
    try {
        yield axios.post(`/api/visit-information`, action.payload);
        console.log(action.payload);
        yield put({ type: 'FETCH_PREVIOUS_VISIT_INFORMATION', payload: action.payload.treatment_plan_id });
        console.log(response.data);
    } catch (error) {
        console.log('get request failed', error);
    }
}


function* visitInformationSaga() {
    yield takeLatest('FETCH_PREVIOUS_VISIT_INFORMATION', fetchLastVisitInformationSaga);
    yield takeLatest('ADD_VISIT_INFORMATION', addVisitInformationSaga);
}

export default visitInformationSaga;