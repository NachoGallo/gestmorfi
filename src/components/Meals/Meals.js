import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "./Meals.css";
import {
  validateCheckbox,
  ShowToast,
  cleanData,
} from "../../utils/utilsFunctions";
import { Context } from "../../context/Context";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Checkbox,
  Tooltip,
  Spinner,
  Button,
  Stack,
  Input,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Meals = () => {
  const [meals, setMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [invalidInput, setInvalidInput] = useState(false);
  const { setLayout, setErrorMessage } = useContext(Context);
  const [orderData, setOrderData] = useState({ name: "", additional: "" });
  const [uncheck, setUncheck] = useState(false);

  const checkboxRef = useRef([]);
  const inputNameRef = useRef(null);
  const inputAddRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          "https://api-rest-gestmorfi.herokuapp.com/api/meals"
        );
        setLayout("MAIN_PAGE");
        setMeals(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setLayout("ERROR_PAGE");
      }
    })();
  }, []);

  const generateOrder = async () => {
    setButtonLoading(true);
    const oneChecked = validateCheckbox(checkboxRef);
    if (!oneChecked) {
      ShowToast(
        "error",
        "Error al realizar pedido.",
        "Debe seleccionar al menos una comida para realizar el pedido."
      );
      setButtonLoading(false);
      return;
    }

    const orderPayload = {
      mealId: oneChecked,
      userId: orderData.name,
      additional: orderData.additional,
      price: total,
    };
    try {
      let res = await axios.post(
        "https://api-rest-gestmorfi.herokuapp.com/api/orders",
        orderPayload
      );
      ShowToast(res.status, "Orden generada correctamente");
      setButtonLoading(false);
    } catch (error) {
      ShowToast("error", "Ocurrió un error.", "Intente nuevamente, por favor.");
      setButtonLoading(false);
    }

    //Unset values
    setTotal(0);
    setOrderData({ name: "", additional: "" });
    inputNameRef.current.value = "";
    inputAddRef.current.value = "";

    return;
  };

  const handleCheckboxChange = (checkbox) => {
    let currentPrice = parseInt(total);
    const price = parseInt(
      meals
        .filter((meal) => meal._id === checkbox.value)
        .map((result) => result.price)
    );

    if (checkbox.checked) {
      currentPrice += price;
    } else {
      currentPrice -= price;
    }

    setTotal(currentPrice);
  };

  const handleInputChange = (target) => {
    setOrderData({ ...orderData, [target.name]: target.value });
  };

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
          <>
            <Table
              className="meals-list"
              variant="striped"
              colorScheme="blue"
              size="sm"
            >
              <Tbody>
                {meals &&
                  meals.map((meal, i, key) => (
                    <Tr key={meal._id}>
                      <Td className="meal-title">{meal.name}</Td>
                      <Td>
                        <Tooltip label={meal.description} fontSize="md">
                          <InfoOutlineIcon w={5} h={5} />
                        </Tooltip>
                      </Td>
                      <Td isNumeric>$ {meal.price}</Td>
                      <Td>
                        <Checkbox
                          ref={(elem) => (checkboxRef.current[i] = elem)}
                          size="lg"
                          value={meal._id}
                          className="check"
                          colorScheme="green"
                          onChange={() =>
                            handleCheckboxChange(checkboxRef.current[i])
                          }
                        ></Checkbox>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            <Flex mt={5}>
              <Box className="total-title">TOTAL</Box>
              <Spacer />
              <Box className="total-price">$ {total}</Box>
            </Flex>
            <Stack className="stack" spacing={4} alignItems="center" pt={6}>
              <Input
                ref={(el) => (inputAddRef.current = el)}
                name="additional"
                onChange={(e) => handleInputChange(e.target)}
                variant="filled"
                placeholder="Opcional adicionales"
                w="100%"
              />
              <Input
                ref={(el) => (inputNameRef.current = el)}
                name="name"
                onChange={(e) => handleInputChange(e.target)}
                isInvalid={invalidInput}
                variant="filled"
                placeholder="Tu nombre"
                w="100%"
              />
            </Stack>
            <Button
              isDisabled={!orderData.name}
              loadingText="Cargando..."
              isLoading={buttonLoading}
              onClick={generateOrder}
              className="confirm-button"
              colorScheme="blue"
              w={["100%", "40%", "30%"]}
              mt={8}
            >
              Confirmar
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Meals;
