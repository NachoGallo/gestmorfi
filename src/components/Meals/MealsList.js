import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Tooltip,
  Spinner,
  IconButton,
  Button,
  Stack,
  Input,
  Th,
  Flex,
  Spacer,
  Box,
  Thead,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Context } from "../../context/Context";

const MealsList = ({ history }) => {
  const [meals, setMeals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { token } = useContext(Context);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const res = await axios.get(
          "https://api-rest-gestmorfi.herokuapp.com/api/meals",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMeals(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        history.push("/error");
      }
    })();
  }, []);

  return (
    <>
      <span className="title">Listado de platos</span>
      <div className="meals">
        {isLoading ? (
          <div className="loading">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              label="loading"
            />
          </div>
        ) : (
          <>
            <Table
              className="meals-list"
              variant="striped"
              colorScheme="blue"
              size="sm"
              w="100%"
              mb={5}
            >
              <Thead>
                <Tr>
                  <Th fontSize="1rem">Plato</Th>
                  <Th fontSize="1rem">Descripción</Th>
                  <Th fontSize="1rem">Precio</Th>
                  <Th fontSize="1rem">Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {meals &&
                  meals.map((meal, i, key) => (
                    <Tr key={meal._id}>
                      <Td>{meal.name}</Td>
                      <Td>{meal.description}</Td>
                      <Td fontWeight={500}>$ {meal.price}</Td>
                      <Td>
                        <Flex
                          align="center"
                          justifyContent="flex-center"
                          mr={3}
                        >
                          <IconButton
                            colorScheme="blue"
                            size="sm"
                            aria-label="Edit meal"
                            icon={<EditIcon />}
                            mr={4}
                          />
                          <IconButton
                            colorScheme="red"
                            size="sm"
                            aria-label="Delete meal"
                            icon={<DeleteIcon />}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
};

export default MealsList;
