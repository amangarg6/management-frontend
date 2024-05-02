import axios from "axios";

const axiosInstance = axios.create({});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  // Modify the request config
  let accessToken = JSON.parse(localStorage.getItem("userData"));
  //console.log("accessToken", accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken.token}`;
  }
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if successful
    return response;
  },
  async (error) => {
    // Check if the error is due to an expired access token
    if (error.response.status === 401) {
      debugger;
      const authData = JSON.parse(localStorage.getItem("userData"));
      const payload = {
        token: authData.token,
        refreshToken: authData.refreshToken,
      };
      let apiResponse = await axios.post(
        "https://localhost:44392/api/user/RefreshToken",
        payload
      );
      authData.token = apiResponse.data.token;
      authData.refreshToken = apiResponse.data.refreshToken;
      localStorage.setItem("userData", JSON.stringify(authData));
      error.config.headers[
        "Authorization"
      ] = `bearer ${apiResponse.data.token}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
