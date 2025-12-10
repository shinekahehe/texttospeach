import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // new state

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = isLogin ? "http://localhost:8081/login" : "http://localhost:8081/register";

    axios
      .post(url, { email, password })
      .then((res) => setMessage(res.data))
      .catch(() => setMessage("Error connecting to server"));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-light">
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"} // toggle type
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="btn btn-success w-100">{isLogin ? "Login" : "Register"}</button>
        </form>

        {message && (
          <div
            className={`alert mt-3 ${
              message.includes("successful") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <p className="mt-3 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
