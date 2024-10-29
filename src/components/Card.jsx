import React from 'react';

const Card = ({ title, description, date, location, onClick }) => {
  return (
    <div className="card bg-primary text-primary-content w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p className="text-sm">{new Date(date).toLocaleDateString()}</p>
        <p className="text-sm">{location}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary" onClick={onClick}>View Details</button>
        </div>
      </div>
    </div>
  );
};
export default Card;