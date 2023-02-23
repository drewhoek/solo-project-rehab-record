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


function* visitInformationSaga() {
    yield takeLatest('FETCH_PREVIOUS_VISIT_INFORMATION', fetchLastVisitInformationSaga);
}

export default visitInformationSaga;