import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import config from 'config';
import { Student } from 'models/student';
import studentApi from 'api/studentApi';
import { StudentForm } from '../components/StudentForm';
import { toast } from 'react-toastify';
interface AddEditPageProps {}

const AddEditPage = (props: AddEditPageProps) => {
  const [student, setStudent] = useState<Student>();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentId) return;
    //IFFE
    (async () => {
      try {
        const response: Student = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log('failed get by id to student list', error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    //toast success
    toast.success('Save student successfully');

    navigate(config.Routers.student);
  };

  const initialValue: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;
  console.log(isEdit);

  return (
    <Box>
      <Link to={config.Routers.student}>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

      {!isEdit || Boolean(student) ? (
        <StudentForm initialValue={initialValue} onSubmit={handleStudentFormSubmit} />
      ) : null}
    </Box>
  );
};

export default AddEditPage;
