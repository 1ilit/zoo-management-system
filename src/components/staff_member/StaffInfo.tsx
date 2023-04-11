import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { StaffMember } from "@/models/tables";

export default function StaffInfo() {
  const { id } = useParams();
  const [staffMember, setStaffMember] = useState<StaffMember>();
  const navigate = useNavigate();
  const query = `get-staff-member#select * from staff_member where staff_member.ssn='${id}'`;

  const handleSelect = () => {
    ipcRenderer.send("query", query);
    ipcRenderer.on("query-get-staff-member", (event, results) => {
      setStaffMember(results[0]);
      return () => {
        ipcRenderer.removeAllListeners("query-get-staff-member");
      };
    });
  };

  useEffect(() => {
    handleSelect();
  }, []);

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
              <h3 className="ms-2">
                {`Staff / ${staffMember?.first_name} ${staffMember?.last_name}`}{" "}
              </h3>
            </div>
            <hr />
            <div>{staffMember?.first_name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
