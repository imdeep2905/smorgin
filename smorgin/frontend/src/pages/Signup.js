import { Spacer, Flex, useToast} from "@chakra-ui/react";
import LogInAndSignUpForm from "../components/forms";
import { ThemeToggleButton } from "../components/common";
import httpClient from "../httpClient";


const SignUp = () => {

  const toast = useToast();

  async function handleSubmit(values, actions) {
    try{
      await httpClient.post("/signup",values);
      toast({
        description: "Your account have been created. Redirecting you to the dashboard. 😀",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top"
      });
      setTimeout(()=>{document.location.href = "/dashboard"}, 5000);
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