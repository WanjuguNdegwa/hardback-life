import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {default as Rating} from "react-rating-stars-component";

import Review from './Review';
import "./BookDetail.css";

function BookDetail() {
  const apiUrl = "http://localhost:9292";
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const bookId = useParams().bookId;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiUrl}/books/${bookId}`)
      .then(response => response.json())
      .then(data => {
        setBook(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (<div id="loading"></div>) :
      (<div className="book-detail">
        <div>
          <div 
            className="book-cover-holder" 
            style={{ backgroundImage: `url("/book-cover.jpeg")` }}
          ></div>
        </div>
        <div>
          <h1 className='book-title'>{book.title}</h1>
          <p className='book-author'>{book.author}</p>

          <div className="rating">
            <Rating
              count={5}
              size={18}
              edit={false}
              value={+book.average_rating}
              activeColor="#ffd700"
            />
          </div>
          <p>{book.description}</p>
          <p className='book-genre'>
            {book.genre}
          </p>

          <div className="review-form mt-5">
            <form>
              <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a review here" id="floatingTextarea"></textarea>
                <label htmlFor="floatingTextarea">Leave a review here</label>
              </div>
              <button type="submit" className='btn btn-primary my-3'>Submit review</button>
            </form>
          </div>

          <div className="reviews mt-5">
            <h2 className='reviews-title'>Reviews</h2>
            {book.reviews && book.reviews.length > 0 ?
              book.reviews.map((review, index) => (
                <Review 
                  key={index}
                  review={review}
                />
              ))
              :
              "Be the first to review this book"
            }
          </div>
        </div>
      </div>)}
    </>
  )
}

export default BookDetail
