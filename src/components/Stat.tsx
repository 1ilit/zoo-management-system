import React from "react";

interface StatProps {
  name: string;
  value: string;
  icon: string;
}

const Stat: React.FC<StatProps> = ({ name, value, icon }) => {
  return (
    <div className="d-flex justify-content-start align-items-center bg-light border border-muted mb-4 p-4 w-f200 rounded">
      <i className={`${icon} h2`}></i>
      <div className="ms-4 h5">{name}</div>
      <div className="ms-4 h5 text-primary">{value}</div>
    </div>
  );
};

export default Stat;
