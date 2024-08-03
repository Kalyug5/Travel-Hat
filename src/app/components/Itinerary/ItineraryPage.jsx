import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/Itinary.css";
import { GiAirplaneDeparture } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import { getTrip } from "./traveSlice";
import { User } from "../../Authentication/userAuthSlice";

const ItineraryPage = () => {
  const { TripDetail, TripDetailLoading } = useSelector(
    (state) => state.travel
  );
  const { itinerary, trip_details } = TripDetail || {};
  const { userData, userDataLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await dispatch(User()).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (email) => {
    try {
      const response = await dispatch(
        getTrip({
          email: email,
          id: id,
        })
      ).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await getUser();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (userData?.data) {
      fetchData(userData.data);
    }
  }, [userData]);

  console.log(TripDetail);

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <div className="ticket-header_left">
          <div className="ticket-hdr-cnt">
            <h2>{`Trip to ${trip_details?.destination}`}</h2>
            <GiAirplaneDeparture className="departure_logo" />
          </div>
          <p>{`${trip_details?.start_date} - ${trip_details?.end_date}`}</p>
          <p>{`Budget: $${trip_details?.budget}`}</p>
        </div>
        <button
          className="trip_return_btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>
      <div className="ticket-grid">
        {itinerary?.map((dayPlan, index) => (
          <div key={index} className="ticket-day">
            <div className="ticket-date">
              <span className="ticket-date-cnt">
                {new Date(trip_details.start_date).getDate() + index}
              </span>
              <span className="ticket-date-cnt">
                {new Date(trip_details.start_date).toLocaleString("default", {
                  month: "short",
                })}
              </span>
            </div>
            <h3>{dayPlan.day}</h3>
            <p>{dayPlan.description}</p>
            <div className="ticket-section">
              <h4>Accommodation</h4>
              <p>{dayPlan.accommodation}</p>
            </div>
            <div className="ticket-section">
              <h4>Activities</h4>
              <ul>
                {dayPlan.activities.map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))}
              </ul>
            </div>
            <div className="ticket-section">
              <h4>Attractions</h4>
              <ul>
                {dayPlan.attractions.map((attraction, idx) => (
                  <li key={idx}>{attraction}</li>
                ))}
              </ul>
            </div>
            <div className="ticket-section">
              <h4>Dining</h4>
              <ul>
                {dayPlan.dining.map((dining, idx) => (
                  <li key={idx}>{dining}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryPage;
