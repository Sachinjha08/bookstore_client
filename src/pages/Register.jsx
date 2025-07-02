import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    profile: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "profile") {
      setForm({ ...form, profile: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));

    try {
      await axios.post("/users/register", data);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input name="profile" type="file" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
