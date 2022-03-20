import React from "react";
import { Flex, Spacer, VStack, Heading } from "@chakra-ui/react";
import { ThemeToggleButton } from "../components/common";

const NotFound = () => {
  return (
    <>
      <Flex p={4}>
        <Spacer />
        <ThemeToggleButton />
      </Flex>
      <VStack paddingTop={"10%"}>
        <Heading size="2xl">404 | Page Not Found</Heading>
        <Heading size="lg">
          You just hit a route that doesn't exist... the sadness.😢
        </Heading>
      </VStack>
    </>
  );
};

export default NotFound;
