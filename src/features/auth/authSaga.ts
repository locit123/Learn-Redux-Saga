import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import config from 'config';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'fake token');
    yield put(authActions.loginSuccess({ id: 1, name: 'loc channel' }));
    yield put(push(config.Routers.dashboard));
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(1000);
  localStorage.removeItem('access_token');
  yield put(push(config.Routers.loginPage));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    // yield put(push(config.Routers.dashboard));
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
