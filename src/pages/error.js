import React, { useContext } from "react";
import { Context } from "../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Error = () => {
  const { errorMessage } = useContext(Context);
  return (
    <div className="error-page">
      <FontAwesomeIcon className="error-icon" icon={faExclamationCircle} />
      <div className="error-message">{errorMessage}</div>
    </div>
  );
};

export default Error;
