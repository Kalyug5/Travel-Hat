import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Logout, User } from "../../Authentication/userAuthSlice";

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

const Header = () => {
  const { userData, userDataLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await dispatch(Logout()).unwrap();
      console.log(getCookie("token"));
      console.log(response);
    } catch (error) {}
  };

  const fectchData = async () => {
    try {
      const response = await dispatch(User()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fectchData();
  }, []);

  return (
    <div className="home_header_container">
      <div>
        <Link className="home_item" to="/">
          <img src={logo} alt="img" className="logo" />
        </Link>
      </div>
      <div className="home_header_subcontent">
        <Link className="home_item" to="/about">
          About
        </Link>
        <Link className="home_item" to="/services">
          Services
        </Link>
        {Object.keys(userData).length > 0 ? (
          <button className="home_item_btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="home_item" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
