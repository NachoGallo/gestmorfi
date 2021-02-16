import React, { useState, useContext, useRef } from "react";
import {
  Input,
  Stack,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { ViewIcon } from "@chakra-ui/icons";
import { Context } from "../context/Context";
import { inputValidator, ShowToast } from "../utils/utilsFunctions";

const RegisterPage = ({ history }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setLayout } = useContext(Context);
  const inputRef = useRef({});
  const errorRef = useRef({});

  const registerUser = async () => {
    setIsLoading(true);
    let countError = 0;
    let err = null;

    for (const input in inputRef.current) {
      err = inputValidator(input, inputRef.current[input].value);
      if (err) {
        countError++;
        inputRef.current[input].classList.add("has-error");
        errorRef.current[input].innerHTML = err;
      } else {
        inputRef.current[input].classList.remove("has-error");
        errorRef.current[input].innerHTML = "";
      }
    }
    if (countError > 0) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://api-rest-gestmorfi.herokuapp.com/api/auth/register",
        {
          email: inputRef.current["email"].value,
          password: inputRef.current["password"].value,
          name: inputRef.current["name"].value,
        }
      );
      ShowToast("success", res.data);
      history.push("/login");
    } catch (error) {
      ShowToast("error", error.response.data);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="container">
        <div className="row login-container">
          <div className="col-md-6 col-12 card">
            <h3 className="title-login">Registrarse</h3>
            <Stack spacing="1rem" w={["90%", "70%", "60%"]}>
              <Input
                type="text"
                placeholder="Tu nombre"
                size="md"
                w="100%"
                ref={(el) => (inputRef.current["name"] = el)}
              />
              <p
                className={"error-message"}
                ref={(el) => (errorRef.current["name"] = el)}
              ></p>
              <Input
                placeholder="email@example.com"
                size="md"
                w="100%"
                ref={(el) => (inputRef.current["email"] = el)}
              />
              <p
                className={"error-message"}
                ref={(el) => (errorRef.current["email"] = el)}
              ></p>
              <InputGroup>
                <Input
                  placeholder="*********"
                  size="md"
                  w="100%"
                  type={show ? "text" : "password"}
                  ref={(el) => (inputRef.current["password"] = el)}
                />
                <InputRightElement width="2.5rem">
                  <IconButton
                    variant="ghost"
                    colorScheme="blue"
                    fontSize="1.5rem"
                    icon={<ViewIcon />}
                    isActive={show ? true : false}
                    onClick={() => setShow(!show)}
                  />
                </InputRightElement>
              </InputGroup>
              <p
                className={"error-message"}
                ref={(el) => (errorRef.current["password"] = el)}
              ></p>
              <Stack direction="row" pt="5" spacing="auto">
                <Button
                  colorScheme="blue"
                  variant="ghost"
                  w="35%"
                  onClick={() => history.push("/login")}
                >
                  Volver
                </Button>
                <Button
                  colorScheme="blue"
                  variant="solid"
                  w="35%"
                  onClick={() => registerUser()}
                  isLoading={isLoading}
                >
                  Registrarse
                </Button>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
