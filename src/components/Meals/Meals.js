import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "./Meals.css";
import {
  validateCheckbox,
  ShowToast,
  cleanCheckbox,
} from "../../utils/utilsFunctions";
import { Context } from "../../context/Context";
import {
  Table,
  Tbody,
  Tr,
  Td,
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
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [invalidInput, setInvalidInput] = useState(false);
  const {
    setLayout,
    token,
    setLoadOrders,
    loadOrders,
    userSession,
  } = useContext(Context);
  const [orderData, setOrderData] = useState({ name: "", additional: "" });

  const checkboxRef = useRef([]);
  const inputNameRef = useRef(null);
  const inputAddRef = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          "https://api-rest-gestmorfi.herokuapp.com/api/meals",
          { headers: { Authorization: `Bearer ${token}` } }
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
    const mealsChecked = validateCheckbox(checkboxRef);

    if (!!!mealsChecked.length) {
      ShowToast(
        "error",
        "Error al realizar pedido.",
        "Debe seleccionar al menos una comida para realizar el pedido."
      );
      setButtonLoading(false);
      return;
    }

    const orderPayload = {
      meals: mealsChecked,
      userId: userSession._id,
      additional: orderData.additional,
      price: total,
    };
    try {
      let res = await axios.post(
        "https://api-rest-gestmorfi.herokuapp.com/api/orders",
        orderPayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      ShowToast(res.status, "Orden generada correctamente");
      setButtonLoading(false);
      setLoadOrders(!loadOrders);
    } catch (error) {
      ShowToast("error", "Ocurrió un error.", "Intente nuevamente, por favor.");
      setButtonLoading(false);
    }

    //Unset values
    setTotal(0);
    setOrderData({ name: "", additional: "" });
    cleanCheckbox(checkboxRef);

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
        ) : meals && !meals.length ? (
          <div className="empty-orders">No hay platos disponibles.</div>
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
                  meals.map((meal, i, key) => {
                    if (meal.visibility) {
                      return (
                        <Tr key={meal._id}>
                          <Td className="meal-title">{meal.name}</Td>
                          <Td>
                            <Tooltip label={meal.description} fontSize="md">
                              <InfoOutlineIcon w={5} h={5} />
                            </Tooltip>
                          </Td>
                          <Td>$ {meal.price}</Td>
                          <Td>
                            <input
                              type="checkbox"
                              ref={(elem) => (checkboxRef.current[i] = elem)}
                              value={meal._id}
                              className="check"
                              onChange={() =>
                                handleCheckboxChange(checkboxRef.current[i])
                              }
                            />
                          </Td>
                        </Tr>
                      );
                    }
                  })}
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
                value={orderData.additional}
                placeholder="Opcional adicionales"
                w="100%"
                maxLength={20}
              />
              <Input
                ref={(el) => (inputNameRef.current = el)}
                name="name"
                value={orderData.name}
                onChange={(e) => handleInputChange(e.target)}
                isInvalid={invalidInput}
                variant="filled"
                placeholder="Tu nombre"
                w="100%"
                maxLength={20}
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
