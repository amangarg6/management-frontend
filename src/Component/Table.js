import React, { useMemo, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Service from "./Service";
import Employee from "./Employee";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useLocation, useNavigate } from "react-router-dom";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import ApplyButton from "./ApplyButton";

const EditModal = ({ form, isEditFormOpen, changeHandler, closeEditForm }) => {
  console.log(form, "form");
  const [data, setdata] = useState([]);

  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID from location state:", id);
    getAll(id);
   
 }, [id]);

  async function getAll(id) {
    try {
debugger
      const result = await Service.GetEmployeesByCompanyId(id);
      setdata(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const newupdate = async (id) => {
    try {
      if (!form.id) {
        console.error("Invalid form data: Missing id");
        return;
      }
      await Service.update(form);
      window.location.reload(true)
      // Fetch and set the updated data
      const result = await Service.GetEmployeesByCompanyId(id);
      setdata(result.data);
      
      toast.success("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Unable to update employee!");
    }
  };
  

  return (
    <div
      className={`modal ${isEditFormOpen ? "show" : ""}`}
      id="editModal"
      tabIndex="-1"
      role="dialog"
    >
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
                  onClick={newupdate}
                >
                  update
                </button>
                <button className="btn btn-secondary" onClick={closeEditForm}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Table = ({ data }) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const openEditForm = (rowData) => {
    if (rowData) {
      setForm(rowData);
      setIsEditFormOpen(true);
    }
  };
  const changeHandler = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };
  const closeEditForm = () => {
    setIsEditFormOpen(false);
  };

  // const deleteClick = async (id) => {
  //   let ans = window.confirm("Want to delete data?");
  //   if (!ans || !id) return;
  //   try {
  //     await Service.remove(id);
  //     toast.success("Employee deleted successfully!");
  //     window.location.reload(true);
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //     toast.error("Unable to delete employee!");
  //   }
  // };
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Delete Employee",
      text: "Are you sure you want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      dangerMode: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Service.remove(id);
          toast.success("Employee deleted successfully!");
          window.location.reload(true);
        } catch (error) {
          console.error("Error deleting data:", error);
          toast.error("Unable to delete employee!");
        }
      }
    });
  };
  const confirmEdit = (rowData) => {

    Swal.fire({
      title: "Edit Employee",
      text: "Are you sure you want to edit this employee?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        openEditForm(rowData);
      }
    });
  };
  const Designation = (id) => {
    navigate("/app/designation", { state: { id: id } });
  };

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Address", accessor: "address" },
      { Header: "Salary", accessor: "salary" },
      { Header: "Phone", accessor: "phone" },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => (
          <div>
            <button
              className="btn btn-info m-2"
              data-toggle="modal"
              data-target="#editModal"
              onClick={() => confirmEdit(row.original)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => confirmDelete(row.original.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() => Designation(row.original.id)}
            >
              Designation
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
    setGlobalFilter,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <ToastContainer />
      <div>
        <table
          {...getTableProps()}
          className="table table-info table-bordered table-stripped table-active"
          align="center"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                     <td>
              {/* Pass employee data as props to ApplyButton */}
              <ApplyButton companyId={row.original.companyId} employeeId={row.original.id} />
            </td>
                </tr>

              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>

          {/* Dropdown for changing page size */}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15].map((pageSizeOption) => (
              <option key={pageSizeOption} value={pageSizeOption}>
                Show {pageSizeOption}
              </option>
            ))}
          </select>
        </div>
      </div>
      <EditModal
        form={form}
        isEditFormOpen={isEditFormOpen}
        changeHandler={changeHandler}
        closeEditForm={closeEditForm}
      />
    </>
  );
};

export default Table;
