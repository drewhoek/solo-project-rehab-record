import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchMuscleWorkSaga() {
    try {
        const response = yield axios.get('/api/muscle-work');
        yield put({ type: 'SET_MUSCLE_WORK', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* muscleWorkSaga() {
    yield takeLatest('FETCH_MUSCLE_WORK', fetchMuscleWorkSaga);
}

export default muscleWorkSaga;