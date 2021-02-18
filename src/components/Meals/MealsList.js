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
  AlertDialog,
} from "@chakra-ui/react";
import { ShowToast } from "../../utils/utilsFunctions";
import { EditIcon, DeleteIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Context } from "../../context/Context";
import EditMealModal from "../../utils/EditMealModal";
import CustomAlertDialog from "../../utils/AlertDialog";

const MealsList = ({ history }) => {
  const [meals, setMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [mealData, setMealData] = useState(null);
  const [mealToDelete, setMealToDelete] = useState(null);
  const [toggleAlert, setToggleAlert] = useState(false);
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

  const changeVisibility = async ({ target }) => {
    const mealObject = meals.filter(
      (meal) => meal._id == target.attributes.value.value
    )[0];

    const currentVisibility = mealObject.visibility;

    const res = await axios.put(
      `https://api-rest-gestmorfi.herokuapp.com/api/meals/${mealObject._id}`,
      {
        visibility: !currentVisibility,
      }
    );
    ShowToast(
      res.status,
      res.status == 204
        ? "Visibilidad de plato actualizada."
        : "Hubo un error al actualizar la visibilidad del plato."
    );
    if (res.status == 204) {
      const index = meals.findIndex((meal) => meal._id == mealObject._id);
      const newMealsList = [...meals];
      newMealsList[index].visibility = !currentVisibility;
      setMeals(newMealsList);
    }
  };

  const deleteMeal = ({ target }) => {
    setMealToDelete(target.attributes.value.value);
    setToggleAlert(!toggleAlert);
  };

  const onConfirmDelete = async () => {
    const res = await axios.delete(
      `https://api-rest-gestmorfi.herokuapp.com/api/meals/${mealToDelete}`
    );

    ShowToast(
      res.status,
      res.status == 204
        ? "Plato eliminado correctamente."
        : "Hubo un error al eliminar el plato."
    );

    if (res.status == 204) {
      const index = meals.findIndex((meal) => meal._id == mealToDelete);
      const newMealsList = [...meals];
      newMealsList.splice(index, 1);
      setMeals(newMealsList);
    }
    setToggleAlert(!toggleAlert);
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
                              icon={<EditIcon className="custom-charka-icon" />}
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
                                meal.visibility ? <ViewIcon /> : <ViewOffIcon />
                              }
                              isActive={!meal.visibility}
                              mr={4}
                              onClick={changeVisibility}
                            />
                          </Tooltip>
                          <Tooltip label="Eliminar plato" fontSize="md">
                            <IconButton
                              value={meal._id}
                              colorScheme="red"
                              size="sm"
                              aria-label="Delete meal"
                              icon={<DeleteIcon />}
                              onClick={deleteMeal}
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
        meals={meals}
        setMeals={setMeals}
        mealData={mealData}
        setMealData={setMealData}
      />
      <CustomAlertDialog
        body={"¿Estás seguro que querés eliminar el plato?"}
        onConfirm={onConfirmDelete}
        toggleAlert={toggleAlert}
      />
    </>
  );
};

export default MealsList;
