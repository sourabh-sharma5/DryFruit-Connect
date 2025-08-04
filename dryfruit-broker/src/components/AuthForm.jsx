import React from 'react';
import { useFormik } from 'formik';
import { loginSchema, signupSchema } from '../../validation/authValidation';
import { TextField, Button, Box } from '@mui/material';

export default function AuthForm({ isLogin, onSubmit, loading }) {
  const validationSchema = isLogin ? loginSchema : signupSchema;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      userName: '',
      address: '',
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <TextField
        fullWidth
        margin="normal"
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      {!isLogin && (
        <>
          <TextField
            fullWidth
            margin="normal"
            id="userName"
            name="userName"
            label="Username"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />
          <TextField
            fullWidth
            margin="normal"
            id="address"
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </>
      )}

      <TextField
        fullWidth
        margin="normal"
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <Box mt={2}>
        <Button color="primary" variant="contained" fullWidth type="submit" disabled={loading}>
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </Box>
    </form>
  );
}
