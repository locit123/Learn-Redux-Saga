import { call, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './citySlice';
import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';

function* fetchCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCitySuccess(response));
  } catch (error: any) {
    console.log('Error fetching city list', error);
    yield put(cityActions.fetchCityFailed(error.message));
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
