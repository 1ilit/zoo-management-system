import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
const { ipcRenderer } = window.require("electron");
import { EventData } from "@/models/tables";

export default function Events() {
  const [events, setEvents] = useState<EventData[]>([]);
  const selectAllQuery = `event#SELECT
                          e.name AS event_name,
                          e.date AS event_date,
                          e.location,
                          sm.first_name AS event_mgr_first_name,
                          sm.last_name AS event_mgr_last_name
                          FROM event AS e
                          JOIN staff_member AS sm ON e.event_manager_ssn = sm.ssn;`;

  const handleSelect = () => {
    ipcRenderer.send("query", selectAllQuery);
    ipcRenderer.on("query-event", (event, results) => {
      setEvents(results);
      return () => {
        ipcRenderer.removeAllListeners("query-event");
      };
    });
  };

  const handleDelete = (event_name: string, location: string, date: string) => {
    const dateStr = new Date(date)
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .slice(0, 10)
      .replace(/\//g, "-");
    const [day, month, year] = dateStr.split("-");
    const formattedDateStr = `${year}-${day}-${month}`;

    ipcRenderer.send(
      "query",
      `event-delete#DELETE FROM event WHERE name='${event_name}' and date='${formattedDateStr}' and location='${location}';`
    );
    ipcRenderer.on("query-event-delete", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-event-delete");
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
              <h3>Events</h3>
              <Link to="/event/add">Register an event</Link>
            </div>
            <hr />
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Manager</th>
                  <th colSpan={2}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {events.map((s: EventData, index: number) => (
                  <tr className="table-bordered align-middle" key={index}>
                    <td scope="row">{s.event_name}</td>
                    <td>
                      {new Date(s.event_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td>{s.location}</td>
                    <td>{`${s.event_mgr_first_name} ${s.event_mgr_last_name}`}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleDelete(s.event_name, s.location, s.event_date)
                        }
                      >
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
