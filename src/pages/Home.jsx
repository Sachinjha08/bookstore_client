import { useEffect, useState } from "react";
import axios from "../api/axios";
import BookCard from "../components/BookCard";
import "../styles/Home.css";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("/books/get-all-books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="home-container">
      <section className="intro-section">
        <div className="intro-text">
          <h1>Welcome to BookVerse</h1>
          <p>
            Discover a universe of books across various genres curated just for
            you. Dive in, explore stories, and find your next favorite read.
          </p>
        </div>
        <div className="intro-image">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Bookshelf"
          />
        </div>
      </section>

      <section className="books-section">
        <h2 className="section-title">All Books</h2>
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
