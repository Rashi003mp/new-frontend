import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      const result = await login(values.email, values.password);

      if (result.success) {
        setStatus({ success: "Login successful!" });
        resetForm();
        navigate('/');
      } else {
        setStatus({ error: result.error });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">My Account</h2>
      
      <div className="mb-6 text-center">
        <p className="text-gray-600">I already have an account</p>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Login*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email address"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
            Password*
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
          )}
        </div>

        {formik.status && formik.status.success && (
          <div className="text-green-600 text-sm">{formik.status.success}</div>
        )}
        {formik.status && formik.status.error && (
          <div className="text-red-600 text-sm">{formik.status.error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          New to our store?{" "}
          <button 
            onClick={() => navigate('/registration')} 
            className="text-black font-medium hover:underline focus:outline-none"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;