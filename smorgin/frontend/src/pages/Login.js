import { useState, useEffect } from "react";
import { Spacer, Flex, useToast } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import LogInAndSignUpForm from "../components/forms";
import { ThemeToggleButton } from "../components/common";
import httpClient from "../httpClient";
import { FullPageSpinner } from "../components/common";

const Login = () => {

  const toast = useToast();
  const [urlParams, _] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await httpClient.get("/@me");
        // Successfully fetched the current user redirect to dashboard.
        document.location.href = "dashboard";
      } catch (error) {
        // An error occurred (most probably 401). Regardless of the error, force user to login again.
        setIsLoading(false);
      }
    })();
  }, []);

  async function handleSubmit(values, actions) {
    try {
      await httpClient.post("/login", values);
      document.location.href = urlParams.get("returnTo") === null ? "dashboard" : urlParams.get("returnTo");
    } catch (error) {
      let description = error.response.data.error;
      toast({
        description:( description === null || description === undefined ? "Something went wrong. 😣" : description),
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top"
      });
    }
  }

  return (
    <>
      <Flex p={4} height="10vh" >
        <Spacer/>
        <ThemeToggleButton />
      </Flex>
      {
        isLoading
        ?
          <FullPageSpinner/>
        :
          <LogInAndSignUpForm type="login" handleSubmit={handleSubmit} />
      }
    </>
  );
};

export default Login;