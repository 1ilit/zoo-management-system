import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { Habitat } from "@/models/tables";

export default function AddHabitat() {
  const [formState, setFormState] = useState<Habitat>({
    hid: "",
    name: "",
    type: "",
    capacity: 0,
    description: "",
    size: 0,
  });

  const navigate = useNavigate();

  const addQuery = `add-habitat#insert into habitat (hid, name, type, capacity, description, size)
  values ('${formState.hid}', '${formState.name}', '${formState.type}', ${formState.capacity}, '${formState.description}', ${formState.size});`;

  const handleInsert = () => {
    ipcRenderer.send("query", addQuery);
    ipcRenderer.on("query-add-habitat", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-add-habitat");
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
              <h3 className="ms-2">Habitats / Add</h3>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="hid" className="my-2 fw-bold">
                  hId :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="hid"
                  name="hid"
                  placeholder="hId"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Name" className="my-2 fw-bold">
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
                <label htmlFor="type" className="my-2 fw-bold">
                  Type :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  placeholder="Type"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="capacity" className="my-2 fw-bold">
                  Capacity :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="capacity"
                  name="capacity"
                  placeholder="Capacity"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="size" className="my-2 fw-bold">
                  Size :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="size"
                  name="size"
                  placeholder="size"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="my-2 fw-bold">
                  Description :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  placeholder="description"
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
