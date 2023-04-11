import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
const { ipcRenderer } = window.require("electron");
import { Habitat } from "@/models/tables";

export default function Habitats() {
  const [habitats, setHabitats] = useState<Habitat[]>([]);
  const selectAllQuery = `habitat#SELECT
                                    h.hid,
                                    h.name AS name,
                                    h.capacity,
                                    h.type,
                                    h.size,
                                    h.description,
                                    COUNT(a.aid) AS animal_count
                                  FROM habitat AS h
                                  LEFT JOIN animal AS a ON h.hid = a.habitat
                                  GROUP BY h.hid;`;

  const deleteBy = (table: string, field: string, value: string) => {
    return `delete from ${table} where ${table}.${field}='${value}';`;
  };

  const handleSelect = () => {
    ipcRenderer.send("query", selectAllQuery);
    ipcRenderer.on("query-habitat", (event, results) => {
      setHabitats(results);
      return () => {
        ipcRenderer.removeAllListeners("query-habitat");
      };
    });
  };

  const handleDelete = (id: string) => {
    ipcRenderer.send("query", `habitat-delete#${deleteBy("habitat", "hid", id)}`);
    ipcRenderer.on("query-habitat-delete", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-habitat-delete");
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
              <h3>Habitats</h3>
              <Link to="/habitat/add">Add a habitat</Link>
            </div>
            <hr />
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th>hId</th>
                  <th>Name</th>
                  <th>Capacity</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Description</th>
                  <th>Number of animals</th>
                  <th colSpan={1}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {habitats.map((s: Habitat, index: number) => (
                  <tr className="table-bordered align-middle" key={index}>
                    <td scope="row">{s.hid}</td>
                    <td>{s.name}</td>
                    <td>{s.capacity}</td>
                    <td>{s.type}</td>
                    <td>{s.size}</td>
                    <td>{s.description}</td>
                    <td>{s.animal_count}</td>
                    <td>
                      <button onClick={() => handleDelete(s.hid)}>
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
