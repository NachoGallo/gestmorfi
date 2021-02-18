import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Tooltip,
  Spinner,
  IconButton,
  Th,
  Flex,
  Thead,
  Stack,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Context } from "../../context/Context";
import EditMealModal from "../../utils/EditMealModal";

const MealsList = ({ history }) => {
  const [meals, setMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [mealData, setMealData] = useState(null);
  const { token } = useContext(Context);

  const { isOpen, onOpen, onClose } = useDisclosure(); //Trigger Modal

  useEffect(() => {
    fetchMeals();
  }, []);

  const editMeal = ({ target }) => {
    const mealObject = meals.filter(
      (meal) => meal._id == target.attributes.value.value
    )[0];

    setMealData(mealObject);
    onOpen();
  };

  const fetchMeals = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(
        "https://api-rest-gestmorfi.herokuapp.com/api/meals",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMeals(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      history.push("/error");
    }
  };

  return (
    <>
      <span className="title">Listado de platos</span>
      <div className="meals">
        <Stack mt={2} mb={5} direction="row" spacing={10} float="right">
          <Button colorScheme="blue" shadow="lg">
            Agregar plato
          </Button>
          {/* <Button colorScheme="green">Guardar cambios</Button> */}
        </Stack>
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
              w="100%"
              mb={5}
              mt={5}
            >
              <Thead>
                <Tr>
                  <Th fontSize="1rem">N°</Th>
                  <Th fontSize="1rem">Plato</Th>
                  <Th fontSize="1rem">Descripción</Th>
                  <Th fontSize="1rem">Precio</Th>
                  <Th fontSize="1rem">Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {meals &&
                  meals.map((meal, i, key) => (
                    <Tr key={meal._id}>
                      <Td>{i + 1}</Td>
                      <Td>{meal.name}</Td>
                      <Td>{meal.description}</Td>
                      <Td fontWeight={500}>$ {meal.price}</Td>
                      <Td>
                        <Flex align="center" justifyContent="flex-center">
                          <Tooltip label="Editar plato" fontSize="md">
                            <IconButton
                              value={meal._id}
                              colorScheme="blue"
                              size="sm"
                              aria-label="Edit meal"
                              icon={
                                <EditIcon
                                  value={meal._id}
                                  className="custom-charka-icon"
                                />
                              }
                              mr={4}
                              onClick={(e) => editMeal(e)}
                            />
                          </Tooltip>
                          <Tooltip
                            label={
                              meal.visibility
                                ? "Plato visible"
                                : "Plato no visible"
                            }
                            fontSize="md"
                          >
                            <IconButton
                              value={meal._id}
                              colorScheme="green"
                              size="sm"
                              aria-label="Delete meal"
                              icon={
                                meal.visibility ? (
                                  <ViewIcon value={meal._id} />
                                ) : (
                                  <ViewOffIcon value={meal._id} />
                                )
                              }
                              isActive={!meal.visibility}
                              mr={4}
                            />
                          </Tooltip>
                          <Tooltip label="Eliminar plato" fontSize="md">
                            <IconButton
                              value={meal._id}
                              colorScheme="red"
                              size="sm"
                              aria-label="Delete meal"
                              icon={<DeleteIcon value={meal._id} />}
                            />
                          </Tooltip>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </>
        )}
      </div>
      <EditMealModal
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        mealData={mealData}
        setMealData={setMealData}
        fetchMeals={fetchMeals}
      />
    </>
  );
};

export default MealsList;
