import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { toast } from 'react-toastify';

function AddBook() {
  const apiUrl = "http://localhost:9292";

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  let navigate = useNavigate();

  const uploadImage = async () => {
    if (imageUpload === null) {
      return;
    }
    const imageRef = ref(storage, `images/${uuid() + imageUpload.name}`);

    const snapshot = await uploadBytes(imageRef, imageUpload, {
      contentType: imageUpload.type
    });
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = await uploadImage();
    const response = await fetch(`${apiUrl}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        author,
        genre,
        description,
        imageURL: url,
      }),
    });
    console.log(response.ok);
    if(response.ok) {
      toast.success('🦄 Book created successfully', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const data = await response.json();
      navigate(`/books/${data.id}`);
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column">
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <label htmlFor="title">Book Title</label>
        </div>
        <div className="form-floating  mb-3">
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <label htmlFor="author">Author</label>
        </div>
        <div className="form-floating  mb-3">
          <input
            type="text"
            className="form-control"
            id="genre"
            placeholder="genre"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          />
          <label htmlFor="genre">Genre</label>
        </div>
        <div className="form-floating  mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <label htmlFor="description">Description</label>
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Book cover
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBook;
