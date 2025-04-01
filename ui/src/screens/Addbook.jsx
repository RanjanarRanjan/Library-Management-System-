import React, { useState } from "react";
import Nav from "../components/Nav";
import Adminnav from "../components/Adminnav";

const Addbook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [bookImage, setBookImage] = useState(null);

  const [message, setMessage] = useState("");

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleFileChange = (e) => {
    setBookImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookName || !author || !category || !description) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData(); // Directly using FormData
    formData.append("BookName", bookName);
    formData.append("Author", author);
    formData.append("Category", category);
    formData.append("Description", description);
    if (bookImage) formData.append("bookImage", bookImage);

    try {
      const response = await fetch("/api/addbook", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Book added successfully!");
        setBookName("");
        setAuthor("");
        setCategory("");
        setDescription("");
        setBookImage(null);
      } else {
        setMessage(data.msg || "Failed to add book.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#daf0ef]">
      <Nav />
      <div className="flex">
        <Adminnav />
        <div className="ml-[150px] mt-[90px]">
          <div className="m-[20px_300px] bg-[#03615C] p-6 text-white font-[cursive] text-center rounded-[10px]">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <h1 className="underline text-2xl font-semibold">Add Book</h1>

              {message && <p className="text-yellow-300 my-2">{message}</p>}

              <div className="flex justify-between gap-[100px] my-3">
                <label>Book Name</label>
                <input
                  className="h-[30px] w-[300px] bg-white text-black px-2"
                  type="text"
                  value={bookName}
                  onChange={handleChange(setBookName)}
                />
              </div>

              <div className="flex justify-between gap-[100px] my-3">
                <label>Author</label>
                <input
                  className="h-[30px] w-[300px] bg-white text-black px-2"
                  type="text"
                  value={author}
                  onChange={handleChange(setAuthor)}
                />
              </div>

              <div className="flex justify-between gap-[100px] my-3">
                <label>Category</label>
                <input
                  className="h-[30px] w-[300px] bg-white text-black px-2"
                  type="text"
                  value={category}
                  onChange={handleChange(setCategory)}
                />
              </div>

              <div className="flex justify-between gap-[100px] my-3">
                <label>Description</label>
                <textarea
                  className="h-[60px] w-[300px] bg-white text-black px-2"
                  value={description}
                  onChange={handleChange(setDescription)}
                ></textarea>
              </div>

              <div className="flex justify-between gap-[100px] my-3">
                <label>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-[300px] bg-white text-black"
                />
              </div>

              <div className="flex justify-center gap-5 mt-4">
                <button type="submit" className="w-[100px] bg-[#daf0ef] h-[30px] text-[#03615C] rounded">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBookName("");
                    setAuthor("");
                    setCategory("");
                    setDescription("");
                    setBookImage(null);
                  }}
                  className="w-[100px] bg-[#daf0ef] h-[30px] text-[#03615C] rounded"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addbook;
