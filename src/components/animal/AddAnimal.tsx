import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { Animal } from "@/models/tables";

export default function AddAnimal() {
  const [formState, setFormState] = useState<Animal>({
    aid: "",
    date_of_birth: new Date("1990-07-15"),
    name: "",
    weight: 0,
    specie: "",
    habitat: "",
  });

  const navigate = useNavigate();

  const addQuery = `add-animal#insert into animal (aid, name, specie, date_of_birth, weight, habitat)
  VALUES ('${formState.aid}', '${formState.name}', '${formState.specie}', '${formState.date_of_birth}', ${formState.weight}, '${formState.habitat}');`;

  const handleInsert = () => {
    ipcRenderer.send("query", addQuery);
    ipcRenderer.on("query-add-animal", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-add-animal");
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
    navigate("/animals");
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
              <h3 className="ms-2">{`Animals / Add`}</h3>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="aid" className="my-2 fw-bold">
                  aId :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="aid"
                  name="aid"
                  placeholder="aId"
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
                <label htmlFor="dob" className="my-2 fw-bold">
                  Date of birth :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dob"
                  name="date_of_birth"
                  placeholder="Date of birth"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="specie" className="my-2 fw-bold">
                  Specie :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="specie"
                  name="specie"
                  placeholder="Specie"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight" className="my-2 fw-bold">
                  Weight :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weight"
                  placeholder="Weight"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="habitat" className="my-2 fw-bold">
                  Habitat :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="habitat"
                  name="habitat"
                  placeholder="Habitat"
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
