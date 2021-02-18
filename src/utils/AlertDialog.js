import React, { useState, useEffect } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const CustomAlertDialog = ({ title, body, onConfirm, toggleAlert }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(true);
  const onCloseAlert = () => setAlertIsOpen(false);

  useEffect(() => {
    setAlertIsOpen(!alertIsOpen);
  }, [toggleAlert]);

  return (
    <AlertDialog isOpen={alertIsOpen} onClose={onCloseAlert}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title ? title : "¡Atención!"}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onCloseAlert}>Cancel</Button>
            <Button
              colorScheme="blue"
              onClick={onConfirm}
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
  );
};

export default CustomAlertDialog;
