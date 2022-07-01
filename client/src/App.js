import { useState, useEffect } from 'react';

import BooksList from './components/BooksList';
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
        <BooksList books={books} isLoading={isLoading}/>
      </div>
    </div>
  );
}
