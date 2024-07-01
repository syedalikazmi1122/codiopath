import React from "react";

export default function Vieweachresource() {
  const image = "./images/personworking.jpg";
  const [rating, setRating] = React.useState(0); // [1, 2, 3, 4, 5
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };
  const handlesetRatingChange = (value) => {
    setRating(value);
  };
const SettingStarRating = ({ rating, onRatingChange }) => {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            key={index}
            className={
              index <= rating
                ? "sm:h-10 h-5 w-5 sm:w-10 text-yellow-500"
                : "sm:h-10 h-5 w-5 sm:w-10 text-gray-400"
            }
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
        <p className="text-gray-300 text-xs sm:text-sm">Rating</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`sm:w-6 w-3  h-3 sm:h-6 ${
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
  const Reviews = [
    {
      id: 1,
      reviewername: "Ali",
      review: "This is a great resourcesdfsdfsdfsdfsdfsdfsdfsdfkls sdlfskldf sdfkls",
      rating: 5,
    },
    {
      id: 2,
      reviewername: "Ahmed",
      review: "This is a great resource",
      rating: 4,
    },
    {
      id: 3,
      reviewername: "Asad",
      review: "This is a great resource",
      rating: 3,
    },
  ];
  const previousRating = 4; // Example previous rating

  return (
    <>
      <div className="p-4">
        <div
          style={{ backgroundColor: "#29306B", opacity: "0.9" }}
          className=" sm:flex w-full p-2"
        >
          <div className="sm:w-1/2">
            <div>
              <h1 className="text-white  text-xl sm:text-3xl font-semibold">
                Learning Basics of Programming
              </h1>
              <p className="flex space-x-2 text-xs sm:text-sm text-gray-300 mt-2">
                Posted by <span className="pl-2 font-medium">Ali Kazmi</span>
              </p>
            </div>
            {/* Description */}
            <div className="mt-4">
              <h1 className="text-white text-lg sm:text-xl font-medium">
                Description
              </h1>
              <p className="text-gray-300 text-wrap  text-xs sm:text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                nemo, voluptate, quidem, doloremque quod dolores quae quibusdam
                consequatur quia porro tempora. Quisquam, quos. Quisquam
                voluptatem, quidem quae quod dolorum.
              </p>
            </div>
            {/* Link button and rating */}
            <div className="mt-4  sm:flex space-y-4  sm:space-x-4">
              <button>
                <a
                  href="https://www.google.com"
                  className="sm:text-base text-sm text-white bg-blue-900 p-2 rounded-md"
                >
                  Resource Link
                </a>
              </button>
              <StarRating rating={previousRating} />
            </div>
            {/* Type and category */}
            <div>
              <span>
                <p className="text-white text-sm mt-4">Type:</p>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Youtube vedio
                </p>
              </span>
              <span>
                <p className="text-white text-sm mt-4">Category:</p>
                <p className="text-gray-300 text-xs sm:text-sm">C++</p>
              </span>
            </div>
          </div>
          <img src={image} alt="Resource" className=" sm:block hidden w-1/2 h-96 object-cover" />
        </div>
        {/* Reviews posted and Post a review */}
        <div className="sm:flex w-full  mt-4">
          
          <div className="grid sm:w-1/2 justify-center">
          <h2 className="text-xl text-center sm:text-2xl font-medium" style={{ color: "#BE5D0E" }}>
            Reviews
          </h2>
            {/* reviews */}

            {Reviews.map((review) => (
              <div className="bg-white border border-gray-400 rounded-md p-2 mt-2">
                <h3 className="text-gray-300 text-lg font-medium">
                  {review.reviewername}
                </h3>
                <p className="text-gray-300 text-sm">{review.review}</p>
                <StarRating rating={review.rating} />
              </div>
            ))}
          </div>
          <div className="border mt-3"></div>
          {/* post a review */}
          <div className="grid w-1/2 justify-center">
            <h2 className="text-xl sm:text-2xl font-medium" style={{ color: "#BE5D0E" }}>
              Post a Review
            </h2>
            <input
              type="text"
              placeholder="Enter your name"
              className="border p-2 h-10 rounded-md m-2 w-full"
            />
            <textarea
              placeholder="Enter your review"
              className="border p-2 m-2 w-full rounded-md"
            />
            {/* rate the resource */}
            <p className="text-gray-300 text-sm">Rate the resource</p>
            <SettingStarRating
              rating={rating}
              onRatingChange={handlesetRatingChange}
            />

            {/* <StarRating rating={rating} /> */}
            <button
              className="bg-blue-500 ml-5 hover:bg-blue-700 text-white font-bold h-9 w-20 py-1 px-4 rounded"
              type="submit"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
