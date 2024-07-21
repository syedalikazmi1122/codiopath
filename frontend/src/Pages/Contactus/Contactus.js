export default function Aboutus() {
  const headerfirstimage = "./images/booksandlaptop.jpg";
  return (
    <>
      <div className="flex w-full p-5 sm:h-screen justify-center items-center">
        <div className="flex space-x-2 border p-4  items-center justify-center">
          <div>
            <img
              src={headerfirstimage}
              alt="headerfirstimage"
              className="w-full h-96 hidden sm:block"
            />
          </div>
          <div className="grid p-4 ">
            <h1 className="text-2xl " style={{ color: "#29306B" }}>
              Contact us
            </h1>
            <form
              action="https://getform.io/f/469c75bd-481a-4bbe-b26c-b98a1ff9ed6b"
              method="POST"
              target="blank"
              className="grid"
            >
              <input
              name="name"
                placeholder="Enter your name"
                className="border p-2 m-2 w-52 "
              />
              <input
                placeholder="Enter your email"
                className="border p-2 m-2 w-52 "
               name="email"
              />
              <textarea
                placeholder="Enter your message"
                className="border p-2 m-2 w-52 "
                name="message"
              />
              <button
                className="border h-9 p-2 text-white  bg-blue-900 rounded-md hover:translate-x-0.5 hover:translate-y-1 duration-300"
                style={{ fontFamily: "" }}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
