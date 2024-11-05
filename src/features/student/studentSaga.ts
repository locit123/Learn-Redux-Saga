import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studenSlice';
import { ListParams, ListResponse } from 'models';
import { Student } from 'models/student';
import studentApi from 'api/studentApi';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentSuccess(response));
  } catch (error: any) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentFailed(error.message));
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
