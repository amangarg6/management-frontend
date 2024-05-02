import axiosInstance from "./Interceptor";
import httpCreate from "./http-create";
import httpLogin from "./http-login";

let url = "https://localhost:44392/api/employee";
let Comapny = "https://localhost:44392/api/company";
let designation = "https://localhost:44392/api/designation";

// const axiosInstance = axios.create({
//   baseURL: 'https://localhost:44392/api/company', // Update with your API base URL
// });

//employee url
const getAll = () => {
  debugger
  return axiosInstance.get(url);
};

const get = (id) => {
  return axiosInstance.get(`https://localhost:44392/api/employee/${id}`);
};

 const GetEmployeesByCompanyId = (id) => {
   return axiosInstance.get(`https://localhost:44392/api/employee/employees?id=${id}`);
 };

const create = async (formData) => {
 
  try {
    const response = await fetch('https://localhost:44392/api/employee', {
      method: 'POST',
      body: formData,  // Use the FormData directly
    });

    if (!response.ok) {
      throw new Error('Unable to add employee!');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Error while calling the create endpoint: ' + error.message);
  }
};

const update = (data) => {
  debugger
  return axiosInstance.put(url, data);
};

const search = (data) => {
  return axiosInstance.get(`https://localhost:44392/api/Apply/${data}`);
};

const remove = (id) => { 
  return axiosInstance.delete(`https://localhost:44392/api/employee/${id}`);
};
//login url
const login = (data) => {

  return httpLogin.post("Login", data);
};


const register = (data) => {
  return httpLogin.post("Register", data);
};
//company url

const getAllEmployeecompany = () => {
  return axiosInstance.get('https://localhost:44392/api/Company/allemployee');
};

const getAllCompany = () => {
  return axiosInstance.get(Comapny);
};

const getCompany = (companyId) => {
  debugger
  return axiosInstance.get(`https://localhost:44392/api/company/${companyId}`);
};

const createCompany = (data) => {
  return axiosInstance.post(Comapny, data);
};

const updateCompany = async (formData) => {
  try {
    const response = await axiosInstance.put(
      "https://localhost:44392/api/company",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const removeCompany = (id) => {
  return axiosInstance.delete(`https://localhost:44392/api/company/${id}`);
};


//Designation url

const getAllDesignation = () => {
  return axiosInstance.get(designation);
};

const GetDesignationByEmployeeId = (id) => {
   return axiosInstance.get(`https://localhost:44392/api/designation/designation?id=${id}`);
 };
 
const createDesignation = (data) => {
  return axiosInstance.post(designation, data);
};

const updateDesignation = (data) => {
  return axiosInstance.put(designation, data);
};
const removeDesignation = (id) => {
  return axiosInstance.delete(`https://localhost:44392/api/designation/${id}`);
};

const Service = {
  getAll,
  get,
  GetEmployeesByCompanyId,
  create,
  update,
  remove,
  login,
  register,
  getAllEmployeecompany,
  getAllCompany,
  getCompany,
  createCompany,
  updateCompany,
  removeCompany,
  getAllDesignation,
  GetDesignationByEmployeeId,
  createDesignation,
  updateDesignation,
  removeDesignation,
  search
};

export default Service;
