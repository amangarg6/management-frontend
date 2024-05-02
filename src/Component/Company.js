import React, { useEffect, useState } from "react";
import Service from "./Service";
import Swal from "sweetalert2";
import {  useLocation, useNavigate } from "react-router-dom";
import ApplyButton from "./ApplyButton";
import Home from "./Home";

function Company() {
  const navigate = useNavigate();
  const [form, SetForm] = useState({
    name: "",
    location: "",
    email: "",
    phonenumber: "",
    city: "",
    description: "",
    image: "",
    imageData: null,
  });
 
  const [FormError, SetFormError] = useState({
    name: "",
    location: "",
    email: "",
    phonenumber: "",
    city: "",
    description: "",
    image: "",
    imageData: "",
    applicationuserId: null,
  });
  const [Company, setcompany] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  function resetFrom() {
    SetForm({
      name: "",
      location: "",
      email: "",
      phonenumber: "",
      city: "",
      description: "",
      image: "",
      imageData: null,
    });
  }
  const changeHandler = (e) => {
    SetForm({ ...form, [e.target.name]: e.target.value });
    SetFormError({ ...FormError, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!form.name) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!form.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!form.description) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!form.location) {
      errors.location = "Location is required";
      isValid = false;
    }

    if (!form.city) {
      errors.city = "City is required";
      isValid = false;
    }

    if (!form.phonenumber) {
      errors.phonenumber = "Phone Number is required";
      isValid = false;
    }

    SetFormError(errors);
    return isValid;
  };


  const location = useLocation();
  const id = location.state?.id;


  const employee = (id) => {
    navigate("/app/employee", { state: { id: id } });
  };
  
  useEffect(() => {
    let userData = localStorage.getItem("userData");
    if (!userData) {
      navigate("/login");
    } else {
      getAll();
    }
  }, []);

  async function getAll() {
    debugger
    try {
      const result = await Service.getAllCompany();
      setcompany(result.data);
      console.log("Company Data:", result.data);
      // console.log("Image URLs:", result.data.map(item => item.image));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleAddImageChange = (event) => {
    const imageFile = event.target.files[0];

    SetForm({ ...form, imageData: imageFile });
  };

  const imagestyleshow = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const createImagePath = (imageName) => {
    return `https://localhost:44392/images/${imageName}`;
  };

  function renderCompany() {
    return Company?.map((item) => {
      const imageUrl = createImagePath(item.image);
      console.log("Image URL:", imageUrl);
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.description}</td>
          <td>{item.location}</td>
          <td>{item.city}</td>
          <td>{item.phonenumber}</td>
     

          <td>
            <img
              src={imageUrl}
              alt="Company Logo"
              style={{
                width: "100%",
              }}
            />
          </td>
          <td>
            <button
              data-toggle="modal"
              data-target="#editModal"
              className="btn btn-info m-2"
              onClick={() => {
                SetForm(item);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteClick(item.id)}
              className="btn btn-danger m-2"
            >
              Delete
            </button>
            <button
              // to={`/app/employee?companyId=${item.id}`}
              onClick={() => employee(item.id)}
              className="btn btn-success"
            >
              Employee
            </button>
          </td>
          {/* <td> <ApplyButton companyId={item.id} companyName={item.name} /></td> */}
          <td><Home companyId={item.id} companyName={item.name}/></td>
        </tr>
      );
    });
  }

  const openAddCompanyModal = () => {
    resetFrom();
    setIsModalOpen(true);
  };

  const saveClick = async () => {
    debugger
    try {
      if (validateForm()) {
        const formData = new FormData();
        formData.append("Name", form.name);
        formData.append("Email", form.email);
        formData.append("Description", form.description);
        formData.append("Location", form.location);
        formData.append("City", form.city);
        formData.append("PhoneNumber", form.phonenumber);
        formData.append("image", form.image);
        formData.append("imageData", form.imageData);

        await Service.createCompany(formData);
        await getAll();
        resetFrom();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Company added successfully!",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Unable to submit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to add company!",
      });
    }
  };

  // const updateClick = async () => {
  //   try {
  //     debugger;
  //     const formData = new FormData();
  //     formData.append("Name", form.name);
  //     formData.append("Email", form.email);
  //     formData.append("Description", form.description);
  //     formData.append("Location", form.location);
  //     formData.append("City", form.city);
  //     formData.append("PhoneNumber", form.phonenumber);
  //     formData.append("image", form.image);
  //     formData.append("imageData", form.imageData);
  //     await Service.updateCompany(formData);
  //     await getAll();
  //     resetFrom();
  //     Swal.fire({
  //       icon: "success",
  //       title: "Success",
  //       text: "Company Edit successfully!",
  //     });
  //   } catch (error) {
  //     console.error("Unable to submit data:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Unable to Edit company!",
  //     });
  //   }
  // };
  const updateClick = async () => {
    try {
      if (validateForm()) {
        const formData = new FormData();
        formData.append("Id", form.id);
        formData.append("Name", form.name);
        formData.append("Email", form.email);
        formData.append("Description", form.description);
        formData.append("Location", form.location);
        formData.append("City", form.city);
        formData.append("PhoneNumber", form.phonenumber);
        if (form.imageData) {
          formData.append("imageData", form.imageData);
        }
        await Service.updateCompany(form);
        await getAll();
        resetFrom();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Company updated successfully!",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Unable to update data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to update company!",
      });
    }
  };

  const deleteClick = async (id) => {
    debugger;
    Swal.fire({
      title: "Delete Company",
      text: "Are you sure you want to delete this Company?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      dangerMode: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Service.removeCompany(id);
          await getAll();
          Swal.fire({
            title: "Success",
            text: "Company deleted successfully!",
            icon: "success",
          });
          //window.location.reload(true);
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire({
            title: "Error",
            text: "Unable to delete Company!",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <div className="container mt-4 text-center">
      <h2 className="text-primary">Company List</h2>
      <div className="col-md-3 ">
        <button
          className="btn btn-info"
          data-toggle="modal"
          data-target="#newModal"
          onClick={openAddCompanyModal}
        >
          Add New Company
        </button>
      </div>
      <br /> <br />
      <div className="row">
        <div className="col-md-12 mx-auto">
          <table className="table table-bordered table-striped table-active">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Description</th>
                <th>Location</th>
                <th>City</th>
                <th>Phonenumber</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderCompany()}</tbody>
          </table>
        </div>
      </div>
      {/* Add company */}
      <div
        className={`modal ${isModalOpen ? "show" : ""}`}
        id="#newModal"
        tabIndex="-1"
        role="dialog"
        style={{ display: isModalOpen ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">New Company</h5>
              <button
                type="button"
                className="close"
                onClick={() => setIsModalOpen(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group text-left">
                  <label htmlFor="txtName">Name:</label>
                  <input
                    onChange={changeHandler}
                    id="txtName"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className={`form-control ${
                      FormError.name ? "is-invalid" : ""
                    }`}
                    value={form.name}
                  />
                  <div className="invalid-feedback">{FormError.name}</div>
                </div>

                <div className="form-group  text-left">
                  <label htmlFor="txtEmail ">Email:</label>
                  <input
                    onChange={changeHandler}
                    id="txtEmail"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className={`form-control ${
                      FormError.email ? "is-invalid" : ""
                    }`}
                    value={form.email}
                  />
                  <div className="invalid-feedback">{FormError.email}</div>
                </div>
                <div className="form-group  text-left">
                  <label htmlFor="txtDescription">Description:</label>
                  <input
                    onChange={changeHandler}
                    id="txtDescription"
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    className={`form-control ${
                      FormError.description ? "is-invalid" : ""
                    }`}
                    value={form.description}
                  />
                  <div className="invalid-feedback">
                    {FormError.description}
                  </div>
                </div>
                <div className="form-group  text-left">
                  <label htmlFor="txtLocation">Location:</label>
                  <input
                    onChange={changeHandler}
                    id="txtLocation"
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    className={`form-control ${
                      FormError.location ? "is-invalid" : ""
                    }`}
                    value={form.location}
                  />
                  <div className="invalid-feedback">{FormError.location}</div>
                </div>
                <div className="form-group  text-left">
                  <label htmlFor="txtCity">City:</label>
                  <input
                    onChange={changeHandler}
                    id="txtCity"
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    className={`form-control ${
                      FormError.city ? "is-invalid" : ""
                    }`}
                    value={form.city}
                  />
                  <div className="invalid-feedback">{FormError.city}</div>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtPhoneNumber">Phone Number:</label>
                  <input
                    onChange={changeHandler}
                    id="txtPhoneNumber"
                    type="tel"
                    name="phonenumber"
                    placeholder="Enter Phone Number"
                    className={`form-control ${
                      FormError.phonenumber ? "is-invalid" : ""
                    }`}
                    value={form.phonenumber}
                  />
                  <div className="invalid-feedback">
                    {FormError.phonenumber}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtimage" className="col-4">
                    Image
                  </label>
                  <div className="col-8">
                    <input
                      onChange={changeHandler}
                      id="txtimage"
                      type="text"
                      name="image"
                      placeholder="image"
                      className="form-control"
                      value={form.image}
                    />
                    <p className="text-danger">{FormError.image}</p>
                  </div>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtimageData"> Image data :</label>
                  <input
                    onChange={handleAddImageChange}
                    type="file"
                    name="imageData"
                  />
                </div>
                {form.imageData && (
                  <div className="form-group row">
                    <label className="col-4">Preview</label>
                    <div className="col-8">
                      <img
                        src={URL.createObjectURL(form.imageData)}
                        alt="Preview"
                        style={imagestyleshow}
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                onClick={saveClick}
                //data-dismiss="modal"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  resetFrom();
                  SetFormError({}); // Clear validation errors
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit */}
      <div className="modal" id="editModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Edit Company</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group text-left">
                  <label htmlFor="txtName">Name:</label>
                  <input
                    onChange={changeHandler}
                    id="txtName"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className={`form-control ${
                      FormError.name ? "is-invalid" : ""
                    }`}
                    value={form.name}
                  />
                  <div className="invalid-feedback">{FormError.name}</div>
                </div>

                <div className="form-group  text-left">
                  <label htmlFor="txtEmail ">Email:</label>
                  <input
                    onChange={changeHandler}
                    id="txtEmail"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className={`form-control ${
                      FormError.email ? "is-invalid" : ""
                    }`}
                    value={form.email}
                  />
                  <div className="invalid-feedback">{FormError.email}</div>
                </div>
                <div className="form-group  text-left">
                  <label htmlFor="txtDescription">Description:</label>
                  <input
                    onChange={changeHandler}
                    id="txtDescription"
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    className={`form-control ${
                      FormError.description ? "is-invalid" : ""
                    }`}
                    value={form.description}
                  />
                  <div className="invalid-feedback">
                    {FormError.description}
                  </div>
                </div>
                <div className="form-group  text-left">
                  <label htmlFor="txtLocation">Location:</label>
                  <input
                    onChange={changeHandler}
                    id="txtLocation"
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    className={`form-control ${
                      FormError.location ? "is-invalid" : ""
                    }`}
                    value={form.location}
                  />
                  <div className="invalid-feedback">{FormError.location}</div>
                </div>
                <div className="form-group  text-left">
                  <label htmlFor="txtCity">City:</label>
                  <input
                    onChange={changeHandler}
                    id="txtCity"
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    className={`form-control ${
                      FormError.city ? "is-invalid" : ""
                    }`}
                    value={form.city}
                  />
                  <div className="invalid-feedback">{FormError.city}</div>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtPhoneNumber">Phone Number:</label>
                  <input
                    onChange={changeHandler}
                    id="txtPhoneNumber"
                    type="tel"
                    name="phonenumber"
                    placeholder="Enter Phone Number"
                    className={`form-control ${
                      FormError.phonenumber ? "is-invalid" : ""
                    }`}
                    value={form.phonenumber}
                  />
                  <div className="invalid-feedback">
                    {FormError.phonenumber}
                  </div>
                </div>
                <div className="form-group row">
                  <label for="txtimage" className="col-4">
                    Image
                  </label>
                  <div className="col-8">
                    <input
                      onChange={changeHandler}
                      id="txtimage"
                      type="text"
                      name="image"
                      placeholder="image"
                      className="form-control"
                      value={form.image}
                    />
                    <p className="text-danger">{FormError.image}</p>
                  </div>
                </div>
                <div className="form-group text-left">
                  <label htmlFor="txtimageData"> Image data :</label>
                  <input
                    onChange={handleAddImageChange}
                    type="file"
                    name="imageData"
                  />
                </div>
                {form.imageData && (
                  <div className="form-group row">
                    <label className="col-4">Preview</label>
                    <div className="col-8">
                      <img
                        src={URL.createObjectURL(form.imageData)}
                        alt="Preview"
                        style={imagestyleshow}
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                onClick={updateClick}
                data-dismiss="modal"
              >
                Edit
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
    </div>
  );
}

export default Company;
