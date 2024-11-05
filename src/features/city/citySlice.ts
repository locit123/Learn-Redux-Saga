import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CityState {
  list: City[];
  loading: boolean;
}

const initialState: CityState = {
  list: [],
  loading: false,
};
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCitySuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
  },
});

//actions
export const cityActions = citySlice.actions;
//selectors
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;

    return map;
  }, {}),
);
export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({ value: city.code, label: city.name })),
);
//reducers
const cityReducer = citySlice.reducer;
export default cityReducer;
