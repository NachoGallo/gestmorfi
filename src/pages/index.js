import React, { useState, useEffect } from "react";
import Meals from "../components/Meals/Meals";
import Orders from "../components/Orders/Orders";

const MainPage = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="card">
              <Meals />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="card">
              <Orders />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
