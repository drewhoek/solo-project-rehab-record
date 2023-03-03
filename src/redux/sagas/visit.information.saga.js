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
        const response = yield axios.post(`/api/visit-information`, action.payload);
        console.log(response);
        action.history.push(`/rehab/${response.data.id}`);
    } catch (error) {
        console.log('post request failed', error);
    }
}

function* updateVisitInformationSaga(action) {
    try {
        yield axios.put(`/api/visit-information/${action.payload.visit_id}`, action.payload);
        console.log('payload for update visit info', action.payload);
    } catch (error) {
        console.log('put request failed', error);
    }
}


function* visitInformationSaga() {
    yield takeLatest('FETCH_PREVIOUS_VISIT_INFORMATION', fetchLastVisitInformationSaga);
    yield takeLatest('ADD_VISIT_INFORMATION', addVisitInformationSaga);
    yield takeLatest('UPDATE_VISIT_INFORMATION', updateVisitInformationSaga);
}

export default visitInformationSaga;