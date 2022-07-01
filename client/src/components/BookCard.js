import React from 'react';
import {default as Rating} from "react-rating-stars-component";
import "./BookCard.css";

function BookCard() {
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
            value={3.2}
            activeColor="#ffd700"
          />
        </div>
        <h1 className='book-title'>To Kill a Mocking Bird</h1>
        <p className='book-author'>Harper Lee</p>
        <p className='book-description'>
          To Kill a Mocking Bird is a novel by Harper Lee published in 1960. It was considered a success in the United States and is considered one of America's best-loved novels.
        </p>
        <p className='book-genre'>
          Fiction
        </p>
      </div>
    </div>
  )
}

export default BookCard
