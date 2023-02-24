import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchAllExercisesDoneSaga(action) {
    try {
        const response = yield axios.get(`/api/exercise/all-exercises-done/${action.payload}`);
        yield put({ type: 'SET_ALL_EXERCISES_DONE', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* muscleWorkSaga() {
    yield takeLatest('FETCH_ALL_EXERCISES_DONE', fetchAllExercisesDoneSaga);
}

export default muscleWorkSaga;