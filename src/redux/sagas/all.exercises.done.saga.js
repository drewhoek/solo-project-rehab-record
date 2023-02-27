import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchAllExercisesDoneSaga(action) {
    try {
        const response = yield axios.get(`/api/exercise/all-exercises-done/${action.payload}`);
        yield put({ type: 'SET_ALL_EXERCISES_DONE', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* addExerciseSaga(action) {
    try {
        const response = yield axios.post(`/api/exercise`, action.payload);
        yield put({ type: 'FETCH_ALL_EXERCISES_DONE', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* allExercisesDoneSaga() {
    yield takeLatest('FETCH_ALL_EXERCISES_DONE', fetchAllExercisesDoneSaga);
}

export default allExercisesDoneSaga;