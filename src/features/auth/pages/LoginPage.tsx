import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from '../authSlice';

export interface LoginPageProps {}
const LoginPage = (props: LoginPageProps) => {
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      }),
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper sx={{ padding: '15px' }}>
        <Typography component={'h1'} variant="h5">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && (
              <CircularProgress size={20} color="secondary" style={{ marginRight: '10px' }} />
            )}
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
