import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
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

    fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: '{\n  "email": "user@example.com",\n  "password": "password123"\n}',
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
        navigate("/login");
      })
      .catch((error) => console.error("Error fetching event details:", error));
  };
  return (
    <div className="hero bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="card bg-gray-700 w-full max-w-md md:max-w-lg lg:max-w-2xl p-8 shadow-2xl rounded-lg">
          <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="text-2xl text-blue-500 font-bold mb-6 text-center">Sign Up</h2>
            <div className="form-control">
              <label className="label">
                <span className="text-white">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="your name"
                className="input input-bordered"
                required
                onChange={handleChange}
                value={formState.name}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-white">Email</span>
              </label>
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
            <div className="form-control">
              <label className="label">
                <span className="text-white">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                onChange={handleChange}
                value={formState.password}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-xl">Sign up</button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default SignupForm;
