import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { StaffMember } from "@/models/tables";

export default function AddStaffMember() {
  const [formState, setFormState] = useState<StaffMember>({
    ssn: "",
    date_of_birth: new Date("1990-07-15"),
    first_name: "",
    last_name: "",
    sex: "",
    phone_number: "",
    email: "",
    address: "",
    isvolunteer: "N",
    isparttime: "N",
    isfulltime: "N",
    payperhour: "",
    paypermonth: "",
  });

  const navigate = useNavigate();
  const insertQuery = `insert-staff-member#insert into staff_member (ssn, date_of_birth, first_name, last_name, sex, phone_number, email, address, isvolunteer, isparttime, isfulltime, payperhour, paypermonth)
  values ('${formState.ssn}', '${
    formState.date_of_birth.toISOString().split("T")[0]
  }', '${formState.first_name}', '${formState.last_name}', '${
    formState.sex
  }', '${formState.phone_number}', '${formState.email}', '${
    formState.address
  }', '${formState.isvolunteer}', '${formState.isparttime}', '${
    formState.isfulltime
  }', ${parseFloat(formState.payperhour)}, ${parseFloat(
    formState.paypermonth
  )});`;

  const handleInsert = () => {
    ipcRenderer.send("query", insertQuery);
    ipcRenderer.on("query-insert-staff-member", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-insert-staff-member");
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
    console.log(formState);
    handleInsert();
    navigate(-1);
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
              <h3 className="ms-2">{`Staff / Add`}</h3>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="ssn" className="my-2 fw-bold">
                  SSN :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ssn"
                  name="ssn"
                  placeholder="SSN"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="first-name" className="my-2 fw-bold">
                  First name :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  name="first_name"
                  placeholder="First name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name" className="my-2 fw-bold">
                  Last name :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last-name"
                  name="last_name"
                  placeholder="Last name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sex" className="my-2 fw-bold">
                  Sex :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sex"
                  name="sex"
                  placeholder="Sex"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="my-2 fw-bold">
                  Email :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone-number" className="my-2 fw-bold">
                  Phone number :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone-number"
                  name="phone_number"
                  placeholder="Phone number"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="my-2 fw-bold">
                  Address :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Address"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="volunteer" className="my-2 fw-bold">
                  Volunteer :
                </label>
                <select
                  className="form-control"
                  name="isvolunteer"
                  id="volunteer"
                  value={formState.isvolunteer}
                  onChange={handleInputChange}
                >
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="parttime" className="my-2 fw-bold">
                  Parttime :
                </label>
                <select
                  className="form-control"
                  name="isparttime"
                  id="parttime"
                  value={formState.isparttime}
                  onChange={handleInputChange}
                >
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fulltime" className="my-2 fw-bold">
                  Fulltime :
                </label>
                <select
                  className="form-control"
                  name="isfulltime"
                  id="fulltime"
                  value={formState.isfulltime}
                  onChange={handleInputChange}
                >
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ssn" className="my-2 fw-bold">
                  Pay per hour :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pay-per-hour"
                  name="payperhour"
                  placeholder="Pay per hour"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Pay per month" className="my-2 fw-bold">
                  Pay per month :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pay-per-month"
                  name="paypermonth"
                  placeholder="Pay per month"
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
