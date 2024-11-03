import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ rememberToken }) => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formState.email,
        password: formState.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }

        rememberToken(data.token);
        navigate("/");
      })
      .catch((error) => console.error("Error fetching event details:", error));
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Assuming the route to SignUpForm is '/signup'
  };

  return (
    <div className="hero bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="card bg-gray-700 w-full max-w-md md:max-w-lg lg:max-w-2xl p-8 shadow-2xl rounded-lg">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-blue-500 font-bold mb-6 text-center">Log In</h2>
          <div className="form-control mb-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
              onChange={handleChange}
              value={formState.email}
            />
          </div>
          <div className="form-control mb-4">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered"
              required
              onChange={handleChange}
              value={formState.password}
            />
            <label className=" text-white">
              <a href="#" className="label-text-alt link link-hover text-blue-500 text-sm">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-4">
            <button className="btn btn-primary text-xl mb-4">Log In</button>
          </div>
          <div className="flex text-center">
            <p className=" text-white">Don&apos;t have an account?
            <a href="#" onClick={handleSignUpClick} className="label-text-alt p-2 link link-hover text-blue-500 text-xl">
                Sign Up
              </a>
              </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
