import { Routes, Route, Outlet } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import { HomeProps } from '../../pages/Home/Home';

function AppRoutes(props: HomeProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home {...props}>
            <Outlet />
          </Home>
        }
      />
      <Route path="/page/:pageNumber" element={<Home {...props} />} />
    </Routes>
  );
}

export default AppRoutes;
