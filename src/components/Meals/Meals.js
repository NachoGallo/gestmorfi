import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import "./Meals.css";
import { validateCheckbox, SendToast } from "../../utils/utilsFunctions";
import { Context } from "../../context/Context";
import {
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Tooltip,
  Spinner,
  Tfoot,
  Button,
  Stack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Meals = () => {
  const [meals, setMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { setLayout, setErrorMessage } = useContext(Context);
  const [total, setTotal] = useState(0);
  const checkboxRef = useRef([]);
  const toast = useToast();

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

  const checkMeal = () => {
    setButtonLoading(true);
    const oneChecked = validateCheckbox(checkboxRef);
    if (!oneChecked) {
      SendToast(
        "error",
        "Error al realizar pedido.",
        "Debe seleccionar al menos una comida para realizar el pedido."
      );
      setButtonLoading(false);
      return;
    }
  };

  const SendToast = (status, title, description) => {
    toast({
      title: title,
      description: description,
      status: status ? status : "success",
      duration: 9000,
      isClosable: true,
    });
    return;
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
                        ></Checkbox>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th className="total" pt={6}>
                    Total
                  </Th>
                  <Th></Th>
                  <Th className="total" isNumeric>
                    $ {total}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
            <Stack className="stack" spacing={4} alignItems="center" pt={6}>
              <Input variant="filled" placeholder="Adicionales" w="100%" />
              <Input variant="filled" placeholder="Tu nombre" w="100%" />
            </Stack>
            <Button
              loadingText="Cargando..."
              isLoading={buttonLoading}
              onClick={checkMeal}
              className="confirm-button"
              colorScheme="blue"
              w="30%"
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
