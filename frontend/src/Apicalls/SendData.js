import axios from "axios";

async function sendRequest(method, url, body = null) {
  try {
    const response = await axios({
      method: method.toLowerCase(),
      url: `https://codiopathbackend.vercel.app${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      withCredentials: false,
    });

    if (response.status < 200 || response.status >= 300) {
      // Handle non-success status codes
      throw new Error(response.data.message || "Request failed");
    }

    return response.data;
  } catch (error) {
    // Log the full error object for better debugging
    console.error("Request error:", error);

    // Handle different error scenarios
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error response data:", error.response.data);
      throw new Error(error.response.data.message || "Server error");
    } else if (error.request) {
      // No response received
      console.error("No response received:", error.request);
      throw new Error("No response received from server");
    } else {
      // Error setting up the request
      console.error("Request setup error:", error.message);
      throw new Error(error.message);
    }
  }
}

export default sendRequest;
