import React from 'react';

const Card = ({ title, description, date, location }) => {
  return (
    <div className="card bg-primary text-primary-content w-96 mb-4">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {location}</p>
        <div className="card-actions justify-end">
          <button className="btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
