import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';
import Header from './components/Header';

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
        </Routes>
      </div>
    </div>
  );
}
