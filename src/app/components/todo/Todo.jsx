import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneTodo } from "./todoSlice";
import "../../styles/Todo.css";
import { IoMdReturnLeft } from "react-icons/io";
import { User } from "../../Authentication/userAuthSlice";
import { useLoader } from "../../stories/LoaderContext";

const Todo = () => {
  const { userData, userDataLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { showLoader, hideLoader } = useLoader();

  const getUser = async () => {
    try {
      const response = await dispatch(User()).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await getUser();
      if (userData?.data) {
        await fetchData(userData.data);
      }
    };
    initialize();
  }, [dispatch, userData?.data]);

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const { getOneTodoDetails, getOneTodoLoading } = useSelector(
    (state) => state.todo
  );

  const fetchData = async (email) => {
    try {
      console.log(userData?.data);
      const response = await dispatch(
        getOneTodo({ id, email: email })
      ).unwarp();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {getOneTodoLoading || userDataLoading ? showLoader() : hideLoader()}
      <div className="Onetodo-container">
        <div className="Onetodo-title">{getOneTodoDetails.title}</div>
        <div className="Onetodo-description">
          {getOneTodoDetails.description}
        </div>
        <button className="return_btn" onClick={() => navigate("/todo")}>
          return <IoMdReturnLeft />
        </button>
      </div>
    </>
  );
};

export default Todo;
