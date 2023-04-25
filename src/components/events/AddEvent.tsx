import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { Event } from "@/models/tables";

export default function AddEvent() {
  const [formState, setFormState] = useState<Event>({
    name: "",
    date: "",
    location: "",
    event_manager_ssn: "",
  });

  const navigate = useNavigate();

  const addQuery = `add-event#insert into event (name, date, location, event_manager_ssn)
  values ('${formState.name}', '${formState.date}', '${formState.location}', '${formState.event_manager_ssn}');
  `;

  const handleInsert = () => {
    ipcRenderer.send("query", addQuery);
    ipcRenderer.on("query-add-event", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-add-event");
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
    navigate("/events");
    navigate(0);
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
              <h3 className="ms-2">Events / Add</h3>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="my-2 fw-bold">
                  Name :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date" className="my-2 fw-bold">
                  Date :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  name="date"
                  placeholder="Date"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location" className="my-2 fw-bold">
                  Location :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  placeholder="Location"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="event_manger_ssn" className="my-2 fw-bold">
                  Event manager SSN :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="event_manger_ssn"
                  name="event_manager_ssn"
                  placeholder="Event manager SSN"
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
