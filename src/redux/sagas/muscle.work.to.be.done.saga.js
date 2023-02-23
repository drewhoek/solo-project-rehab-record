import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchMuscleWorkToBeDoneSaga(action) {
    try {
        const response = yield axios.get(`api/muscle-work/to-be-done-per-session/${action.payload}`);
        yield put({ type: 'SET_MUSCLE_WORK_TO_BE_DONE', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* muscleWorkToBeDoneSaga() {
    yield takeLatest('FETCH_MUSCLE_WORK_TO_BE_DONE', fetchMuscleWorkToBeDoneSaga);
}

export default muscleWorkToBeDoneSaga;