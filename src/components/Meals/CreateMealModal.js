import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  Input,
  FormLabel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ShowToast } from "../../utils/utilsFunctions";
const MySwal = withReactContent(Swal);

const CreateMealModal = ({
  onClose,
  isOpen,
  meals,
  setMeals,
  mealData,
  setMealData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mealData, setMealData] = useState({
    name: "",
    description: "",
    price: 0,
    visibility: false,
  });

  const handleInputChange = ({ target }) => {
    setMealData({ ...mealData, [target.name]: target.value });
  };

  const saveChanges = async () => {
    const res = await axios.post(
      `https://api-rest-gestmorfi.herokuapp.com/api/meals`,
      {
        name: mealData.name,
        description: mealData.description,
        price: mealData.price,
      }
    );

    if (response.status == 204) {
      const index = meals.findIndex((meal) => meal._id == mealData._id);
      const newMealsList = [...meals];
      newMealsList[index] = mealData;
      setMeals(newMealsList);
    }

    ShowToast(
      response.status,
      response.status == 204
        ? "Plato actualizado con éxito."
        : "Hubo un error al actualizar el plato."
    );
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            color="gray.600"
            fontFamily="Custom, Arial"
          >
            Crear plato
          </ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                placeholder="Nombre plato"
                value={mealData?.name}
                onChange={(e) => handleInputChange(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Descripción</FormLabel>
              <Input
                name="description"
                placeholder="al horno..."
                value={mealData?.description}
                onChange={(e) => handleInputChange(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Precio</FormLabel>
              <Input
                name="price"
                type="number"
                placeholder="300"
                value={mealData?.price}
                onChange={(e) => handleInputChange(e)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={saveChanges}
              isLoading={isLoading}
            >
              Guardar cambios
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateMealModal;
