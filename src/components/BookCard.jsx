import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import "../styles/BookCard.css";

export default function BookCard({ book }) {
  const { user } = useContext(AuthContext);

  const handleFavorite = () => {
    if (!user) return alert("Login first!");
    axios
      .post(`/books/add-to-favourite/${book._id}`, { userId: user._id })
      .then(() => alert("Added to favorites"))
      .catch(() => alert("Something went wrong!"));
  };

  return (
    <div className="book-card">
      <img
        src={book.image || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={book.name}
        className="book-image"
      />
      <div className="book-details">
        <h3 className="book-title">{book.name}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-language">Language: {book.language}</p>
        <button className="fav-btn" onClick={handleFavorite}>
          ❤️ Add to Favorite
        </button>
      </div>
    </div>
  );
}
