import { Link } from "react-router-dom";

const Hero = ({ token }) => {
  return (
    <div
      className="hero min-h-screen mb-4"
      style={{
        backgroundImage: "url(https://i.postimg.cc/y86GJN9F/schedule.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Upcoming Events</h1>
          <p className="mb-5">Join us in our important dates and events</p>
          {token ? (
            <h2 className="text-3xl">Welcome back!</h2>
          ) : (
            <Link to="/login" className="btn btn-primary ">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;