import React, { useEffect } from 'react';
import ListPage from './pages/ListPage';
import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
const StudentFeature = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);
  return (
    <div>
      <ListPage />
    </div>
  );
};

export default StudentFeature;
