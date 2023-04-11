import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { ipcRenderer } from "electron";
import { StaffMember } from "@/models/tables";

export default function EditStaffMember() {
  const { id } = useParams();
  const [staffMember, setStaffMember] = useState<StaffMember>({
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
  const [formState, setFormState] = useState<StaffMember>(staffMember);

  const navigate = useNavigate();
  const query = `get-staff-member#select * from staff_member where staff_member.ssn='${id}'`;
  const updateQuery = `update-staff-member#update staff_member
  set ssn='${formState.ssn}', date_of_birth='${new Date(formState.date_of_birth)
    .toISOString()
    .slice(0, 10)}', first_name = '${formState.first_name}', last_name = '${
    formState.last_name
  }', sex='${formState.sex}', phone_number='${
    formState.phone_number
  }', email = '${formState.email}', address = '${
    formState.address
  }', isvolunteer ='${formState.isvolunteer}', isparttime='${
    formState.isparttime
  }',isparttime='${formState.isfulltime}', payperhour=${parseFloat(
    formState.payperhour
  )}, paypermonth=${parseFloat(formState.paypermonth)}
  where ssn='${id}';`;

  const handleSelect = () => {
    ipcRenderer.send("query", query);
    ipcRenderer.on("query-get-staff-member", (event, results) => {
      setStaffMember(results[0]);
      setFormState(results[0]);
      return () => {
        ipcRenderer.removeAllListeners("query-get-staff-member");
      };
    });
  };

  const handleUpdate = () => {
    ipcRenderer.send("query", updateQuery);
    ipcRenderer.on("query-update-staff-member", (event, results) => {
      return () => {
        ipcRenderer.removeAllListeners("query-update-staff-member");
      };
    });
  };

  useEffect(() => {
    handleSelect();
  }, []);

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
    navigate("/staff");
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
              <h3 className="ms-2">{`Staff / Edit / ${staffMember?.first_name} ${staffMember?.last_name}`}</h3>
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
                  placeholder={`${staffMember.ssn}`}
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
                  placeholder={`${staffMember.first_name}`}
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
                  placeholder={`${staffMember.last_name}`}
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
                  placeholder={`${staffMember.sex}`}
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
                  placeholder={`${staffMember.email}`}
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
                  placeholder={`${staffMember.phone_number}`}
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
                <label htmlFor="ssn" className="my-2 fw-bold">
                  Pay per hour :{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pay-per-hour"
                  name="payperhour"
                  placeholder={`${staffMember.payperhour}`}
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
                  placeholder={`${staffMember.paypermonth}`}
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
