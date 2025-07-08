import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Box, Toolbar } from '@mui/material';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from 'react'
import './App.css'
import Home from "./pages/Home"; 
import Navbar from "./components/Navbar";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Box component="main">
        {!isAuthPage && <Toolbar />} 
        {children}
      </Box>
    </>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
