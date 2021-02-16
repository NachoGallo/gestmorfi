import React, { useState, useContext } from "react";
import "./CustomDrawer.css";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Context } from "../../context/Context";

const CustomDrawer = ({ history }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("right");
  const { logoutSession, token, userSession } = useContext(Context);

  const logout = () => {
    onClose(true);
    logoutSession();
    window.location.href = "https://gestmorfi.herokuapp.com/login";
  };

  return (
    <>
      <HamburgerIcon onClick={onOpen} className="drawer-button" />
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <Stack direction="row" align="center">
                <ArrowRightIcon className="close-button" onClick={onClose} />
              </Stack>
            </DrawerHeader>
            <DrawerBody>
              <Stack align="center" pt="4">
                <Avatar size="xl" bg="teal.500" />
                <p className="user-name">
                  {userSession ? userSession?.name : "Sesión no iniciada"}
                </p>
              </Stack>
              <p
                className={token ? "logout-button" : "logout-button-disabled"}
                onClick={() => token && logout()}
              >
                Cerrar sesión
              </p>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
