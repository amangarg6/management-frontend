import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Service from "./Service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

function Register() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role:null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      debugger
      try {
        const response = await Service.register(values);
        navigate("/login");

        toast.success("Register successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        toast.error("Registration failed", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
  });

  return (
    <>

    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header text-center">Register</div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-control ${
                      formik.touched.username && formik.errors.username
                      ? "is-invalid"
                      : ""
                    }`}
                    placeholder="Enter your username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    />
                  {formik.touched.username && formik.errors.username && (
                    <div className="invalid-feedback">
                      {formik.errors.username}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                    }`}
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                    }`}
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-info w-100"
                    disabled={formik.isSubmitting}
                    >
                    Register
                  </button>
                </div>

                <p className="text-center mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="btn btn-link">
                    Login now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
                    </>
  );
}

export default Register;
