import React, { useEffect } from "react";
import "../../styles/TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, updateTodo } from "./todoSlice";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { User } from "../../Authentication/userAuthSlice";

const TodoList = ({ fetchData, getTodoDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, userDataLoading } = useSelector((state) => state.user);

  const handleUpdate = async (id) => {
    try {
      const response = await dispatch(updateTodo(id)).unwrap();
      console.log(response);
      fetchData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deleteTodo(id)).unwrap();

      fetchData(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      fetchData(userData);
    }
  }, [userData]);

  return (
    <div className="todo_list_container">
      <p className="todo_main_heading">Your Tasks</p>
      {Object.keys(userData).length > 0 ? (
        Object.keys(getTodoDetails).length === 0 ? (
          <div>No Todos For Now</div>
        ) : (
          getTodoDetails?.map((todo, key) => {
            return (
              <div className="one_todo_cnt">
                <div className="todo_list" key={key}>
                  <span
                    className={
                      todo.completed
                        ? "todo_list_text_completed"
                        : "todo_list_text"
                    }
                    onClick={() => navigate(`/todo/${todo._id}`)}
                  >
                    {todo.title}
                  </span>

                  <span
                    className={
                      todo.completed
                        ? "is_completed_true"
                        : "is_completed_false"
                    }
                  >
                    {todo.completed ? "DONE" : "IN PROGRESS"}
                  </span>
                </div>
                <IoCheckmarkCircleSharp
                  className={todo.completed ? "completedd" : "not_completed"}
                  onClick={() => handleUpdate(todo._id)}
                />

                <MdDelete
                  className="del_btn"
                  onClick={() => handleDelete(todo._id)}
                />
              </div>
            );
          })
        )
      ) : (
        <div>Login-Signup to get your todos</div>
      )}
    </div>
  );
};

export default TodoList;
