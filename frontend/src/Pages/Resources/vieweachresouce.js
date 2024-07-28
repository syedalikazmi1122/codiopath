import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sendRequest from "../../Apicalls/SendData";
import Popup from "./../../Components/DisplayComponents/Popup"; // Import the Popup component
import "./../../App.css";

export default function Vieweachresource() {
  const imageURL = "/images/personworking.jpg";
  const [responses, setResponses] = useState({});
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const [review, setReview] = useState({
    reviewText: "",
    rating: 0,
    reviewerEmail: "",
  });
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [popupType, setPopupType] = useState(""); // State for popup type (success/error)
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest("GET", `/resources/${id}`);
        setResponses(response); // Set the fetched resource data into state
        setReviews(response.Reviews || []); // Set reviews from the response
      } catch (error) {
        console.error("Failed to fetch resource data:", error);
      }
    };

    fetchData();
  }, [id]); // Dependency on id to fetch new data if id changes

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (value) => {
    setReview((prevState) => ({
      ...prevState,
      rating: value,
    }));
  };

  const submitReview = async () => {
    try {
      console.log("Submitting review:", review);
      const response = await sendRequest(
        "PUT",
        `/postreviewresources/${id}`,
        review
      );
      if (response.message === "Review added successfully") {
        setPopupMessage("Review posted successfully!");
        setPopupType("success");

        // Automatically close the popup after 1 second
        setTimeout(closePopup, 1000);

        // Refetch the reviews after posting to ensure the latest data
        const updatedResponse = await sendRequest("GET", `/resources/${id}`);
        setReviews(updatedResponse.Reviews || []);
        setReview({ reviewText: "", rating: 0, reviewerEmail: "" }); // Reset review form
      } else {
        setPopupMessage("Failed to post review.");
        setPopupType("error");
        setTimeout(closePopup, 1000); // Automatically close the popup after 1 second
      }
    } catch (error) {
      setPopupMessage("Failed to submit review.");
      setPopupType("error");
      setTimeout(closePopup, 1000); // Automatically close the popup after 1 second
      console.error("Failed to submit review:", error.message);
      console.log("Error response data:", error.response?.data);
    }
  };

  // Close the popup
  const closePopup = () => {
    setPopupMessage(""); // Clear the popup message
    setPopupType(""); // Clear the popup type
  };

  const SettingStarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex space-x-0.5">
        {[...Array(5)].map((_, index) => {
          index += 1;
          return (
            <button
              key={index}
              className={`sm:h-10 h-5 w-5 sm:w-10 ${
                index <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => onRatingChange(index)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-4">
        {/* <p className="text-gray-300 text-xs sm:text-sm">Rating</p> */}
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`sm:w-4 w-3 h-3 sm:h-4 ${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .288l2.833 8.718h9.167l-7.417 5.39 2.833 8.718-7.416-5.39-7.417 5.39 2.833-8.718-7.417-5.39h9.167z" />
            </svg>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div
        style={{ backgroundColor: "#29306B", opacity: "0.9" }}
        className="sm:flex w-full p-2"
      >
        <div className="sm:w-1/2 p-2">
          <div>
            <h1 className="text-white text-xl sm:text-3xl font-semibold">
              {responses?.ResourceTitle || "Resource Title"}
            </h1>
            <p className="flex space-x-2 text-xs sm:text-sm text-gray-300 mt-2">
              Posted by{" "}
              <span className="pl-2 font-medium">
                {responses?.Postername || "Unknown"}
              </span>
            </p>
          </div>
          <div className="mt-4">
            <h1 className="text-white text-lg sm:text-xl font-medium">
              Description
            </h1>
            <p className="text-gray-300 text-wrap text-xs sm:text-sm">
              {responses?.ResourceDescription || "Description not available."}
            </p>
          </div>
          <div className="mt-4  space-y-4 sm:space-x-4">
            <button>
              <a
                href={responses?.ResourceLink || "#"}
                className="sm:text-base text-sm text-white bg-blue-900 p-2 rounded-md"
                target="_blank" // Open the link in a new tab
                rel="noopener noreferrer" // Security improvement
              >
                Resource Link
              </a>
            </button>
            <StarRating rating={responses?.ResourceAverageRating} />
          </div>
          <div>
            <span>
              <p className="text-white text-sm mt-4">Type:</p>
              <p className="text-gray-300 text-xs sm:text-sm">
                {responses?.ResourceType || "Unknown"}
              </p>
            </span>
            <span>
              <p className="text-white text-sm mt-4">Category:</p>
              <p className="text-gray-300 text-xs sm:text-sm">
                {responses?.ResourceCategory || "Unknown"}
              </p>
            </span>
          </div>
        </div>
        <img
          src={imageURL} // Use response image if available
          alt="Resource"
          className="sm:block hidden w-1/2 h-96 object-cover"
        />
      </div>
      <div className="w-full mt-4">
        <h2
          className="text-xl  sm:text-2xl font-semibold"
          style={{ color: "#BE5D0E" }}
        >
          Reviews
        </h2>
        <div className="border "></div>
        <div className="grid  mt-4">
          {reviews.map((review, index) => (
            <div className="bg-white  rounded-md p-4 mt-2 w-full" key={index}>
              <h3 className="text-gray-800 text-xs sm:text-sm font-medium">
                {review.reviewerEmail}
              </h3>
              <p
                className="text-gray-600 text-sm sm:text-lg "
                style={{ fontStyle: "italic" }}
              >
                {review.review}
              </p>
              <StarRating rating={review.rating} />
              {/* <div className="border mt-1"></div> */}
            </div>
          ))}
        </div>
        <div className="border mt-3"></div>
        <div className="grid justify-center space-y-2 mt-4">
          <h2
            className="text-xl sm:text-2xl font-semibold"
            style={{ color: "#BE5D0E" }}
          >
            Post a Review
          </h2>
          <input
            type="email"
            onChange={handleReviewChange}
            name="reviewerEmail"
            placeholder="Enter your email"
            className="border p-2 h-10 rounded-md  w-full"
            value={review.reviewerEmail}
          />
          <textarea
            placeholder="Enter your review"
            onChange={handleReviewChange}
            name="reviewText"
            className="border p-2  w-full rounded-md"
            value={review.reviewText}
          />
          {/* <p className="text-gray-300 text-sm">Rate the resource</p> */}
          <div className="ml-2">
          <SettingStarRating
            rating={review.rating}
            onRatingChange={handleRatingChange}
            />
            </div>
          <button
            className="hover:bg-blue-700 text-white font-bold h-9 w-20 py-1 px-4 rounded gradient-button ml-5  sm:ml-7 mt-4"
            type="submit"
            onClick={submitReview} // Added onClick to handle review submission
          >
            Post
          </button>
        </div>
      </div>

      {/* Popup Component for messages */}
      {popupMessage && <Popup message={popupMessage} type={popupType} />}
    </div>
  );
}
