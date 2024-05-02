import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:44392/api/user/",
    headers: {
      "Content-type": "application/json"
    }
  });