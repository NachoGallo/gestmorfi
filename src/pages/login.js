import React, { useState, useContext, useRef } from "react";
import {
  Input,
  Stack,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Context } from "../context/Context";
import axios from "axios";
import { ViewIcon } from "@chakra-ui/icons";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setLayout } = useContext(Context);
  const inputRef = useRef({});
  const errorRef = useRef(null);

  const login = async () => {
    setIsLoading(true);
    let err = null;
    for (const input in inputRef.current) {
      if (!inputRef.current[input].value) {
        err = "Debe completar los campos.";
        inputRef.current[input].classList.add("has-error");
      } else {
        inputRef.current[input].classList.remove("has-error");
      }
    }

    if (err) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://api-rest-gestmorfi.herokuapp.com/api/auth/login",
        {
          email: inputRef.current["email"].value,
          password: inputRef.current["password"].value,
        }
      );
      errorRef.current.innerHTML = "";
      const token = res.data.token;
      localStorage.setItem("token", token);

      try {
        const res = await axios.get(
          "https://api-rest-gestmorfi.herokuapp.com/api/auth/me",
          { headers: { Authorization: token } }
        );
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (error) {
        console.log(error.response);
      }

      setLayout("MAIN_PAGE");
    } catch (error) {
      errorRef.current.innerHTML = error.response.data;
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="container">
        <div className="row login-container">
          <div className="col-md-6 col-12 card">
            <h3 className="title-login">Inicia sesión para continuar</h3>
            <Stack spacing="1rem" w={["90%", "70%", "60%"]}>
              <Input
                placeholder="email@example.com"
                size="md"
                w="100%"
                ref={(el) => (inputRef.current["email"] = el)}
              />
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
                ref={(el) => (errorRef.current = el)}
              ></p>
              <Stack direction="row" pt="5" spacing="auto">
                <Button
                  colorScheme="blue"
                  variant="ghost"
                  w="35%"
                  onClick={() => setLayout("REGISTER_PAGE")}
                >
                  Registrarse
                </Button>
                <Button
                  colorScheme="blue"
                  variant="solid"
                  w="35%"
                  isLoading={isLoading}
                  onClick={() => login()}
                >
                  Iniciar sesion
                </Button>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
