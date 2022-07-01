import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';
import Header from './components/Header';
import AddBook from './components/AddBook';

function App() {
  const apiUrl = "http://localhost:9292";
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiUrl}/books`)
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<BooksList books={books} isLoading={isLoading} />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      </div>
    </div>
  );
}
