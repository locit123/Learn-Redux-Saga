import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studenSlice';
import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import StudentTable from '../components/StudentTable';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import StudentFilters from '../components/StudentFilters';
import { ListParams } from 'models';
import { Student } from 'models/student';
import studentApi from 'api/studentApi';
import { useNavigate } from 'react-router-dom';
import config from 'config';
import { toast } from 'react-toastify';
const ListPage = () => {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const loading = useAppSelector(selectStudentLoading);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      }),
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };
  //EDIT A STUDENT
  const handleEditClick = (student: Student) => {
    navigate(`${config.Routers.student}/${student.id}`);
  };
  //ADD A STUDENT
  const handleAddStudentClick = () => {
    navigate(config.Routers.addStudent);
  };
  //REMOVE A STUDENT
  const handleDeleteClick = async (student: Student) => {
    try {
      await studentApi.remove(student.id || '');
      toast.success('Delete student successfully');

      //trigger fetch student list
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log('failed to fetch student', error);
    }
  };
  return (
    <Box sx={{ position: 'relative', pt: 0.5 }}>
      {loading && <LinearProgress sx={{ position: 'absolute', top: '-8px', left: 0, right: 0 }} />}
      <Box
        mb={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary" onClick={handleAddStudentClick}>
          Add new student
        </Button>
      </Box>

      <Box mb={2}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      <StudentTable
        studentList={studentList}
        cityMap={cityMap}
        onDelete={handleDeleteClick}
        onEdit={handleEditClick}
      />

      <Box mt={2} display={'flex'} justifyContent={'center'}>
        <Pagination
          count={Math.ceil(pagination?._totalRows / pagination?._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ListPage;
