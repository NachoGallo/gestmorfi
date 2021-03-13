import React, { useContext, useEffect } from "react";
import MealsList from "../components/Meals/MealsList";
import { Context } from "../context/Context";

const MealsManagment = ({ history }) => {
  const { token, userSession } = useContext(Context);
  useEffect(() => {
    if (!token || userSession.role != "ADMIN_ROLE") history.push("/login");
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8 col-12">
          <div className="card">
            <MealsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsManagment;
