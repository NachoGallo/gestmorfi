export const validateCheckbox = (checkboxes) => {
  let result = false;

  checkboxes.current.map((checkbox) => {
    if (checkbox.checked) result = true;
  });

  return result;
};
