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
import { ShowToast } from "../../utils/utilsFunctions";
import { EditIcon, DeleteIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Context } from "../../context/Context";
import EditMealModal from "./EditMealModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CreateMealModal from "./CreateMealModal";
const MySwal = withReactContent(Swal);

const MealsList = ({ history }) => {
  const [meals, setMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [mealData, setMealData] = useState(null);
  const { token } = useContext(Context);

  const { isOpen, onOpen, onClose } = useDisclosure(); //Trigger Modal

  useEffect(() => {
    fetchMeals();
  }, []);

  const createNewMeal = () => {
    setShowCreateMeal(true);
    onOpen();
  };

  const editMeal = ({ target }) => {
    setShowCreateMeal(false);
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
    const mealObject = meals.filter(
      (meal) => meal._id == target.attributes.value.value
    )[0];

    MySwal.fire({
      title: "¡Atención!",
      html: `¿Estás seguro que querés eliminar el plato <strong>${mealObject.name}</strong> ?`,
      icon: "warning",
      confirmButtonColor: "#ff6b6b",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.value) {
        const res = await axios.delete(
          `https://api-rest-gestmorfi.herokuapp.com/api/meals/${mealObject._id}`
        );

        ShowToast(
          res.status,
          res.status == 204
            ? "Plato eliminado correctamente."
            : "Hubo un error al eliminar el plato."
        );

        if (res.status == 204) {
          const index = meals.findIndex((meal) => meal._id == mealObject._id);
          const newMealsList = [...meals];
          newMealsList.splice(index, 1);
          setMeals(newMealsList);
        }
      }
    });
  };

  return (
    <>
      <span className="title">Listado de platos</span>
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
            <Stack mt={2} mb={5} direction="row" spacing={10} float="right">
              <Button colorScheme="blue" shadow="lg" onClick={createNewMeal}>
                Agregar plato
              </Button>
              {/* <Button colorScheme="green">Guardar cambios</Button> */}
            </Stack>
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

      {showCreateMeal ? (
        <CreateMealModal
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          meals={meals}
          setMeals={setMeals}
        />
      ) : (
        <EditMealModal
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          meals={meals}
          setMeals={setMeals}
          mealData={mealData}
          setMealData={setMealData}
        />
      )}
    </>
  );
};

export default MealsList;
