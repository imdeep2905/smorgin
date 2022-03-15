import { React, useState, useEffect } from "react";
import { Flex, Spacer, VStack, Heading, Button } from "@chakra-ui/react";
import { ThemeToggleButton } from "../components/common";
import { FullPageSpinner } from "../components/common";
import httpClient from "../httpClient";

const Dashboard = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let resp = await httpClient.get("/@me");
        setUser(resp.data);
      } catch (error) {
        document.location.href = "login";
      }
    })();
  }, []);

  async function logout() {
    try {
      await httpClient.post("/logout");
      document.location.href = "login";
    } catch(err) {
      // TODO : Handle This Error.
    }
  }

  return (
    <>
      <Flex p={4}>
        <Spacer/>
        <ThemeToggleButton/>
      </Flex>
      {
        user === null 
        ?
          <FullPageSpinner/>
        :
          <VStack paddingTop={"10%"}>
            <Heading size="2xl">Welcome {user.username} !</Heading>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={() => {logout();}}
            >
              Logout
            </Button>
          </VStack>
      }
    </>
  );
};

export default Dashboard;
