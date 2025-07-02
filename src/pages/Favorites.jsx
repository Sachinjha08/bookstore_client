import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Favourites.css";

export default function Favourites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`/books/get-favourite/${user._id}`);
      setFavorites(res.data.books);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchFavorites();
    }
  }, [user]);

  const removeFavorite = async (bookId) => {
    try {
      await axios.delete(`/books/remove-from-favourite/${bookId}`, {
        data: { userId: user._id },
      });
      fetchFavorites();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fav-container">
      <h2 className="fav-title">My Favorite Books</h2>
      {favorites.length === 0 ? (
        <p className="fav-empty">📚 No favorite books yet.</p>
      ) : (
        <div className="fav-grid">
          {favorites.map((book) => (
            <div key={book._id} className="fav-card">
              <img
                src={
                  book.image ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={book.name}
                className="fav-image"
              />
              <div className="fav-info">
                <h3>{book.name}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Language:</strong> {book.language}
                </p>
                <button
                  className="remove-btn"
                  onClick={() => removeFavorite(book._id)}
                >
                  ❌ Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
