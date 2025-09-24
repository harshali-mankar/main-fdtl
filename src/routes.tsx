// import { Navigate, Route, Routes } from 'react-router-dom';
// import { Login } from './pages/Login';
// import MasterLayout from './components/MasterLayout';
// import Hero from './pages/Hero';

// const AppRoutes = () => {
//   // Initialize login state based on localStorage
//   const isLoggedIn = !!localStorage.getItem("Id");
//   const expiryTime=localStorage.getItem("expiry_time")
//   console.log("logged user:", isLoggedIn);
//   return (
//     <Routes>
//       {/* Public Route */}
//       <Route path="/login" element={<Login />} />

//       {/* Protected Routes inside MasterLayout */}
//       <Route element={isLoggedIn ? <MasterLayout /> : <Navigate to="/login" replace />}>
//         <Route index element={<Hero />} />
//       </Route>

//       {/* Catch-all redirect to login */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// };

// export { AppRoutes };


import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import MasterLayout from "./components/MasterLayout";
import Hero from "./pages/Hero";

const AppRoutes = () => {
  const userId = localStorage.getItem("Id");

  const expiryTime = localStorage.getItem("expiry_time");
  let isLoggedIn = false;
  if (userId && expiryTime) {

    const currentTime = Date.now(); // current time in ms
    const expiry = new Date(expiryTime).getTime(); // convert expiry to ms

    if (expiry > currentTime) {
      isLoggedIn = true //expiryMs < now;
    }
  }


  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        element={isLoggedIn ? <MasterLayout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Hero />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export { AppRoutes };
