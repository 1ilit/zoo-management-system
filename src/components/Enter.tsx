import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Enter() {
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submit = () => {
    // if (inputValue === "admin") {
    navigate("/dashboard");
    // }
  };

  return (
    <div className="enter-container p-5">
      <div className="enter-inner border border-rounded border-1">
        <div className="bg-dark p-4 text-white text-center rounded-top">
          <h4>Zoo management system</h4>
          <p>Sign in as an admin or select your role and continue</p>
        </div>
        <div className="bg-light p-4 rounded-bottom form-group">
          <div className="form-group">
            <label htmlFor="password" className="mb-2">
              Enter password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="select" className="mb-2">
              Select your role
            </label>
            <select className="form-control" id="select">
              <option>Select</option>
              <option>Caretaker</option>
              <option>Janitor</option>
              <option>Guide</option>
              <option>Receptionist</option>
              <option>Event manager</option>
            </select>
          </div>
          <button
            className="btn btn-primary w-100 mt-3"
            type="submit"
            onClick={submit}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
