import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
const { ipcRenderer } = window.require("electron");
import { StaffMember } from "@/models/tables";

export default function Staff() {
  const { q } = useParams();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const selectAll = `search#select * from staff_member where staff_member.last_name='${q}';`;
  const navigate = useNavigate();

  const handleSelect = () => {
    ipcRenderer.send("query", selectAll);
    ipcRenderer.on("query-search", (event, results) => {
      setStaff(results);
      return () => {
        ipcRenderer.removeAllListeners("query-search");
      };
    });
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
            <div className="d-flex justify-content-start align-items-baseline">
              <button onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left me-1"></i>
              </button>
              <h3 className="ms-2">{`Staff / Search for : ${q}`} </h3>
            </div>
            <hr />

            {staff.length === 0 ? (
              <h6 className="w-100">
                No records were found by the last name {`${q}`}
              </h6>
            ) : (
              <>
              <h6 className="w-100 my-3">
                Found {`${staff.length}`} records.
              </h6>
                <table className="table table-bordered">
                  <thead className="text-center">
                    <tr>
                      <th>SSN</th>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Email</th>
                      <th>Phone number</th>
                      <th colSpan={1}>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((s: StaffMember, index: number) => (
                      <tr className="table-bordered align-middle" key={index}>
                        <td scope="row">{s.ssn}</td>
                        <td>{s.first_name}</td>
                        <td>{s.last_name}</td>
                        <td>{s.email}</td>
                        <td>{s.phone_number}</td>
                        <td>
                          <Link to={`/staff/${s.ssn}`}>View Details</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
