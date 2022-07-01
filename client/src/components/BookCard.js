import React from 'react';
import {default as Rating} from "react-rating-stars-component";
import "./BookCard.css";

function BookCard({ book }) {
  return (
    <div className='book-card'>
      <div 
        className='book-cover' 
        style={{ backgroundImage: `url("/book-cover.jpeg")` }}
      >
      </div>
      <div className="details p-2">
        <div className="rating">
          <Rating
            count={5}
            size={18}
            edit={false}
            value={+book.average_rating}
            activeColor="#ffd700"
          />
        </div>
        <h1 className='book-title'>{book.title}</h1>
        <p className='book-author'>{book.author}</p>
        <p className='book-description'>
          {book.description}
        </p>
        <p className='book-genre'>
          {book.genre}
        </p>
      </div>
    </div>
  )
}

export default BookCard
