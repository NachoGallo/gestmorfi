import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Meals.css";
import { Context } from "../../context/Context";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Checkbox,
  Tooltip,
  Spinner,
  PhoneIcon,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Meals = () => {
  const [meals, setMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedMeals, setChekedMeals] = useState(null);
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

  // const checkMeal = (e) => {
  //   set
  // };

  return (
    <>
      <span className="title">Platos disponibles</span>
      <div className="meals">
        {isLoading ? (
          <div className="loading">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              label="loading"
            />
          </div>
        ) : (
          <Table
            className="meals-list"
            variant="striped"
            colorScheme="blue"
            size="sm"
          >
            <Tbody>
              {meals &&
                meals.map((meal) => (
                  <Tr>
                    <Td className="meal-title">{meal.name}</Td>
                    <Td>
                      <Tooltip label={meal.description} fontSize="md">
                        <InfoOutlineIcon w={5} h={5} />
                      </Tooltip>
                    </Td>
                    <Td isNumeric>$ {meal.price}</Td>
                    <Td>
                      <Checkbox
                        size="lg"
                        value={meal._id}
                        className="check"
                        colorScheme="green"
                        onChange={(e) => checkMeal(e.target)}
                      ></Checkbox>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default Meals;
