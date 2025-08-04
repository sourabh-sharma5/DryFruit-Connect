// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { Box, Toolbar } from '@mui/material';
// import { useState } from 'react'
// import React, { useEffect } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import {ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 

// import { fetchCart } from "./features/cart/cartSlice";
// import { onAuthStateChanged } from 'firebase/auth';
// import { useDispatch, useSelector } from 'react-redux';
// import { auth, db } from './firebase';
// import { setUser, clearUser } from './features/auth/authSlice';

// import './App.css'

// import Home from "./pages/Home"; 
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Navbar from "./components/Navbar";
// import About from './pages/About';
// import Contact from "./pages/Contact";
// import Products from "./pages/Products";

// import Cart from "./pages/Cart";
// import ProductDetail from "./pages/ProductDetail";
// import Catalogue from "./pages/Catalogue";
// import Checkout from "./pages/Checkout";
// import Profile from './pages/Profile';
// import DealerDashboard from './pages/DealerDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import Unauthorized from "./pages/Unauthorized";
// import ThankYou from "./pages/Thankyou";
// import ProtectedRoute from "./routes/ProtectedRoute";

// import OrdersHistory from "./pages/OrdersHistory";
// import AdminOrders from "./pages/AdminOrders";

// import uploadDummyData from "./utils/uploadDummyData";

// const LayoutWrapper = ({ children }) => {
//   const location = useLocation();
//   const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";


//   return (
//     <>
//       {!isAuthPage && <Navbar />}
//       <Box component="main">
//         {!isAuthPage && <Toolbar />} 
//         {children}
//       </Box>
//     </>
//   );
// };

// const InlineProtectedRoute = ({ element, allowedRoles }) => {
//   const { user, role } = useSelector(state => state.auth);
//   if (!user) return <Navigate to="/login" />;
//   if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;
//   return element;
// };

// function App() {
//   const dispatch = useDispatch();
//   const {user} = useSelector((state) => state.auth );
//    useEffect(() => {

//     if (user && user.uid) {
//       dispatch(fetchCart(user.uid));
//     }
   
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         try {
//           const profileRef = doc(db, "users", firebaseUser.uid);
//           const profileSnap = await getDoc(profileRef);

//           const role =
//             profileSnap.exists() && profileSnap.data().role
//               ? profileSnap.data().role
//               : "user";

//           const safeUser = {
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             displayName: firebaseUser.displayName || null,
//           };

//           dispatch(setUser({ user: safeUser, role }));
//         } catch (error) {
//           console.error("Error fetching user profile from Firestore:", error);
//           dispatch(clearUser());
//         }
//       } else {
//         dispatch(clearUser());
//       }
//     });

//     return () => unsubscribe();
//   }, [user, dispatch]);



//   return (
//     <>
//     <Router>
//       <LayoutWrapper>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={user ? <Navigate to = "/profile" replace/> : <Login />} />
//         <Route path="/signup" element={user ? <Navigate to = "/profile" replace /> : <Signup />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/products" element={<Products />} />
//         <Route path ="/cart" element={<Cart />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//         <Route path="/catalogue" element={<Catalogue />} />
        
//         <Route path="/thank-you" element={<ThankYou />} />


//         {/* <Route path="/orders" element={
//             <InlineProtectedRoute element={<OrdersHistory />} allowedRoles={['user', 'dealer']} />} /> */}

//             <Route
//               path="/orders"
//               element={
//                 <ProtectedRoute allowedRoles={["user", "dealer"]}>
//                   <OrdersHistory />
//                 </ProtectedRoute>
//               }
//             />



//          {/* <Route path="/profile" element={
//             <InlineProtectedRoute element={<Profile />} allowedRoles={['user', 'dealer', 'admin']} />
//           } /> */}

//            <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute allowedRoles={["user", "dealer", "admin"]}>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />



//           {/* <Route path="/dealer-dashboard" element={
//             <InlineProtectedRoute element={<DealerDashboard />} allowedRoles={['dealer']} />
//           } /> */}

//           <Route
//               path="/dealer-dashboard"
//               element={
//                 <ProtectedRoute allowedRoles={["dealer"]}>
//                   <DealerDashboard />
//                 </ProtectedRoute>
//               }
//             />


//           {/* <Route path="/admin-dashboard" element={
//             <InlineProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />
//           } />  */}


//           <Route
//               path="/admin-dashboard"
//               element={
//                 <ProtectedRoute allowedRoles={["admin"]}>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />


//           <Route path="/checkout" element={
//             <InlineProtectedRoute element={<Checkout />} allowedRoles={["user", "dealer"]} />
//           } />
//           {/* <Route path="/checkout" element={<Checkout />} /> */}
//           {/* <Route
//               path="/checkout"
//               element={
//                 <ProtectedRoute allowedRoles={["user", "dealer"]}>
//                   <Checkout />
//                 </ProtectedRoute>
//               }
//             /> */}

//             <Route path="/admin-orders" element = {
//               <ProtectedRoute allowedRoles={["admin"]}>
//                 <AdminOrders/>
//               </ProtectedRoute>
//             }
//             />

//           <Route path="/unauthorized" element={<Unauthorized />} />

//           <Route path="*" element={<Navigate to="/" replace />} />

        
         
        
//       </Routes>
//       </LayoutWrapper>
//     </Router>
//     <ToastContainer position="top-right" autoClose={2000} />
//     </>
//   );
// }

// export default App;





import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Box, Toolbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { fetchCart } from "./features/cart/cartSlice";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { setUser, clearUser } from './features/auth/authSlice';
import { doc, getDoc } from "firebase/firestore";
import './App.css';

import Home from "./pages/Home"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
import OrdersHistory from "./pages/OrdersHistory";
import AdminOrders from "./pages/AdminOrders";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminNavbar from "./components/Admin/AdminNavbar";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isAdminPage = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      {!isAuthPage && (isAdminPage ? <AdminNavbar/> : <Navbar />)}
      <Box component="main">
        {!isAuthPage && <Toolbar />} 
        {children}
      </Box>
    </>
  );
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    
    if (user && user.uid) {
      dispatch(fetchCart(user.uid));
    }
  }, [user, dispatch]);

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profileRef = doc(db, "users", firebaseUser.uid);
          const profileSnap = await getDoc(profileRef);
          const role =
            profileSnap.exists() && profileSnap.data().role
              ? profileSnap.data().role
              : "user";
          const safeUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || null,
          };

          dispatch(setUser({ user: safeUser, role }));
        } catch (error) {
          console.error("Error fetching user profile from Firestore:", error);
          dispatch(clearUser());
        }
      } else {
        dispatch(clearUser());
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
            <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/profile" replace /> : <Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/thank-you" element={<ThankYou />} />

            
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={["user", "dealer"]}>
                  <OrdersHistory />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["user", "dealer", "admin"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={["user", "dealer"]}>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dealer-dashboard"
              element={
                <ProtectedRoute allowedRoles={["dealer"]}>
                  <DealerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-orders"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminOrders />
                </ProtectedRoute>
              }
            />

            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LayoutWrapper>
      </Router>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
export default App;
