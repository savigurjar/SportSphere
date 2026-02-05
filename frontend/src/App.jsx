import { useState ,useEffect} from 'react'

import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { Routes, Route, Navigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/authSlice";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  return (
    <Routes>
      {/* HOME */}
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />

      {/* AUTH */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
      />

        {/* OTHER ROUTES */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  )
}

export default App
