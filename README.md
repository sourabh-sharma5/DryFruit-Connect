# DryFruitBroker - Dry Fruits Broker Platform

DryFruitBroker is a modern e-commerce platform designed for dry fruit brokers. It features robust user authentication, product management, cart and checkout flows, and an admin dashboard. The app is built with React, Redux Toolkit, Firebase cloud backend, and Axios-powered REST APIs.

---

## Features

- **User Authentication** via Firebase Auth with login/signup and role-based access control (User, Dealer, Admin).
- **Cart Management** with seamless guest-to-user cart merging on login/signup.
- **Product Listings and Orders** managed via RESTful API backed by Firebase Cloud Functions.
- **Admin Dashboard** for user and order management.
- **Form Validation** with Yup and Formik for robust frontend input validation.
- **Backend** implemented with Firebase Cloud Functions using Express and CORS middleware.
- **Axios** for all REST API calls from the frontend with token-based auth header injection.

---

## Architecture & Technology Stack

| Frontend                             | Backend                                      | Database           | Authentication      |
|------------------------------------|----------------------------------------------|--------------------|---------------------|
| React 18 + vite + Redux Toolkit            | Firebase Cloud Functions (Node.js, Express) | Firestore (NoSQL)  | Firebase Authentication |
| Axios for HTTP requests             | CORS enabled Express app                      |                    |                     |
| Yup + Formik for form validation    | Modular Firebase Admin SDK                    |                    |                     |
| Material UI for UI components       |                                              |                    |                     |

---


