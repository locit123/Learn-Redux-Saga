import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
interface WidgetProps {
  title: string;
  children: any;
}

const Widget = ({ title, children }: WidgetProps) => {
  return (
    <Paper sx={{ padding: 2, border: '1px solid #ddd' }}>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
};

export default Widget;
