import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { Animal } from "@/models/tables";

export default function EditAnimal() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<Animal>({
    aid: "",
    date_of_birth: new Date("1990-07-15"),
    name: "",
    weight: 0,
    specie: "",
    habitat: "",
  });
  const [formState, setFormState] = useState<Animal>(animal);

  const navigate = useNavigate();
  const query = `get-animal#select * from animal where animal.aid='${id}'`;
  const updateQuery = `update-animal#update animal
  set aid='${formState.aid}', date_of_birth='${new Date(formState.date_of_birth)
    .toISOString()
    .slice(0, 10)}', name = '${formState.name}', specie='${
    formState.specie
  }', habitat='${formState.habitat}', weight=${formState.weight}
  where aid='${id}';`;

  const handleSelect = () => {
    ipcRenderer.send("query", query);
    ipcRenderer.on("query-get-animal", (event, results) => {
      setAnimal(results[0]);
      setFormState(results[0]);
      return () => {
        ipcRenderer.removeAllListeners("query-get-animal");
      };
    });
  };

  const handleUpdate = () => {
    ipcRenderer.send("query", updateQuery);
    ipcRenderer.on("query-update-animal", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-update-animal");
      };
    });
  };

  useEffect(() => handleSelect, []);

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
    handleUpdate();
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
              <h3 className="ms-2">{`Animals / ${animal?.name} / Edit`}</h3>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="ssn" className="my-2 fw-bold">
                  aId :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="aid"
                  name="aid"
                  placeholder={`${animal.aid}`}
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
                  placeholder={`${animal.name}`}
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
                  placeholder={`${animal.specie}`}
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
                  placeholder={`${animal.weight}`}
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
                  placeholder={`${animal.habitat}`}
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
