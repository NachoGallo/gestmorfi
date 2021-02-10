import React, { useState, useEffect, useContext } from "react";
import "./Orders.css";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { Context } from "../../context/Context";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const { loadOrders, setLoadOrders, setLayout } = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://api-rest-gestmorfi.herokuapp.com/api/orders"
        );
        setOrders(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error.response);
        setLayout("ERROR_PAGE");
      }
    })();
  }, [loadOrders]);

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
        ) : (
          <>
            <div>Hola</div>
          </>
        )}
      </div>
    </>
  );
};

export default Orders;
