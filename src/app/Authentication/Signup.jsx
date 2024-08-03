import { Field, Form, Formik } from "formik";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import "../styles/Login.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./userAuthSlice";

const validationSchema = Yup.object({
  username: Yup.string().required("Enter your username"),
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("Enter your password")
    .min("6", "minimum six digit is required")
    .required("Password is required"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await dispatch(
        registerUser({
          name: values.username,
          email: values.email,
          password: values.password,
        })
      ).unwrap();
      console.log(response);
      if (response?.status == 201) {
        navigate("/login");
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        isSubmitting,
        isValid,
        dirty,
        setFieldValue,
        resetForm,
      }) => (
        <div className="carrerMatter-login-container">
          <Form className="form-input-wrapper">
            <div className="container-login-carrerMatter">
              <h2 style={{ textAlign: "center" }}>Signup to get started</h2>
              <button className="google-matter-button">
                <FcGoogle className="google-matter-icon" />{" "}
                <span className="google_text">Continue with Google</span>
              </button>
              <p style={{ textAlign: "center" }}>OR</p>
              <label htmlFor="email">UserName</label>
              <Field
                as="input"
                type="text"
                placeholder="Username"
                name="username"
                className="container-login-carrerMatter_input"
              />
              <label htmlFor="email">Email</label>
              <Field
                as="input"
                type="email"
                placeholder="youremail@mail.com"
                name="email"
                className="container-login-carrerMatter_input"
              />

              <label htmlFor="password">Password</label>
              <Field
                as="input"
                type="password"
                name="password"
                placeholder="At least 6 characters"
                className="container-login-carrerMatter_input"
              />

              <button type="submit" className="continue-matter-button">
                Continue
              </button>
              <p style={{ textAlign: "center" }}>OR</p>
              <button
                className="toggle-matter-button"
                type="button"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Signup;
