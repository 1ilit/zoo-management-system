import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { Ticket } from "@/models/tables";

export default function AddTicket() {
  const [formState, setFormState] = useState<Ticket>({
    tid: "",
    date_of_issuing: "",
    type: "Regular",
    recep_ssn: "",
    guide_ssn: "",
    price: 0,
  });

  const navigate = useNavigate();

  const addQuery = `add-ticket#insert into ticket (tid, type, date_of_issuing, recep_ssn, guide_ssn, price)
  values ('${formState.tid}', '${formState.type}', '${formState.date_of_issuing}', '${formState.recep_ssn}', '${formState.guide_ssn}', ${formState.price});`;

  const handleInsert = () => {
    ipcRenderer.send("query", addQuery);
    ipcRenderer.on("query-add-ticket", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-add-ticket");
      };
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleInsert();
    navigate("/tickets");
  };

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
              <h3 className="ms-2">Tickets / Add</h3>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="tid" className="my-2 fw-bold">
                  tId :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tid"
                  name="tid"
                  placeholder="tId"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fulltime" className="my-2 fw-bold">
                  Type :
                </label>
                <select
                  className="form-control"
                  name="type"
                  id="fulltime"
                  value={formState.type}
                  onChange={handleInputChange}
                >
                  <option value="Regular">Regular</option>
                  <option value="VIP">VIP</option>
                  <option value="Membership">Membership</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price" className="my-2 fw-bold">
                  Price :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="Price"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="doi" className="my-2 fw-bold">
                  Date of issuing :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="doi"
                  name="date_of_issuing"
                  placeholder="Date of issuing"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recep_ssn" className="my-2 fw-bold">
                  Receptionist SSN :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recep_ssn"
                  name="recep_ssn"
                  placeholder="Receptionist SSN"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="guide_ssn" className="my-2 fw-bold">
                  Guide SSN :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="guide_ssn"
                  name="guide_ssn"
                  placeholder="Guide SSN"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary px-3 my-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
