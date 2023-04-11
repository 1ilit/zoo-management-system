import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
const { ipcRenderer } = window.require("electron");
import { Animal } from "@/models/tables";

export default function Animals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const selectAllQuery = "animal#select * from animal;";
  const deleteBy = (table: string, field: string, value: string) => {
    return `delete from ${table} where ${table}.${field}='${value}';`;
  };

  const handleSelect = () => {
    ipcRenderer.send("query", selectAllQuery);
    ipcRenderer.on("query-animal", (event, results) => {
      setAnimals(results);
      return () => {
        ipcRenderer.removeAllListeners("query-staff");
      };
    });
  };

  const handleDelete = (id: string) => {
    ipcRenderer.send("query", `animal-delete#${deleteBy("animal", "aid", id)}`);
    ipcRenderer.on("query-animal-delete", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-animal-delete");
      };
    });
    handleSelect();
  };

  useEffect(handleSelect, []);

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row m-0 h-100vh">
        <div className="col-md-3 p-0 m-0">
          <Sidebar />
        </div>
        <div className="col-md-9 m-0 p-0">
          <div className="container p-5">
            <div className="d-flex justify-content-between align-items-baseline">
              <h3>Animals</h3>
              <Link to="/animal/add">Add an animal</Link>
            </div>
            <hr />
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th>aId</th>
                  <th>Name</th>
                  <th>Specie</th>
                  <th>Weight</th>
                  <th>Date of Birth</th>
                  <th>Habitat</th>
                  <th colSpan={2}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {animals.map((s: Animal, index: number) => (
                  <tr className="table-bordered align-middle" key={index}>
                    <td scope="row">{s.aid}</td>
                    <td>{s.name}</td>
                    <td>{s.specie}</td>
                    <td>{s.weight}</td>
                    <td>{s.date_of_birth.toString()}</td>
                    <td>{s.habitat}</td>
                    <td>
                      <Link to={`/animal/edit/${s.aid}`} className="ms-2">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(s.aid)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
