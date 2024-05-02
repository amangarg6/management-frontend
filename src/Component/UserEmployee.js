import React, { useEffect, useState } from "react";
import Service from "./Service";
import Swal from "sweetalert2";

function UserEmployee() {
  const [form, SetForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    salary: "",
    companyId: 0,
  });
  const [FormError, SetFormError] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    salary: "",
  });
  const [data, setdata] = useState([]);

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
      companyId: 0,
    });
  }
  useEffect(() => {
    getAllEmplyee();
  }, []);

  async function getAllEmplyee() {
    try {
        debugger
      debugger;
      const result = await Service.getAll();
      setdata(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  function renderemployee() {
    return data?.map((item) => {
      return (
        <tr>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.salary}</td>
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
          </td>
        </tr>
      );
    });
  }
  const updateClick = async () => {
    try {   
        debugger
          await Service.update(form);
          await getAllEmplyee(); // Update the state with the new data
          ressetForm();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Designation updated successfully!",
        });    
    } catch (error) {
      console.error("Unable to submit data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to update Designation!",
      });
    }
  };

  return (
    <div className="container mt-4 text-center">
      <h2 className="text-primary">Employee Data</h2>
      <br /> <br />
      <div className="row">
        <div className="col-md-12 mx-auto">
          <table className="table table-bordered table-striped table-active">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderemployee()}</tbody>
          </table>
        </div>
      </div>
      {/* edit */}
      <div className="modal" id="editModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-info">
              <h5 className="modal-title">Edit Employee</h5>
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label htmlFor="txtName" className="col-4">
                    Name
                  </label>
                  <div className="col-8">
                    <input
                      onChange={changeHandler}
                      id="txtName"
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-control"
                      value={form.name}
                      //value={form.name}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="txtAddress" className="col-4">
                    Address
                  </label>
                  <div className="col-8">
                    <input
                      onChange={changeHandler}
                      id="txtAddress"
                      type="text"
                      name="address"
                      placeholder="Address"
                      className="form-control"
                      value={form.address}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="txtEmail" className="col-4">
                    Email
                  </label>
                  <div className="col-8">
                    <input
                      onChange={changeHandler}
                      id="txtEmail"
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      value={form.email}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="txtPhone" className="col-4">
                    Phone
                  </label>
                  <div className="col-8">
                    <input
                      onChange={changeHandler}
                      id="txtPhone"
                      type="number"
                      name="phone"
                      placeholder="Phone"
                      className="form-control"
                      value={form.phone}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="txtSalary" className="col-4">
                    Salary
                  </label>
                  <div className="col-8">
                    <input
                      onChange={changeHandler}
                      id="txtSalary"
                      type="number"
                      name="salary"
                      placeholder="Salary"
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
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-info"
                    onClick={updateClick}
                  >
                    update
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEmployee;
