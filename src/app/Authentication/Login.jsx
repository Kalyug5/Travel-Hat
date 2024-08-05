import { Field, Form, Formik } from "formik";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import "../styles/Login.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, userLogin } from "./userAuthSlice";

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Required*"),
  password: Yup.string("Enter password")
    .min("2", "minimum six digit is required")
    .required("Required*"),
});

const initialValues = {
  email: "",
  password: "",
};

export const getCookie = (cookieName) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fectchData = async () => {
    try {
      const response = await dispatch(User()).unwrap();
      console.log(response);
      console.log(getCookie("token"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await dispatch(
        userLogin({
          email: values.email,
          password: values.password,
        })
      ).unwrap();
      console.log(response);
      if (response?.status == 200) {
        localStorage.setItem("token", response.token);
        fectchData();
        navigate("/");
        resetForm();
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      resetForm();
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
              <h2 style={{ textAlign: "center" }}>Login to get started</h2>
              <button className="google-matter-button">
                <FcGoogle className="google-matter-icon" />{" "}
                <span className="google_text">Continue with Google</span>
              </button>
              <p style={{ textAlign: "center" }}>OR</p>
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
                placeholder="At least 4 characters"
                className="container-login-carrerMatter_input"
              />
              <div className="forgot__pass">Forgot Password?</div>
              <button type="submit" className="continue-matter-button">
                Log In
              </button>
              <p style={{ textAlign: "center" }}>OR</p>
              <button
                className="toggle-matter-button"
                type="button"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
