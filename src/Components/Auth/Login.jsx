import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = (e) => {
    e.preventDefault();

    const validEmail = "admin@gmail.com";
    const validPassword = "123";

    if (email === validEmail && password === validPassword) {
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1300);
    } else {
      // Show error message
      toast.error("Invalid credentials", {
        position: "top-center",
        autoClose: 3000,
      });
    }

    setEmail("")
    setPassword("")
  };

  return (
    <div>
      <form className="login" onSubmit={handleLogin}>
        <h2>Welcome</h2>
        <p>Please log in</p>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="py-2 px-2 rounded-3 w-100">
          Log In
        </button>
      </form>

      {/* Toast Container for displaying messages */}
      <ToastContainer />
    </div>
  );
};

export default Login;
