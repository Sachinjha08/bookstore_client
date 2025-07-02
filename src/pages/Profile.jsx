import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import "../styles/Profile.css";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    profile: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        password: "",
        profile: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      setFormData((prev) => ({ ...prev, profile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      const res = await axios.put(`/users/update-user/${user._id}`, data);
      setUser(res.data.updatedUser);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-image-container">
          <img
            src={
              user?.profile?.url ||
              "https://via.placeholder.com/100x100.png?text=Profile"
            }
            alt="profile"
            className="profile-image"
          />
        </div>

        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="New Password"
          onChange={handleChange}
        />

        <input
          type="file"
          name="profile"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
