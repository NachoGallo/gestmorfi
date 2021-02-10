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
    duration: 9000,
    isClosable: true,
  });
};

export const cleanCheckbox = (checkboxes) => {
  checkboxes.current.map((checkbox) => {
    checkbox.checked = false;
  });
};
