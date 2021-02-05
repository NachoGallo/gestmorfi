import React, { useState, useEffect, useContext } from "react";
import { Button, Input } from "reactstrap";
import axios from "axios";
import "./Meals.css";
import { Context } from "../../context/Context";
import { Spinner } from "reactstrap";

const Meals = () => {
  const [meals, setMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setLayout, setErrorMessage } = useContext(Context);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const res = await axios.get("http://localhost:3001/api/meals");
        setLayout("MAIN_PAGE");
        setMeals(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setLayout("ERROR_PAGE");
      }
    })();
  }, []);

  return (
    <>
      <span className="title">Platos disponibles</span>
      <div className="meals">
        {isLoading ? (
          <Spinner className="loading" type="grow" color="primary" />
        ) : (
          <div className="meal-list">
            <ul>
              {meals &&
                meals.map((meal) => (
                  <>
                    <div className="row meals-container">
                      <div className="col-10">
                        <li>{meal.name}</li>
                      </div>

                      <div className="col-2 checkbox">
                        <Input className="checkbox" type="checkbox" />
                      </div>
                    </div>
                  </>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Meals;
