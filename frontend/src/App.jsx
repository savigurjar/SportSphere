// import { useState ,useEffect} from 'react'

// import './App.css'
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgetPassword";
// import ResetPassword from "./pages/ResetPassword";
// import { Routes, Route, Navigate, Link } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { checkAuth } from "./features/authSlice";

// function App() {
//   const dispatch = useDispatch();

//   const { isAuthenticated, loading, user } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);


//   return (
//     <Routes>
//       {/* HOME */}
//       <Route
//         path="/"
//         element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
//       />

//       {/* AUTH */}
//       <Route
//         path="/login"
//         element={isAuthenticated ? <Navigate to="/" /> : <Login />}
//       />
//       <Route
//         path="/signup"
//         element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
//       />

//         {/* OTHER ROUTES */}
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/reset-password/:token" element={<ResetPassword />} />
//     </Routes>
//   )
// }

// export default App
import { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/authSlice";

// Layout
import AppLayout from "./components/AppLayout";

// Public pages (बिना login के accessible)
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

// Protected pages (login के बाद ही accessible)
import Dashboard from "./pages/Dashboard";
import Coaches from './pages/Coaches';
import Schedule from './pages/Schedule';
import Training from './pages/Training';
import Facilities from './pages/Facilities';
import Achievements from './pages/Achievement';

// Public info pages - अगर ये files नहीं हैं तो temporary बना लें
const About = () => (
  <div className="min-h-screen bg-black text-white p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About Himalayan Sports Academy</h1>
      <p className="text-gray-300">About page content coming soon...</p>
    </div>
  </div>
);



const Contact = () => (
  <div className="min-h-screen bg-black text-white p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-300">Contact page content coming soon...</p>
    </div>
  </div>
);

const FAQ = () => (
  <div className="min-h-screen bg-black text-white p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <p className="text-gray-300">FAQ page content coming soon...</p>
    </div>
  </div>
);

// Protected pages - temporary placeholders
const Profile = () => (
  <div className="min-h-screen bg-black text-white p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">My Profile</h1>
      <p className="text-gray-300">Profile page content coming soon...</p>
    </div>
  </div>
);









function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-black">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DCE7C6]"></div>
  //     </div>
  //   );
  // }

  return (
    <Routes>
      {/* Public Routes - AppLayout के साथ */}
      <Route path="/" element={
        <AppLayout>
          <Home />
        </AppLayout>
      } />
      
      <Route path="/login" element={
        isAuthenticated ? 
        <Navigate to="/dashboard" /> : 
        <AppLayout>
          <Login />
        </AppLayout>
      } />
      
      <Route path="/signup" element={
        isAuthenticated ? 
        <Navigate to="/dashboard" /> : 
        <AppLayout>
          <Signup />
        </AppLayout>
      } />
      
      <Route path="/forgot-password" element={
        <AppLayout>
          <ForgotPassword />
        </AppLayout>
      } />
      
      <Route path="/reset-password/:token" element={
        <AppLayout>
          <ResetPassword />
        </AppLayout>
      } />
      
      {/* Other Public Pages */}
      <Route path="/about" element={
        <AppLayout>
          <About />
        </AppLayout>
      } />
      
      <Route path="/facilities" element={
        <AppLayout>
          <Facilities />
        </AppLayout>
      } />
      
      <Route path="/contact" element={
        <AppLayout>
          <Contact />
        </AppLayout>
      } />
      
      <Route path="/faq" element={
        <AppLayout>
          <FAQ />
        </AppLayout>
      } />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        isAuthenticated ? 
        <AppLayout>
          <Dashboard />
        </AppLayout> : 
        <Navigate to="/login" />
      } />
      
      <Route path="/profile" element={
        isAuthenticated ? 
        <AppLayout>
          <Profile />
        </AppLayout> : 
        <Navigate to="/login" />
      } />
      
      <Route path="/training" element={
        isAuthenticated ? 
        <AppLayout>
          <Training />
        </AppLayout> : 
        <Navigate to="/login" />
      } />
      
      <Route path="/coaches" element={
        isAuthenticated ? 
        <AppLayout>
          <Coaches />
        </AppLayout> : 
        <Navigate to="/login" />
      } />
      
      <Route path="/schedule" element={
        isAuthenticated ? 
        <AppLayout>
          <Schedule />
        </AppLayout> : 
        <Navigate to="/login" />
      } />
      
      <Route path="/achievements" element={
        isAuthenticated ? 
        <AppLayout>
          <Achievements />
        </AppLayout> : 
        <Navigate to="/login" />
      } />
      
      <Route path="/settings" element={
        isAuthenticated ? 
        <AppLayout>
          <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">Settings</h1>
              <p className="text-gray-300">Settings page content coming soon...</p>
            </div>
          </div>
        </AppLayout> : 
        <Navigate to="/login" />
      } />
      
      <Route path="/admin" element={
        isAuthenticated ? 
        <AppLayout>
          <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
              <p className="text-gray-300">Admin panel content coming soon...</p>
            </div>
          </div>
        </AppLayout> : 
        <Navigate to="/login" />
      } />
    </Routes>
  );
}

export default App;