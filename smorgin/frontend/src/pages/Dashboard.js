import { React, useState, useEffect } from "react";
import { Flex, Spacer, useToast } from "@chakra-ui/react";
import { ThemeToggleButton } from "../components/common";
import { FullPageSpinner } from "../components/common";
import httpClient from "../httpClient";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const toast = useToast();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let resp;
        try {
          resp = await httpClient.get("/@me");
        } catch (error) {
          document.location.href = "login";
        }
        setUser(resp.data);
        for (const [category, msg] of resp.data._flashes) {
          toast({
            description: msg,
            status: category,
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        // TODO: Handle this error
      }
    })();
  }, []);

  return (
    <>
      {user === null ? (
        <>
          <Flex p={4}>
            <Spacer />
            <ThemeToggleButton />
          </Flex>
          <FullPageSpinner />
        </>
      ) : (
        <Navbar />
      )}
    </>
  );
};

export default Dashboard;
