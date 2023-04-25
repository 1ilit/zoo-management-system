import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { Habitat } from "@/models/tables";

export default function EditHabitat() {
  const { id } = useParams();
  const [habitat, setHabitat] = useState<Habitat>({
    hid: "",
    name: "",
    capacity: 0,
    type: "",
    size: 0,
    description: "",
  });
  const [formState, setFormState] = useState<Habitat>(habitat);

  const navigate = useNavigate();
  const query = `get-habitat#select * from habitat where habitat.hid='${id}'`;
  const updateQuery = `update-habitat#update habitat 
                                    set name = '${formState.name}', capacity = ${formState.capacity}, type = '${formState.type}', size = ${formState.size}, description = '${formState.description}' 
                                    where hid ='${id}';`;

  const handleSelect = () => {
    ipcRenderer.send("query", query);
    ipcRenderer.on("query-get-habitat", (event, results) => {
      setHabitat(results[0]);
      setFormState(results[0]);
      return () => {
        ipcRenderer.removeAllListeners("query-get-habitat");
      };
    });
  };

  const handleUpdate = () => {
    ipcRenderer.send("query", updateQuery);
    ipcRenderer.on("query-update-habitat", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-update-habitat");
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
    navigate("/habitats");
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
              <h3 className="ms-2">{`Habitats / ${habitat?.name} / Edit`}</h3>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Name" className="my-2 fw-bold">
                  Name :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder={`${habitat.name}`}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="specie" className="my-2 fw-bold">
                  Capacity :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="specie"
                  name="specie"
                  placeholder={`${habitat.capacity}`}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight" className="my-2 fw-bold">
                  Type :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  name="weight"
                  placeholder={`${habitat.type}`}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="habitat" className="my-2 fw-bold">
                  Size :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="habitat"
                  name="habitat"
                  placeholder={`${habitat.size}`}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="habitat" className="my-2 fw-bold">
                  Description :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="habitat"
                  name="habitat"
                  placeholder={`${habitat.description}`}
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
