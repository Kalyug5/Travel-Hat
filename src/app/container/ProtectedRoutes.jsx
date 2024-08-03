import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../Authentication/userAuthSlice";
import Login from "../Authentication/Login";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { userData, userDataLoading } = useSelector((state) => state.user);

  useEffect(() => {
    getUser();
  }, [dispatch, userData?.data]);

  const getUser = async () => {
    try {
      const response = await dispatch(User()).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (userData?.data) {
    return children;
  }

  return <Login />;
};

export default ProtectedRoutes;
