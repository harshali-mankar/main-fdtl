import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import MasterLayout from './components/MasterLayout';
import Hero from './pages/Hero';

const AppRoutes = () => {
  // Initialize login state based on localStorage
  const isLoggedIn = !!localStorage.getItem("Id");
  console.log("logged user:", isLoggedIn);
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes inside MasterLayout */}
      <Route element={isLoggedIn ? <MasterLayout /> : <Navigate to="/login" replace />}>
        <Route index element={<Hero />} />
      </Route>

      {/* Catch-all redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export { AppRoutes };
