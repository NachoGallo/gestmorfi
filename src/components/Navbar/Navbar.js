import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="row">
      <div className="col-12 navbar">
        <div className="col-4">
          <p className="logo">Logo</p>
        </div>
        <div className="col-8">Gestmorfi </div>
      </div>
    </div>
  );
};

export default Navbar;
