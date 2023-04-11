import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
const { ipcRenderer } = window.require("electron");
import { StaffMember } from "@/models/tables";

export default function Staff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const searchDisabled = searchString === "";
  const navigate = useNavigate();

  const selectAll = "staff#select * from staff_member;";
  const deleteBy = (table: string, field: string, value: string) => {
    return `delete from ${table} where ${table}.${field}='${value}';`;
  };

  const handleSelect = () => {
    ipcRenderer.send("query", selectAll);
    ipcRenderer.on("query-staff", (event, results) => {
      setStaff(results);
      return () => {
        ipcRenderer.removeAllListeners("query-staff");
      };
    });
  };

  const handleDelete = (ssn: string) => {
    ipcRenderer.send(
      "query",
      `staff-delete#${deleteBy("staff_member", "ssn", ssn)}`
    );
    ipcRenderer.on("query-staff-delete", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-staff-delete");
      };
    });
    handleSelect();
  };

  useEffect(handleSelect, []);

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row m-0 h-100vh">
        <div className="col-md-3 p-0 m-0">
          <Sidebar />
        </div>
        <div className="col-md-9 m-0 p-0">
          <div className="container p-5">
            <div className="d-flex justify-content-between align-items-baseline">
              <h3>Staff</h3>
              <Link to="/staff/add">Add a staff member</Link>
            </div>
            <hr />
            <nav className="my-3">
              <div className="d-flex justify-content-between align-items-baseline">
                <input
                  type="text"
                  className="form-control w-100 me-2"
                  placeholder="Search by last name"
                  onChange={(e) => setSearchString(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  disabled={searchDisabled}
                  onClick={(e) => navigate(`/staff/search/${searchString}`)}
                >
                  Search
                </button>
              </div>
            </nav>
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th>SSN</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th colSpan={3}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s: StaffMember, index: number) => (
                  <tr className="table-bordered align-middle" key={index}>
                    <td scope="row">{s.ssn}</td>
                    <td>{s.first_name}</td>
                    <td>{s.last_name}</td>
                    <td>{s.email}</td>
                    <td>
                      <Link to={`/staff/${s.ssn}`}>View Details</Link>
                    </td>
                    <td>
                      <Link to={`/staff/edit/${s.ssn}`} className="ms-2">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(s.ssn)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
