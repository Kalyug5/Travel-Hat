import React from "react";
import "../../styles/Home.css";
import men from "../../images/travelmen.jpg";
import bag2 from "../../images/bag2.jpg";
import Card from "../../stories/Card";
import task from "../../images/task.jpg";
import { useNavigate } from "react-router-dom";

const card = [
  {
    id: 1,
    title: "Make your Todo",
    imageSrc: task,
    description: `Effortlessly manage your tasks 
      with our intuitive to-do list feature. Create, update, and organize your to-dos seamlessly.`,
  },
  {
    id: 2,
    title: "Plan your Travel",
    imageSrc: bag2,
    description:
      "Plan your perfect getaway with our personalized travel itinerary feature. Enjoy tailored daily activities and accommodations.",
  },
];

const Home = () => {
  return (
    <>
      <div className="home_content_container">
        <div className="home_left_container">
          <h1 className="home_title">Organize Life, Explore the World</h1>
          <p className="home_sub_title">Stay Productive, Travel Smart !</p>

          <div className="feature_card_container">
            {card.map((item) => {
              return <Card card={item} />;
            })}
          </div>
          <div className="information">
            <b style={{ color: "blue" }}>Note:</b> Currently, only two features
            are active and in the development stage. As a result, our
            application doesn't provide full-fledged optimization and true
            experiences yet. We are continuously working to improve and expand
            our offerings to deliver a more complete and optimized experience
            for our users. Thank you for your patience and support as we enhance
            our platform.
          </div>
        </div>
        <img className="home_right_container" src={men} alt="img" />
      </div>
    </>
  );
};

export default Home;
