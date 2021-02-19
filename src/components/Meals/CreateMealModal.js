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
  Select,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ShowToast } from "../../utils/utilsFunctions";
const MySwal = withReactContent(Swal);

const CreateMealModal = ({ onClose, isOpen, meals, setMeals, categories }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mealData, setMealData] = useState({
    name: "",
    description: "",
    price: "",
    visibility: false,
    category: "",
  });

  const handleInputChange = ({ target }) => {
    setMealData({ ...mealData, [target.name]: target.value });
  };

  const handleCheckboxChange = ({ target }) => {
    setMealData({ ...mealData, [target.name]: target.checked });
  };

  const saveChanges = async () => {
    return;

    const res = await axios.post(
      `https://api-rest-gestmorfi.herokuapp.com/api/meals`,
      mealData
    );

    if (res.status == 204) {
      const index = meals.findIndex((meal) => meal._id == mealData._id);
      const newMealsList = [...meals];
      newMealsList[index] = mealData;
      setMeals(newMealsList);
    }

    ShowToast(
      res.status,
      res.status == 204
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
              <FormLabel fontWeight="700">Nombre</FormLabel>
              <Input
                name="name"
                placeholder="Nombre plato"
                value={mealData.name}
                onChange={(e) => handleInputChange(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontWeight="700">Descripción</FormLabel>
              <Input
                name="description"
                placeholder="al horno..."
                value={mealData.description}
                onChange={(e) => handleInputChange(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontWeight="700">Precio</FormLabel>
              <Input
                name="price"
                type="number"
                placeholder="300.00"
                value={mealData.price}
                onChange={(e) => handleInputChange(e)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel fontWeight="700">Categoria</FormLabel>
              <Select
                name="category"
                placeholder="Elegí una categoría"
                onChange={handleInputChange}
              >
                {categories.map((category) => {
                  if (category.visibility) {
                    return (
                      <option value={category._id}>{category.name}</option>
                    );
                  }
                })}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <Flex align="center">
                <FormLabel fontWeight="700">Visible</FormLabel>
                <Checkbox
                  size="lg"
                  borderColor="blue.400"
                  name="visibility"
                  onChange={handleCheckboxChange}
                />
              </Flex>
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
