import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ rememberToken }) => {
  const navigate = useNavigate();

  const[formState, setFormState] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit called");

    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: '{\n  "email": "user@example.com",\n  "password": "password123"\n}',
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // TODO: error handling
        if (data.error) {
          alert(data.error);
          return;
        }

        rememberToken(data.token);
        navigate("/");
        //setEvent(data)
      })
      .catch((error) => console.error("Error fetching event details:", error));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
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
