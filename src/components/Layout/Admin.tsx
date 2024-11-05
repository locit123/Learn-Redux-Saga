import { makeStyles } from '@mui/styles';
import { Box, Theme } from '@mui/material';
import { Header, Sidebar } from 'components/Common';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    minHeight: '100vh',
  },
  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid #ddd`,
    backgroundColor: 'white',
  },
  main: {
    gridArea: 'main',
    backgroundColor: 'white',
    padding: '16px 24px',
  },
}));

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>{children}</Box>
    </Box>
  );
};

export default AdminLayout;
