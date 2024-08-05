import React, { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "../../styles/dashboard.css";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneTrip, getTrips } from "../Itinerary/traveSlice";
import { User } from "../../Authentication/userAuthSlice";
import { GrShare } from "react-icons/gr";
import { IoMdTrash } from "react-icons/io";
import { useLoader } from "../../stories/LoaderContext";

const DashBoard = () => {
  const { TripsDetails, TripsDetailsLoading } = useSelector(
    (state) => state.travel
  );
  const dispatch = useDispatch();
  const { userData, userDataLoading } = useSelector((state) => state.user);

  const { showLoader, hideLoader } = useLoader();

  const getUser = async () => {
    try {
      const response = await dispatch(User()).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrips = async (email) => {
    try {
      const response = await dispatch(getTrips({ email })).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deleteOneTrip(id)).unwrap();
      console.log(response);
      await fetchTrips(userData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await getUser();
      if (userData?.data) {
        await fetchTrips(userData.data);
      }
    };
    initialize();
  }, [dispatch, userData?.data]);

  const navigate = useNavigate();

  return (
    <>
      {TripsDetailsLoading || userDataLoading ? showLoader() : hideLoader()}
      <div className="app-container">
        <div className="sidebar">
          <div className="sidebar-header"></div>
          <ul className="sidebar-list">
            <li className="sidebar-list-item">
              <a href="/">
                <span>Home</span>
              </a>
            </li>
            <li className="sidebar-list-item active">
              <a href="/dashboard">
                <span>My Trips</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/todo">
                <span>My Todos</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/">
                <span>Inbox</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="/">
                <span>Notifications</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Welcome to TravelHat 👋</h1>
            <button
              className="app-content-headerButton"
              onClick={() => navigate("/travel")}
            >
              <FaPlus />
              Trips
            </button>
          </div>
          <div className="search_container">
            <IoMdSearch className="search__icon" />
            <input
              name="search"
              placeholder="Search your Trips..."
              className="search-input-area"
            />
          </div>
          <div className="trip-list-cnt">
            <div className="your_trip_cnt">Your Trips</div>
            {TripsDetails?.length > 0 ? (
              TripsDetails.map((item, key) => (
                <div key={key} className="trip_list_container">
                  <div className="trip_list_items_cnt">
                    <span>{item?.trip_details?.destination}</span>
                    <div className="trip_date_cnt">
                      <span>{item?.trip_details?.start_date}</span>
                      <span>{item?.trip_details?.end_date}</span>
                    </div>
                    <div className="visit_cnt">
                      <GrShare
                        className="trip_logo"
                        onClick={() => navigate(`/trip/${item._id}`)}
                      />
                      <button
                        className="delete_btn_trip"
                        onClick={() => handleDelete(item._id)}
                      >
                        <IoMdTrash />
                        Travelled
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no_trips">
                No Trips Planned for now! Plan Now...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
