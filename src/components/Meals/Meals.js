import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const Meals = () => {
  const [meals, setMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3000/api/meals");
      setMeals(res.data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="title">Platos disponibles</div>
      <div className="meals">
        {isLoading && <span>Cargando platos...</span>}
      </div>
    </>
  );
};

export default Meals;
