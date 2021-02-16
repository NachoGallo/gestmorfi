import { createStandaloneToast } from "@chakra-ui/react";

export const validateCheckbox = (checkboxes) => {
  let result = false;

  checkboxes.current.map((checkbox) => {
    if (checkbox.checked) result = checkbox.value;
  });

  return result;
};

export const ShowToast = (status, title, description) => {
  switch (status) {
    case 200:
      status = "success";
      break;
    case 201:
      status = "success";
      break;
    case 400:
      status = "error";
      break;
    case 404:
      status = "error";
      break;
    case 500:
      status = "error";
      break;
    case "error":
      status = "error";
      break;
    default:
      status = "success";
      break;
  }

  const toast = createStandaloneToast();
  toast({
    title: title,
    description: description,
    status: status,
    duration: 2000,
    isClosable: true,
  });
};

export const cleanCheckbox = (checkboxes) => {
  checkboxes.current.map((checkbox) => {
    checkbox.checked = false;
  });
};

export const inputValidator = (name, value) => {
  if (value === "" || value === null) {
    return "Por favor completa el campo";
  }

  switch (name) {
    case "nombre":
      if (!value.match(/^[A-Z]+$/i)) {
        return "Solo  se permiten letras";
      }
      break;
    case "name":
      if (!value.match(/^[A-Z]+$/i)) {
        return "Solo  se permiten letras";
      }
      break;
    case "apellido":
      if (!value.match(/^[A-Z]+$/i)) {
        return "Solo  se permiten letras";
      }
      break;
    case "celular":
      if (!value.match(/^[0-9]*$/) || value.length < 6) {
        return "Sólo números y celular válido";
      }
      break;
    case "email":
      let regExp = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      );
      if (!value.match(regExp)) {
        return "Debes escribir un email válido";
      }
      break;
    case "dni":
      if (!value.match(/^[0-9]*$/) || value.length < 6) {
        return "Solo numeros y DNI válido";
      }
      break;

    case "password":
      if (value.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres.";
      }
      break;
    default:
      if (value) {
        return null;
      }
      break;
  }
};
