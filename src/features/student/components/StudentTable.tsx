import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Student } from 'models/student';
import { Box, Button, Dialog, Paper } from '@mui/material';
import { capitalizeString, getMarkColor } from 'utils';
import { City } from 'models';
import React, { useState } from 'react';

export interface StudentRankingListProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onDelete?: (student: Student) => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentTable({
  studentList,
  cityMap,
  onDelete,
  onEdit,
}: StudentRankingListProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    onDelete?.(student);
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList?.map((student) => (
              <TableRow key={student.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {student.id}
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight={600}>
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    sx={{ mr: 1 }}
                    color="primary"
                    onClick={() => onEdit?.(student)}
                  >
                    Edit
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleRemoveClick(student)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete show dialog */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Remove a student?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to remove student named "{selectedStudent?.name}" <br />
            .This action can't be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            color="secondary"
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
