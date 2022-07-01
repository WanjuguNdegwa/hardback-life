import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { default as Rating } from "react-rating-stars-component";
import { toast } from 'react-toastify';


import Review from "./Review";
import "./BookDetail.css";

function BookDetail() {
  const apiUrl = "http://localhost:9292";
  const [book, setBook] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bookId = useParams().bookId;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiUrl}/books/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setReviews(data.reviews);
        setIsLoading(false);
      });
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/books/${bookId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        comment,
      }),
    });

    if(response.ok) {
      toast.success('🦄 Comment added successfully', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const data = await response.json();
      setReviews([...reviews, data]);
    }
  };

  return (
    <>
      {isLoading ? (
        <div id="loading"></div>
      ) : (
        <div className="book-detail">
          <div>
            <div
              className="book-cover-holder"
              style={{ backgroundImage: `url("${book.image_url}")` }}
            ></div>
          </div>
          <div>
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">{book.author}</p>

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
            <p className="book-genre">{book.genre}</p>

            <div className="review-form mt-5">
              <form onSubmit={handleReviewSubmit}>
                <Rating
                  count={5}
                  size={18}
                  onChange={(value) => setRating(value)}
                  activeColor="#ffd700"
                />
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a review here"
                    id="floatingTextarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Leave a review here</label>
                </div>
                <button type="submit" className="btn btn-primary my-3">
                  Submit review
                </button>
              </form>
            </div>

            <div className="reviews mt-5">
              <h2 className="reviews-title">Reviews</h2>
              {reviews && reviews.length > 0
                ? reviews.map((review, index) => (
                    <Review key={index} review={review} />
                  ))
                : "Be the first to review this book"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookDetail;
