import axios from "axios";

async function sendRequest(url, method, body = null) {
  try {
    const response = await axios({
      method: method,
      url: `http://localhost:5000${url}`, // Ensure the correct base URL
      headers: {
        "Content-Type": "application/json",
      },
      data: body ? JSON.stringify(body) : null,
      withCredentials: true, // Ensure cookies are sent with the request
    });

    if (response.status !== 201) {
      throw new Error(response.data.message || "Request failed");
    }

    return response.data;
  } catch (error) {
    console.log("the error is",error.response?.data);
    throw new Error(error.response?.data?.message || error.message);
  }
}

export default sendRequest;
