import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchExercisesSaga() {
    try {
        const response = yield axios.get(`/api/exercise`);
        yield put({ type: 'SET_EXERCISES', payload: response.data });
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* fetchExercisesVariationsSaga(action) {
    try {
        const response = yield axios.get(`/api/exercise/variations/${action.payload}`);
        yield put({ type: 'SET_EXERCISE_VARIATIONS', payload: response.data });
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* ExercisesSaga() {
    yield takeLatest('FETCH_EXERCISES', fetchExercisesSaga);
    yield takeLatest("FETCH_EXERCISE_VARIATIONS", fetchExercisesVariationsSaga);
}

export default ExercisesSaga;