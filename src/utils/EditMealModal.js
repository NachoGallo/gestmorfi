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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { ShowToast } from "../utils/utilsFunctions";

const EditMealModal = ({
  onOpen,
  onClose,
  isOpen,
  mealData,
  setMealData,
  fetchMeals,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const onCloseAlert = () => setAlertIsOpen(false);

  const handleInputChange = ({ target }) => {
    setMealData({ ...mealData, [target.name]: target.value });
  };

  const saveChanges = async () => {
    setIsLoading(true);
    const res = await axios.put(
      `https://api-rest-gestmorfi.herokuapp.com/api/meals/${mealData._id}`,
      {
        name: mealData.name,
        description: mealData.description,
        price: mealData.price,
      }
    );
    ShowToast(
      res.status,
      res.status == 204
        ? "Plato actualizado con éxito."
        : "Hubo un error al actualizar el plato."
    );
    setIsLoading(false);
    onCloseAlert();
    fetchMeals();
  };

  const showAlert = () => {
    onClose();
    setAlertIsOpen(true);
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
            Editar plato
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
            <Button colorScheme="blue" mr={3} onClick={() => showAlert()}>
              Guardar cambios
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog isOpen={alertIsOpen} onClose={onCloseAlert}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ¡Atención!
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que queres actualizar el plato?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onCloseAlert}>Cancel</Button>
              <Button
                colorScheme="blue"
                onClick={() => saveChanges()}
                ml={3}
                isLoading={isLoading}
                loadingText="Guardando..."
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default EditMealModal;
