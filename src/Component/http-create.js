import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:44392/api/",
    headers: {
      "Content-type": "application/json"
    }
  });

//   import axios from "axios";
// let userData = {
//   "token": ""
// };
// userData = localStorage.getItem('userData');
// export default axios.create({
//     baseURL: "https://localhost:44392/api/",
//     headers: {
//       "Content-type": "application/json",
//       "Authorization": "Bearer" + userData
//     }
//   });