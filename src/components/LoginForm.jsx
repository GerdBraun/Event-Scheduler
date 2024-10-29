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
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/auth/login", {
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

        rememberToken(data.token);
        navigate("/");
      })
      .catch((error) => console.error("Error fetching event details:", error));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
          Log in nunc et incipias addendo vel emendando eventus!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                onChange={handleChange}
                value={formState.email}
                />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
