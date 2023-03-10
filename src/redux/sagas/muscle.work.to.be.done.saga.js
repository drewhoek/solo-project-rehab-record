import { put } from 'redux-saga/effects';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* fetchMuscleWorkToBeDonePerSessionSaga(action) {
    try {
        const response = yield axios.get(`api/muscle-work/to-be-done-per-session/${action.payload}`);
        yield put({ type: 'SET_MUSCLE_WORK_TO_BE_DONE_PER_SESSION', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* fetchMuscleWorkToBeDonePerPlanSaga(action) {
    try {
        const response = yield axios.get(`api/muscle-work/to-be-done/${action.payload}`);
        yield put({ type: 'SET_MUSCLE_WORK_TO_BE_DONE', payload: response.data });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* addMuscleWorkToBeDoneSaga(action) {
    try {
        const response = yield axios.post(`api/muscle-work/to-be-done`, action.payload);
        yield put({ type: 'FETCH_MUSCLE_WORK_TO_BE_DONE', payload: action.payload.treatment_plan_id });
        console.log(response);
    } catch (error) {
        console.log('get request failed', error);
    }
}


function* markMuscleWorkAsDone(action) {
    try {
        yield axios.put(`api/muscle-work/to-be-done-per-session/${action.payload.id}`);
        yield put({ type: 'FETCH_MUSCLE_WORK_TO_BE_DONE_PER_SESSION', payload: action.payload.visit_information_id });
    } catch (error) {
        console.log('get request failed', error);
    }
}

function* muscleWorkToBeDoneSaga() {
    yield takeLatest('FETCH_MUSCLE_WORK_TO_BE_DONE_PER_SESSION', fetchMuscleWorkToBeDonePerSessionSaga);
    yield takeLatest('MARK_MUSCLE_WORK_COMPLETE', markMuscleWorkAsDone);
    yield takeLatest('FETCH_MUSCLE_WORK_TO_BE_DONE', fetchMuscleWorkToBeDonePerPlanSaga);
    yield takeLatest("ADD_MUSCLE_WORK_TO_BE_DONE", addMuscleWorkToBeDoneSaga);
}

export default muscleWorkToBeDoneSaga;