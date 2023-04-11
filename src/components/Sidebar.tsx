import React from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="bg-dark border border-muted p-3 h-100 pr-5 m-0">
      <h5 className="px-3 py-2 mb-4 text-white py-3 text-center">ZMS</h5>
      <p className="px-3 py-2"></p>
      <p className="px-3 py-2">
        <Link to="/dashboard" className="fw-bold">
          Dashboard
        </Link>
      </p>
      <p className="px-3 py-2">
        <Link to="/animals" className="fw-bold">
          Animals
        </Link>
      </p>
      <p className="px-3 py-2">
        <Link to="/habitats" className="fw-bold">
          Habitats
        </Link>
      </p>
      <p className="px-3 py-2">
        <Link to="/staff" className="fw-bold">
          Staff
        </Link>
      </p>
      <p className="px-3 py-2">
        <Link to="/events" className="fw-bold">
          Events
        </Link>
      </p>
      <p className="px-3 py-2">
        <Link to="/tickets" className="fw-bold">
          Tickets
        </Link>
      </p>
      <p className="px-3 py-2">
        <Link to="/" className="fw-bold">
          <i className="fa-solid fa-arrow-left me-1"></i>
          Entry page
        </Link>
      </p>
    </div>
  );
}
