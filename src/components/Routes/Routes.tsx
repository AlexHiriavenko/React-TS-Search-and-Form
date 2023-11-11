import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
