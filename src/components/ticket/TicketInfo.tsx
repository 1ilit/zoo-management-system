import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { TicketData } from "@/models/tables";
export default function TicketInfo() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<TicketData>();
  const navigate = useNavigate();
  const query = `get-ticket#SELECT
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
                JOIN staff_member AS sm_guide ON t.guide_ssn = sm_guide.ssn WHERE t.tid='${id}';`;

  const handleSelect = () => {
    ipcRenderer.send("query", query);
    ipcRenderer.on("query-get-ticket", (event, results) => {
      setTicket(results[0]);
      console.log(ticket);
      return () => {
        ipcRenderer.removeAllListeners("query-get-ticket");
      };
    });
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
            <div className="d-flex justify-content-start align-items-baseline">
              <button onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left me-1"></i>
              </button>
              <h3 className="ms-2">{`Ticket / ${ticket?.tid}`} </h3>
            </div>
            <hr />
            <div className="card">
              <div className="card-top bg-success">
                <h4 className="my-3 ms-3 text-white">
                  Ticket number: {ticket?.tid}
                </h4>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <p>
                    <span className="fw-bold">Ticket type :</span>{" "}
                    {ticket?.type}
                  </p>
                  <p>
                    <span className="fw-bold">Issued on :</span>{" "}
                    {new Date(ticket!.date_of_issuing).toLocaleString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <span className="fw-bold">Issued by :</span>{" "}
                    {`${ticket?.recep_first_name} ${ticket?.recep_last_name}`}
                  </p>
                  <p>
                    <span className="fw-bold">Guided by :</span>{" "}
                    {`${ticket?.guide_first_name} ${ticket?.guide_last_name}`}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
