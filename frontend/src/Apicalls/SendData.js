import axios from "axios";

async function sendRequest(method, url, body = null) {
  try {
    // Ensure correct HTTP method and URL are passed
    const response = await axios({
      method: method.toLowerCase(), // axios methods are case-sensitive
      url: `http://localhost:5000${url}`, // Correct base URL
      headers: {
        "Content-Type": "application/json",
      },
      data: body, // Correctly pass the body
      withCredentials: true, // Ensures cookies are sent
    });

    // Check if the status is not a success
    if (response.status !== 200 && response.status!== 201) {
      throw new Error(response.data.message || "Request failed");
    }

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.log("The error is:", error.response?.data);
    throw new Error(error.response?.data?.message || error.message);
  }
}

export default sendRequest;
