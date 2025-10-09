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


import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import MasterLayout from "./components/MasterLayout";
import Hero from "./pages/Hero";
import { useEffect, useState } from "react";

const AppRoutes = () => {

  // const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  // const [loading,setLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const userId = localStorage.getItem("Id");
    const expiryTime = localStorage.getItem("expiry_time");
    return !!userId && expiryTime && new Date(expiryTime).getTime() > Date.now();
  });

    useEffect(() => {
    const checkSession = () => {
      const userId = localStorage.getItem("Id");
      const expiryTime = localStorage.getItem("expiry_time");
      if (userId && expiryTime) {
        const expiryMs = new Date(expiryTime).getTime();
        if (expiryMs <= Date.now()) {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    const interval = setInterval(checkSession, 10 * 1000); // 10s for testing
    return () => clearInterval(interval);
  }, []);
  
  // useEffect(()=>{
  //   const checkSession = () =>{
  //     const userId = localStorage.getItem("Id");
  //     const expiryTime = localStorage.getItem("expiry_time");
  //     // const expiryTime = localStorage.getItem("session_expiry");

  //     console.log(" Checking session:", { userId, expiryTime });


  //     if(userId && expiryTime){
  //       const now = Date.now();
  //       const expiryMs = new Date(expiryTime).getTime();
  //       // const expiryMs = parseInt(expiryTime,10);

  //       if(expiryMs > now){
  //      console.log(" Session valid");

  //         setIsLoggedIn(true);
  //       }else{
  //       console.log(" Session expired");

  //         localStorage.clear();
  //         setIsLoggedIn(false)
  //         // window.location.href = "/";
  //         navigate("/login",{replace: true})
  //       }
  //     }else{
  //     console.log("No Session found");

  //       setIsLoggedIn(false)
  //     }

  //     setLoading(false);
  //   }

  //   checkSession();

  //   const interval = setInterval(checkSession, 60* 1000);
  //   return () => clearInterval(interval);
  // },[navigate]);

   useEffect(() => {
    const checkSession = () => {
      const userId = localStorage.getItem("Id");
      const expiryTime = localStorage.getItem("expiry_time");

      if (userId && expiryTime) {
        const expiryMs = new Date(expiryTime).getTime();
        if (expiryMs > Date.now()) {
          setIsLoggedIn(true);
        } else {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkSession();

    const interval = setInterval(checkSession, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoggedIn === null) return null;
// if(loading) return null;

// const userId = localStorage.getItem("Id");
// const expiryTime = localStorage.getItem("expiry_time");

//   let isLoggedIn = false;
//   if (userId && expiryTime) {

//     const currentTime = Date.now(); // current time in ms
//     const expiry = new Date(expiryTime).getTime(); // convert expiry to ms

//     if (expiry > currentTime) {
//       isLoggedIn = true //expiryMs < now;
//     }
//   }


  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

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
