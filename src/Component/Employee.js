import React, { useEffect, useState } from "react";
import Service from "./Service";
import Swal from "sweetalert2";
import Table from "./Table";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

function Employee() {
  const navigate = useNavigate();
  const location = useLocation();
  const id=location.state?.id


 //const companyId = new URLSearchParams(location.search).get('companyId');
  const [form, SetForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    salary: "",
    companyId: id || "",
  });
  const [FormError, SetFormError] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    salary: "",
  });
  const [data, setdata] = useState([]);

  const getLoggedInUserData = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : {};
  };

  const changeHandler = (e) => {
    SetForm({ ...form, [e.target.name]: e.target.value });
    SetFormError({ ...FormError, [e.target.name]: "" });
  };

  function ressetForm() {
    SetForm({
      name: "",
      address: "",
      email: "",
      phone: "",
      salary: "",
      companyId: null,
    });
  }


  useEffect(() => {
     getAll(id);
    //  getAllEmplyee();
  }, [id]);

  // async function getAllEmplyee() {
  //    try {
  //     debugger
  //     const result = await Service.getAll();
  //      setdata(result.data);
  //      console.log(result.data);
  //    } catch (error) {
  //      console.error("Error fetching data:", error);
  //   }
  //  }

  async function getAll(id) {
    debugger
    try {
      const result = await Service.GetEmployeesByCompanyId(id);
      setdata(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  const backto = () => {
    navigate("/app/company");
  };

  const saveClick = async () => {
    try {
      debugger
      const formData = new FormData();
      // Append fields to the FormData object
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("salary", form.salary);
      formData.append("companyId", form.companyId);
  
      await Service.create(formData);
      await getAll(id); // Fetch and set the updated data
      ressetForm();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Employee added successfully!",
      });
    } catch (error) {
      console.error("Unable to submit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to add employee!",
      });
    }
  };
  
  // const updateClick = async (id) => {
  //  debugger
  //   try {
  //     const formData = new FormData();
  //     // Append fields to the FormData object
  //     formData.append("name", form.name);
  //     formData.append("email", form.email);
  //     formData.append("phone", form.phone);
  //     formData.append("address", form.address);
  //     formData.append("salary", form.salary);
  //     formData.append("companyId", form.companyId);
  //     const updatedData = await Service.GetEmployeesByCompanyId(id); // Fetch updated data
  //     setdata(updatedData.data); // Update local state with new data
  //     ressetForm();
  //     Swal.fire({
  //       icon: "success",
  //       title: "Success",
  //       text: "Employee updated successfully!",
  //     });
  //   } catch (error) {
  //     console.error("Unable to submit data:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Unable to update employee!",
  //     });
  //   }
  // };
  const [companyName, setCompanyName] = useState(""); 
  useEffect(() => {
    // Fetch company data based on the provided id
    async function fetchCompanyData() {
      try {
        const response = await Service.getCompany(id);
        setCompanyName(response.data.name); // Set the company name in the state
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    }

    if (id) {
      fetchCompanyData();
      getAll(id);
    }
  }, [id]);

  return (
    <>
      {/* <Navbar /> */}

      <div className="container mt-4">
        <h2 className="text-primary text-left">Employee List</h2>
        <p className="mb-3">
          <strong>Company ID:</strong> {id} | <strong>Company Name:</strong> {companyName}
        </p>
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-info"
              data-toggle="modal"
              data-target="#newModal"
            >
              Add New Employee
            </button>
            <button className="btn btn-info" onClick={backto}>
              Back To Company
            </button>
          </div>
        </div>
        <br />
        <br />
        <div className="row ">
          <div className="col-md-9">
          <Table data={data} getAll={getAll} companyId={id} />
          </div>
          
        </div>
        {/* New Student Modal */}

        <div className="modal" id="newModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">New Employee</h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="txtName">Name:</label>
                    <input
                      onChange={changeHandler}
                      id="txtName"
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      className="form-control"
                      value={form.name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtAddress">Address:</label>
                    <input
                      onChange={changeHandler}
                      id="txtAddress"
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      className="form-control"
                      value={form.address}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtEmail">Email:</label>
                    <input
                      onChange={changeHandler}
                      id="txtEmail"
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="form-control"
                      value={form.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtPhone">Phone:</label>
                    <input
                      onChange={changeHandler}
                      id="txtPhone"
                      type="tel"
                      name="phone"
                      placeholder="Enter Phone"
                      className="form-control"
                      value={form.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtSalary">Salary:</label>
                    <input
                      onChange={changeHandler}
                      id="txtSalary"
                      type="number"
                      name="salary"
                      placeholder="Enter Salary"
                      className="form-control"
                      value={form.salary}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtCompanyId">Company ID:</label>
                    <input
                    readOnly
                      onChange={changeHandler}
                      id="txtCompanyId"
                      type="text"
                      name="companyId"
                      placeholder="Enter Company ID"
                      className="form-control"
                      value={form.companyId}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveClick}
                  data-dismiss="modal"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="modal" id="editModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">Edit Employee</h5>
                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="txtName">Name:</label>
                    <input
                      onChange={changeHandler}
                      id="txtName"
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      className="form-control"
                      value={form.name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtAddress">Address:</label>
                    <input
                      onChange={changeHandler}
                      id="txtAddress"
                      type="text"
                      name="address"
                      placeholder="Enter Address"
                      className="form-control"
                      value={form.address}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtEmail">Email:</label>
                    <input
                      onChange={changeHandler}
                      id="txtEmail"
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="form-control"
                      value={form.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtPhone">Phone:</label>
                    <input
                      onChange={changeHandler}
                      id="txtPhone"
                      type="tel"
                      name="phone"
                      placeholder="Enter Phone"
                      className="form-control"
                      value={form.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtSalary">Salary:</label>
                    <input
                      onChange={changeHandler}
                      id="txtSalary"
                      type="number"
                      name="salary"
                      placeholder="Enter Salary"
                      className="form-control"
                      value={form.salary}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtCompanyId">Company ID:</label>
                    <input
                    readOnly
                      onChange={changeHandler}
                      id="txtCompanyId"
                      type="text"
                      name="companyId"
                      placeholder="Enter Company ID"
                      className="form-control"
                      value={form.companyId}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updateClick}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div> */}

      </div>
    </>
  );
}

export default Employee;
