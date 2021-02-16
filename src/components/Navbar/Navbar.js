import React from "react";
import "./Navbar.css";
import CustomDrawer from "../Drawer/CustomDrawer";
import { Flex, Spacer } from "@chakra-ui/react";

const Navbar = ({ history }) => {
  return (
    <Flex className="custom-navbar" align="center">
      <p className="logo">Gestmorfi</p>
      <Spacer className="spacer" />
      <span className="slogan">Tu gestor de pedidos favorito</span>
      <Spacer className="spacer" />
      <CustomDrawer history={history} />
    </Flex>
  );
};

export default Navbar;
