import { Spacer, Flex, useToast} from "@chakra-ui/react";
import LogInAndSignUpForm from "../components/LogInAndSignUpForm";
import { ThemeToggleButton } from "../components/common";
import httpClient from "../httpClient";


const SignUp = () => {

  const toast = useToast();

  async function handleSubmit(values) {
    try{
      await httpClient.post("/signup",values);
      document.location.href = "/dashboard"
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
      <LogInAndSignUpForm type="signup" handleSubmit={handleSubmit} returnTo="dashboard"/>
    </>
  );
};

export default SignUp;