import config from 'config';
import { LoginPage } from 'features/auth';
import DashboardFeature from 'features/dashboard';
import StudentFeature from 'features/student';
import AddEditPage from 'features/student/pages/AddEditPage';

const publicRouter = [
  {
    path: config.Routers.loginPage,
    component: LoginPage,
  },
];
const privateRouter = [
  {
    path: config.Routers.dashboard,
    component: DashboardFeature,
  },
  {
    path: config.Routers.student,
    component: StudentFeature,
  },
  { path: config.Routers.addStudent, component: AddEditPage },
  { path: config.Routers.updateStudent, component: AddEditPage },
];

export { publicRouter, privateRouter };
