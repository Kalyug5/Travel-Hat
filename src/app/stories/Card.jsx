import React from "react";
import "../styles/Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ card }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (card.id === 1) {
      navigate("/todo");
    } else if (card.id === 2) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="new_template-card" onClick={handleClick}>
      <div className="new_template-card-image">
        <img src={card?.imageSrc} alt={card?.title} />
      </div>
      <div className="new_template-card-content">
        <h3 className="new_template-card-title">{card?.title}</h3>
        <p className="new_template-card-description">{card?.description}</p>
      </div>
    </div>
  );
};

export default Card;
