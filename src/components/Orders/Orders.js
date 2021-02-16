import React, { useState, useEffect, useContext, useRef } from "react";
import "./Orders.css";
import axios from "axios";
import { Spinner, Table, Tbody, Tr, Td, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Context } from "../../context/Context";
import { ShowToast } from "../../utils/utilsFunctions";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const { loadOrders, setLayout, token } = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://api-rest-gestmorfi.herokuapp.com/api/orders",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.response);
        setLayout("ERROR_PAGE");
      }
    })();
  }, [loadOrders]);

  const deleteOrder = async (orderId) => {
    let res = await axios.delete(
      `https://api-rest-gestmorfi.herokuapp.com/api/orders/${orderId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.status === 204) {
      let newOrdersObject = orders.filter((order) => order._id !== orderId);
      setOrders(newOrdersObject);
    } else {
      ShowToast("error", "Error al cancelar el pedido.");
    }
  };

  return (
    <>
      <span className="title">Ordenes activas</span>
      <div className="orders">
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
        ) : orders && !orders.length ? (
          <div className="empty-orders">No hay ordenes activas.</div>
        ) : (
          <>
            <Table
              className="order-list"
              variant="striped"
              colorScheme="blue"
              size="sm"
            >
              <Tbody className="order-body">
                {orders &&
                  orders.map((order, i, key) => (
                    <Tr key={order._id}>
                      <Td>{order.meals.name}</Td>
                      <Td> {order.userId}</Td>
                      {order.additional ? (
                        <Td> {order.additional}</Td>
                      ) : (
                        <Td color="red">Sin adicional</Td>
                      )}
                      <Td>$ {order.price}</Td>
                      <Td>
                        <IconButton
                          className="delete-button"
                          size="sm"
                          colorScheme="red"
                          aria-label="Cancelar orden"
                          icon={<CloseIcon />}
                          onClick={() => deleteOrder(order._id)}
                        />
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

export default Orders;
