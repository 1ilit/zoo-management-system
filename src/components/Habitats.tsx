import React from "react";
import Sidebar from "./Sidebar";

export default function Habitats() {
  return (
    <div className="container-fluid p-0 m-0">
      <div className="row m-0 h-100vh">
        <div className="col-md-3 p-0 m-0">
          <Sidebar />
        </div>
        <div className="col-md-9 m-0 p-0">
          <div className="container p-5">
            <h3>Habitats</h3>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
