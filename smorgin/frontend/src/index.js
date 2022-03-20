import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, ColorModeScript, Container } from "@chakra-ui/react";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode="system" />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
