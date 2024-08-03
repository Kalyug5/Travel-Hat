import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./../../styles/TodoForm.css";
import { FcTodoList } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "./todoSlice";
import { User } from "../../Authentication/userAuthSlice";

const initialValue = {
  title: "",
  description: "",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Description must be 500 characters or less"),
});

const TodoForm = ({ fetchData }) => {
  const dispatch = useDispatch();
  const { userData, userDataLoading } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      const response = await dispatch(User()).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    if (Object.keys(userData).length > 0 && userData?.data != "") {
      try {
        const response = await dispatch(
          createTodo({
            title: values.title,
            description: values.description,
            email: userData?.data,
          })
        ).unwrap();
        console.log(response);
        fetchData(userData);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please login to create a todo");
    }

    resetForm();
  };
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values, handleBlur }) => (
        <Form className="form">
          <div className="title">
            Create Your Todo Now <FcTodoList />
          </div>
          <div className="input-container ic1">
            <Field
              type="text"
              name="title"
              onBlur={handleBlur}
              value={values.title}
              className="input"
              placeholder="Title"
            />

            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div className="txtarea-container ic1">
            <Field
              as="textarea"
              name="description"
              onBlur={handleBlur}
              value={values.description}
              className="input"
              placeholder="Description"
              rows={4}
            />

            <ErrorMessage
              name="description"
              className="error"
              component="div"
            />
          </div>

          <div>
            <button type="submit" className="submit">
              add +
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
