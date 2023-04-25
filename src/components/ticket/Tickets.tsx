import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
const { ipcRenderer } = window.require("electron");
import { TicketData } from "@/models/tables";

export default function Tickets() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const selectAllQuery = `ticket#SELECT
  t.tid AS tid,
  t.date_of_issuing AS date_of_issuing,
  t.type as type,
  t.price as price,
  sm_recep.first_name AS recep_first_name,
  sm_recep.last_name AS recep_last_name,
  sm_guide.first_name AS guide_first_name,
  sm_guide.last_name AS guide_last_name
FROM ticket AS t
JOIN staff_member AS sm_recep ON t.recep_ssn = sm_recep.ssn 
JOIN staff_member AS sm_guide ON t.guide_ssn = sm_guide.ssn;`;

  const deleteBy = (table: string, field: string, value: string) => {
    return `delete from ${table} where ${table}.${field}='${value}';`;
  };

  const handleSelect = () => {
    ipcRenderer.send("query", selectAllQuery);
    ipcRenderer.on("query-ticket", (event, results) => {
      setTickets(results);
      return () => {
        ipcRenderer.removeAllListeners("query-ticket");
      };
    });
  };

  const handleDelete = (id: string) => {
    ipcRenderer.send("query", `ticket-delete#${deleteBy("ticket", "tid", id)}`);
    ipcRenderer.on("query-ticket-delete", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-ticket-delete");
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
              <h3>Tickets</h3>
              <Link to="/ticket/add">Issue a ticket</Link>
            </div>
            <hr />
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th>tId</th>
                  <th>Type</th>
                  <th>Date of issuing</th>
                  <th>Receptionist</th>
                  <th>Guide</th>
                  <th colSpan={2}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((s: TicketData, index: number) => (
                  <tr className="table-bordered align-middle" key={index}>
                    <td scope="row">{s.tid}</td>
                    <td>{s.type}</td>
                    <td>
                      {new Date(s.date_of_issuing).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td>{`${s.recep_first_name} ${s.recep_last_name}`}</td>
                    <td>{`${s.guide_first_name} ${s.guide_last_name}`}</td>
                    <td>
                      <Link to={`/ticket/${s.tid}`} className="ms-1">
                        View
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(s.tid)}>
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
