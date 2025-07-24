import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Box, Toolbar } from '@mui/material';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from 'react'
import React, { useEffect } from "react";

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { setUser } from './features/auth/authSlice';

import './App.css'

import Home from "./pages/Home"; 
import Navbar from "./components/Navbar";
import About from './pages/About';
import Contact from "./pages/Contact";
import Products from "./pages/Products";

import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Catalogue from "./pages/Catalogue";
import Checkout from "./pages/Checkout";
import Profile from './pages/Profile';
import DealerDashboard from './pages/DealerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from "./pages/Unauthorized";
import ThankYou from "./pages/Thankyou";
import ProtectedRoute from "./routes/ProtectedRoute";

import OrdersHistory from "./pages/OrdersHistory";

import uploadDummyData from "./utils/uploadDummyData";

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

const InlineProtectedRoute = ({ element, allowedRoles }) => {
  const { user, role } = useSelector(state => state.auth);
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;
  return element;
};

function App() {
  const dispatch = useDispatch();
   useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const role = localStorage.getItem("role") ;
        const safeUser = {
        uid: user.uid,
        email : user.email,
        displayName : user.displayName || "",
         };

        dispatch(setUser({ user : safeUser, role }));
      }
    });
    return unsubscribe;
  }, [dispatch]);


  return (
    <>
    <Router>
      <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path ="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/catalogue" element={<Catalogue />} />
        
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/orders" element={
            <InlineProtectedRoute element={<OrdersHistory />} allowedRoles={['user', 'dealer']} />} />
         <Route path="/profile" element={
            <InlineProtectedRoute element={<Profile />} allowedRoles={['user', 'dealer', 'admin']} />
          } />
          <Route path="/dealer-dashboard" element={
            <InlineProtectedRoute element={<DealerDashboard />} allowedRoles={['dealer']} />
          } />
          <Route path="/admin-dashboard" element={
            <InlineProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />
          } /> 

          <Route path="/checkout" element={
            <InlineProtectedRoute element={<Checkout />} allowedRoles={["user", "dealer"]} />
          } />
          {/* <Route path="/checkout" element={<Checkout />} /> */}

          <Route path="/unauthorized" element={<Unauthorized />} />
        
         
        
      </Routes>
      </LayoutWrapper>
    </Router>
    <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
