import axios from "axios";

const API_URL = "http://localhost:3000";

const sendRequest = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      data,
    });

    return response.data;
  } catch (err) {
    console.error("API request error:", err);
    throw new Error("Failed to make API request");
  }
};

export default sendRequest;
