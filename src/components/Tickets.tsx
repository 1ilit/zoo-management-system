import React from "react";
import Sidebar from "./Sidebar";

export default function Tickets() {
  return (
    <div className="container-fluid p-0 m-0">
      <div className="row m-0 h-100vh">
        <div className="col-md-3 p-0 m-0">
          <Sidebar />
        </div>
        <div className="col-md-9 m-0 p-0">
          <div className="container p-5">
            <h3>Tickets</h3>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
