import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./static/fonts.css";
import "./static/custom.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "./context/Context";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
