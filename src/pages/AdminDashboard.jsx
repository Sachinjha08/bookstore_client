import { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    language: "",
    summary: "",
    image: "",
  });

  const fetchBooks = async () => {
    try {
      const res = await axios.get("/books/get-all-books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users/get-all-users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/books/book/${id}`);
      fetchBooks();
    } catch (err) {
      console.log(err);
    }
  };

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/books/update-book/${editingBook._id}`, editingBook);
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/books/create-book", newBook);
      setNewBook({
        name: "",
        author: "",
        language: "",
        summary: "",
        image: "",
      });
      fetchBooks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditChange = (e) => {
    setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
  };

  const handleNewBookChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-container">
      <h2>📘 Admin Dashboard</h2>

      {/* Add Book Section */}
      <section className="admin-section">
        <h3>Add New Book</h3>
        <form onSubmit={addBook} className="admin-form">
          <input
            name="name"
            placeholder="Book Name"
            value={newBook.name}
            onChange={handleNewBookChange}
            required
          />
          <input
            name="author"
            placeholder="Author"
            value={newBook.author}
            onChange={handleNewBookChange}
            required
          />
          <input
            name="language"
            placeholder="Language"
            value={newBook.language}
            onChange={handleNewBookChange}
            required
          />
          <textarea
            name="summary"
            placeholder="Summary"
            value={newBook.summary}
            onChange={handleNewBookChange}
            required
          />
          <input
            name="image"
            placeholder="Image URL"
            value={newBook.image}
            onChange={handleNewBookChange}
          />
          <button type="submit">Add Book</button>
        </form>
      </section>

      {/* Edit Book Section */}
      {editingBook && (
        <section className="admin-section">
          <h3>Edit Book</h3>
          <form onSubmit={updateBook} className="admin-form">
            <input
              name="name"
              value={editingBook.name}
              onChange={handleEditChange}
            />
            <input
              name="author"
              value={editingBook.author}
              onChange={handleEditChange}
            />
            <input
              name="language"
              value={editingBook.language}
              onChange={handleEditChange}
            />
            <textarea
              name="summary"
              value={editingBook.summary}
              onChange={handleEditChange}
            />
            <input
              name="image"
              placeholder="Image URL"
              value={editingBook.image}
              onChange={handleEditChange}
            />
            <button type="submit">Update Book</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditingBook(null)}
            >
              Cancel
            </button>
          </form>
        </section>
      )}

      {/* All Books Section */}
      <section className="admin-section">
        <h3>All Books</h3>
        <div className="admin-grid">
          {books.map((book) => (
            <div key={book._id} className="admin-card">
              {book.image && (
                <img
                  src={book.image}
                  alt={book.name}
                  className="book-thumbnail"
                />
              )}
              <h4>{book.name}</h4>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Language:</strong> {book.language}
              </p>
              <p>
                <strong>Summary:</strong> {book.summary}
              </p>
              <div className="admin-actions">
                <button onClick={() => setEditingBook(book)}>Edit</button>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Users Section */}
      <section className="admin-section">
        <h3>All Users</h3>
        <div className="admin-grid">
          {users.map((u) => (
            <div key={u._id} className="admin-card user-card">
              <p>
                <strong>Name:</strong> {u.name}
              </p>
              <p>
                <strong>Email:</strong> {u.email}
              </p>
              <p>
                <strong>Phone:</strong> {u.phone}
              </p>
              <p>
                <strong>Role:</strong> {u.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
