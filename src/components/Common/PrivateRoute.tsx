import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteCop = () => {
  let isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRouteCop;
