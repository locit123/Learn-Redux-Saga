import './App.css';
import { Routes, Route } from 'react-router-dom';
import { privateRouter, publicRouter } from './routers';
import PrivateRouteCop from 'components/Common/PrivateRoute';
import config from 'config';
import NotFound from 'components/Common/NotFound';
import AdminLayout from 'components/Layout';
function App() {
  return (
    <div>
      <Routes>
        {/* PUBLIC ROUTE */}
        {publicRouter.map((router, index) => {
          let Comp = router.component;
          return <Route key={index} path={router.path} element={<Comp />} />;
        })}
        {/* PRIVATE ROUTE */}
        <Route element={<PrivateRouteCop />}>
          {privateRouter.map((router, index) => {
            const Page = router.component;
            const Layout = AdminLayout;
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
        {/* ERROR ROUTE */}
        <Route path={config.Routers.notFoundPage} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
