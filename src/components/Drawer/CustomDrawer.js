import React, { useState, useContext } from "react";
import "./CustomDrawer.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stack,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Context } from "../../context/Context";
const CustomDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("right");
  const { logoutSession, token, userSession } = useContext(Context);

  const logout = () => {
    onClose(true);
    logoutSession();
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
                  {userSession?.name ? userSession?.name : "Sesión no iniciada"}
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