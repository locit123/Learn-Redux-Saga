import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

export const StatisticItem = ({ icon, label, value }: StatisticItemProps) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexFlow: 'row nowrap',
        padding: '16px',
        border: '1px solid #ddd',
      }}
    >
      <Box>{icon}</Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5">{value}</Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
};
