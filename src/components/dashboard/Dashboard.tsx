import React, { useState, useEffect } from "react";
import Stat from "../Stat";
import Sidebar from "../Sidebar";
const { ipcRenderer } = window.require("electron");

interface Data {
  [key: string]: string;
  total_animals: string;
  total_staff: string;
  total_male: string;
  total_female: string;
  total_parttime: string;
  total_fulltime: string;
  total_volunteer: string;
}

interface Animal {
  aId: number;
  name: string;
  specie: string;
  dateOfBirth: string;
  weight: number;
  habitat: string;
}

export default function Dashboard() {
  const query = `dashboard#select COUNT(*) as count from animal
    union all
    select COUNT(*) as count from staff_member
    union all
    select COUNT(*) as count from staff_member where staff_member.sex='M'
    union all
    select COUNT(*) as count from staff_member where staff_member.sex='F'
    union all
    select COUNT(*) as count from staff_member where staff_member.isparttime='Y'
    union all
    select COUNT(*) as count from staff_member where staff_member.isfulltime='Y'
    union all
    select COUNT(*) as count from staff_member where staff_member.isvolunteer='Y';
  `;

  const [data, setData] = useState<Data>({
    total_animals: "",
    total_staff: "",
    total_male: "",
    total_female: "",
    total_parttime: "",
    total_fulltime: "",
    total_volunteer: "",
  });
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    ipcRenderer.send("query", query);
    ipcRenderer.on("query-dashboard", (event, results) => {
      const newData: Data = {
        total_animals: results[0].count,
        total_staff: results[1].count,
        total_male: results[2].count,
        total_female: results[3].count,
        total_parttime: results[4].count,
        total_fulltime: results[5].count,
        total_volunteer: results[6].count,
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
            <Sidebar/>
        </div>
        <div className="col-md-9 m-0 p-0">
          <div className="container p-5">
            <h3>Dashboard</h3>
            <hr />
            <Stat
              name="animals"
              value={data["total_animals"]}
              icon="fa-regular fa-heart"
            />
            <Stat
              name="staff"
              value={data["total_staff"]}
              icon="fa-regular fa-heart"
            />
            <Stat
              name="male"
              value={data["total_male"]}
              icon="fa-regular fa-heart"
            />
            <Stat name="animals" value="30" icon="fa-regular fa-heart" />
          </div>
        </div>
      </div>
    </div>
  );
}
