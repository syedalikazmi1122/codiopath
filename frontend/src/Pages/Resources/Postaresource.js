import react from "react";
const categories = [
  "C++",
  "Python",
  "C",
  "Java",
  "Java script",
  "Ruby",
  "Rust",
  "Go",
  "Kotlin",
  "Swift",
  "Dart",
  "PHP",
  "R",
  "Perl",
  "Scala",
  "Haskell",
  "Lua",
  "TypeScript",
  "Shell",
  "PowerShell",
  "Assembly",
  "Objective-C",
  "Visual Basic",
  "SQL",
  "Groovy",
  "HTML",
  "CSS",
  "R",
  "Matlab",
  "Julia",
  "COBOL",
  "Fortran",
  "Ada",
  "Lisp",
  "Prolog",
  "Scheme",
  "Smalltalk",
  "Erlang",
  "F#",
  "Clojure",
  "Elixir",
  "Racket",
  "Kotlin",
  "Dart",
  "Swift",
  "Go",
  "Rust",
  "Scala",
  "Haskell",
  "Lua",
  "TypeScript",
  "Shell",
  "PowerShell",
  "Assembly",
  "Objective-C",
];

export default function Postaresource() {
  return (
    <>
      <div
        className="flex w-full justify-center p-4"
        style={{ backgroundColor: "#29306B" }}
      >
        <h1 className="text-white text-2xl">Post a Resource</h1>
      </div>
      <div>
        <div className="grid justify-center">
          {/* Title and category */}
          <div className="grid sm:flex  space-x-2">
            <input
              type="text"
              placeholder="Enter Resource Title"
              className="border p-2 m-2 w-full sm:w-2/3"
            />
            <select className="border p-1 mt-2 text-gray-400 w-full sm:w-2/3">
              <option value="text-sm" disabled selected>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* URL */}

          <input
            type="text"
            placeholder="Enter Resource URL"
            className="border p-2 m-2 w-full"
          />

          {/* Name and email  */}
          <div className="grid sm:flex  space-x-2">
            <input
              type="text"
              placeholder="Enter your name"
              className="border p-2 m-2 w-full sm:w-2/3"
            />
            <input
              type="text"
              placeholder="Enter your email"
              className="border p-2 m-2 w-full sm:w-2/3"
            />
          </div>
          <div>
            <textarea
              placeholder="Enter Resource Description"
              className="border p-2 m-2 w-full"
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
