import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear user from context
    localStorage.removeItem("user"); // Or remove from cookie/session
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          📚 BookVerse
        </Link>
      </div>
      <div className="navbar-right">
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/favorites">Favorites</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
