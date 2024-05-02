import React, { useEffect, useState } from "react";
import Service from "./Service";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

function Designation() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.id;
  const [form, SetForm] = useState({
    name: "",
    employeeId: id || "",
  });
  const [FormError, SetFormError] = useState({
    name: "",
  });
  const [Designation, setDesignation] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function resetFrom() {
    SetForm({
      name: "",
      employeeId: null,
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

    SetFormError(errors);
    return isValid;
  };

  useEffect(() => {
    getAll(id);
  }, [id]);

  // async function getAll() {
  //   try {
  //     const result = await Service.getAllDesignation();
  //     setDesignation(result.data);
  //     console.log(result.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  
  async function getAll(id) {
    debugger
    try {
      const result = await Service.GetDesignationByEmployeeId(id);
      setDesignation(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
 
  const backto = () => {
    navigate("/app/home");
  };

  function renderDesignation() {
    return Designation?.map((item) => {
      return (
        <tr>
          <td>{item.name}</td>
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
          </td>
        </tr>
      );
    });
  }

  const saveClick = async () => {
    try {
      if (validateForm()) {
        const requestData = {
          name: form.name,
          employeeId: form.employeeId,
        };
  
        await Service.createDesignation(requestData);
        await getAll(id); // Update the state with the new data
        resetFrom();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Designation added successfully!",
        });
      }
    } catch (error) {
      console.error("Unable to submit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to add Designation!",
      });
    }
  };
  

  
  const updateClick = async () => {
    try {
        if (validateForm()) {
          await Service.updateDesignation(form);
          await getAll(id); // Update the state with the new data
          resetFrom();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Designation updated successfully!",
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Unable to submit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to update Designation!",
      });
    }
  };

  const deleteClick = async (id) => {
    debugger;
    Swal.fire({
      title: "Delete Designation",
      text: "Are you sure you want to delete this Designation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      dangerMode: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Service.removeDesignation(id);
          await getAll();
          Swal.fire({
            title: "Success",
            text: "Designation deleted successfully!",
            icon: "success",
          });
          //window.location.reload(true);
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire({
            title: "Error",
            text: "Unable to delete Designation!",
            icon: "error",
          });
        }
      }
    });
  };
  const [employeeInfo, setEmployeeInfo] = useState({
    id: "",
    name: "",
    companyId: "",
    companyName: "",
  });

  useEffect(() => {
    getEmployeeInfo(id);
  }, [id]);

  const getEmployeeInfo = async (employeeId) => {
    try {
      const employeeData = await Service.getEmployeeById(employeeId);
      const companyData = await Service.getCompanyById(employeeData.companyId);

      setEmployeeInfo({
        id: employeeData.id,
        name: employeeData.name,
        companyId: companyData.id,
        companyName: companyData.name,
      });
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  return (
      <div className="container mt-4 text-center">
      <h2 className="text-primary">Designation List</h2>
      <p>Employee ID: {id}</p>
      <div className="row">
        <div className="col-md-4">
          <button
            className="btn btn-info text-left"
            data-toggle="modal"
            data-target="#newModal"
          >
            Add New Designation
          </button>
        </div>
        <div className="col-md-6 text-right">
          <button className="btn btn-info" onClick={backto}>
            Back To Home
          </button>
        </div>
      </div>
        <br /> <br />
        <div className="row">
          <div className="col-md-8 mx-auto">
            <table className="table table-bordered table-striped table-active">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderDesignation()}</tbody>
            </table>
          </div>
        </div>
      {/* Add Designation */}
   
      <div className="modal" id="newModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">New Designation</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"           
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
                <div className="form-group text-left">
                    <label htmlFor="txtEmployeeId">Employee ID:</label>
                    <input
                    readOnly
                      onChange={changeHandler}
                      id="txtEmployeeId"
                      type="text"
                      name="employeeId"
                      placeholder="Enter Company ID"
                      className="form-control"
                      value={form.employeeId}
                    />
                  </div>
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
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
      {/* Edit Designation */}
  
     <div className="modal" id="editModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Edit Designation</h5>
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
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                onClick={updateClick}
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

export default Designation;
