import React, { useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "../../styles/TodoForm.css";
import { useDispatch, useSelector } from "react-redux";
import { getTodo } from "./todoSlice";
import { User } from "../../Authentication/userAuthSlice";

const TodoContainer = () => {
  const { getTodoDetails } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

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

  const fetchData = async (userData) => {
    try {
      console.log(userData?.data);
      const response = await dispatch(
        getTodo({
          email: userData?.data,
        })
      ).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="todo_container">
        <TodoForm fetchData={fetchData} />
        <TodoList fetchData={fetchData} getTodoDetails={getTodoDetails} />
      </div>
    </>
  );
};

export default TodoContainer;
