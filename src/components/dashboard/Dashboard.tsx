import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
const { ipcRenderer } = window.require("electron");

interface Data {
  total_animals: number;
  total_staff: number;
  total_male: number;
  total_female: number;
  total_parttime: number;
  total_fulltime: number;
  total_volunteer: number;
  avg_paypermonth: number;
  avg_payperhour: number;
  total_tickets: number;
  total_revenue: number;
}

export default function Dashboard() {
  const query = `dashboard#SELECT COUNT(*) as stats FROM animal
                          UNION ALL select COUNT(*) FROM staff_member
                          UNION ALL SELECT COUNT(*) FROM staff_member WHERE staff_member.sex='M'
                          UNION ALL SELECT COUNT(*) FROM staff_member WHERE staff_member.sex='F'
                          UNION ALL SELECT COUNT(*) FROM staff_member WHERE staff_member.isparttime='Y'
                          UNION ALL SELECT COUNT(*) FROM staff_member WHERE staff_member.isfulltime='Y'
                          UNION ALL SELECT COUNT(*) FROM staff_member WHERE staff_member.isvolunteer='Y'
                          UNION ALL SELECT AVG(paypermonth) FROM staff_member
                          UNION ALL SELECT AVG(payperhour) FROM staff_member
                          UNION ALL SELECT COUNT(*) FROM ticket
                          UNION ALL SELECT SUM(price) FROM ticket;
                          `;

  const [data, setData] = useState<Data>({
    total_animals: 0,
    total_staff: 0,
    total_male: 0,
    total_female: 0,
    total_parttime: 0,
    total_fulltime: 0,
    total_volunteer: 0,
    avg_payperhour: 0,
    avg_paypermonth: 0,
    total_tickets: 0,
    total_revenue: 0,
  });

  useEffect(() => {
    ipcRenderer.send("query", query);
    ipcRenderer.on("query-dashboard", (event, results) => {
      const newData: Data = {
        total_animals: results[0].stats,
        total_staff: results[1].stats,
        total_male: results[2].stats,
        total_female: results[3].stats,
        total_parttime: results[4].stats,
        total_fulltime: results[5].stats,
        total_volunteer: results[6].stats,
        avg_paypermonth: results[7].stats,
        avg_payperhour: results[8].stats,
        total_tickets: results[9].stats,
        total_revenue: results[10].stats,
      };
      setData(newData);
      return () => {
        ipcRenderer.removeAllListeners("query-dashboard");
      };
    });
  }, []);

  return (
    <div className="container-fluid p-0 m-0">
      <div className="row m-0 h-100vh">
        <div className="col-md-3 p-0 m-0">
          <Sidebar />
        </div>
        <div className="col-md-9 m-0 p-0">
          <div className="container p-5">
            <h3>Dashboard</h3>
            <hr />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th colSpan={2}>Stats</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total number of animals</td>
                  <td>{data.total_animals}</td>
                </tr>
                <tr>
                  <td>Total staff</td>
                  <td>{data.total_staff}</td>
                </tr>
                <tr>
                  <td>Total female staff</td>
                  <td>{data.total_female}</td>
                </tr>
                <tr>
                  <td>Total male staff</td>
                  <td>{data.total_male}</td>
                </tr>
                <tr>
                  <td>Total volunteers</td>
                  <td>{data.total_volunteer}</td>
                </tr>
                <tr>
                  <td>Total part-time staff</td>
                  <td>{data.total_parttime}</td>
                </tr>
                <tr>
                  <td>Total full-time staff</td>
                  <td>{data.total_fulltime}</td>
                </tr>
                <tr>
                  <td>Average pay per hour</td>
                  <td>{data.avg_payperhour}</td>
                </tr>
                <tr>
                  <td>Average pay per month</td>
                  <td>{data.avg_paypermonth}</td>
                </tr>
                <tr>
                  <td>Total tickets sold</td>
                  <td>{data.total_tickets}</td>
                </tr>
                <tr>
                  <td>Total revenue</td>
                  <td>{data.total_revenue}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
