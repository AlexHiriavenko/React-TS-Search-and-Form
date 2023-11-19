import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import NotFound from '../../pages/NotFound/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
