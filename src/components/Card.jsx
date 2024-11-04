const Card = ({ title, description, date, location, image, onClick }) => {
  return (
    <div className="card bg-base-100 image-full w-full shadow-xl hover:scale-105 hover:shadow-2xl hover:shadow-primary transition-all duration-300 ease-out">
      <figure>
        <img
          src={image}
          alt={title} 
        />
      </figure>
      <div className="card-body">
        <h2 className="text-2xl text-center text-blue-500">{title}</h2>
        <p>{description}</p>
        <h3>{new Date(date).toLocaleDateString()}</h3>
        <h4>{location}</h4>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onClick}>View Details</button>
        </div>
      </div>
    </div>
  );
};
export default Card;
