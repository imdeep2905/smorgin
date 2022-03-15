import { useEffect} from "react";
import { Flex, Spacer} from "@chakra-ui/react";
import httpClient from "../httpClient";
import {ThemeToggleButton, FullPageSpinner} from "../components/common";

const LandingPage = () => {

  useEffect(() => {
    (async () => {
      try {
        await httpClient.get("/@me");
        // Successfully fetched the current user redirect to dashboard.
        document.location.href = "dashboard";
      } catch (error) {
        // An error occurred (most probably 401). Regardless of the error, force user to login again.
        document.location.href = "login";
      }
    })();
  }, []);

  return (
    <>
      <Flex p={4} height="10vh" >
        <Spacer/>
        <ThemeToggleButton />
      </Flex>
      <FullPageSpinner/>
    </>
  );
};

export default LandingPage;
