import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="row navbar">
      <div className="col-12 col-md-4">
        <p className="logo">Gestmorfi</p>
      </div>
      <div className="d-none d-md-block col-md-8 slogan">
        Tu gestor de pedidos favorito{" "}
      </div>
    </div>
  );
};

export default Navbar;
