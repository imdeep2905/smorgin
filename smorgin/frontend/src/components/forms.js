import { Link, FormControl, FormLabel, Input, Button, FormErrorMessage, useColorModeValue, Flex, VStack, Heading, Box } from "@chakra-ui/react"
import { Formik, Form, Field } from "formik"

const LogInAndSignUpForm = (props) => {
  const formType = props.type;
  const theme = useColorModeValue("light", "dark");

  function validateUsername(value) {
    if (!value) 
     return "Username is required";
  }
  function validatePassword(value) {
    if (!value) 
     return "Password is required";
  }

  return (
    <Flex flexDirection="column" width="100wh" height="80vh" justifyContent="center" alignItems="center">
      <VStack>
        <Heading size="lg" paddingBottom="5%">Welcome to Smorgin 📈 !</Heading>
        <Box backgroundColor={theme === "dark" ? "gray.900" : "gray.50"} w="sm"  p="5%" borderWidth="1px" borderRadius="lg" >
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={props.handleSubmit}
            >
            {(props) => (
              <Form>
                <Field name="username" validate={validateUsername}>
                  {({ field, form }) => (
                    <FormControl colorScheme="teal" isInvalid={form.errors.username && form.touched.username}>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Input {...field} id="username" placeholder="Cool User 😎" />
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl colorScheme="teal" isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input {...field} type="password" id="password" placeholder="" />
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  isLoading={props.isSubmitting}
                  colorScheme="teal"
                  type="submit"
                >
                  {formType === "login" ? "Log In" : "Sign Up"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        {
          formType === "login" && 
          <Heading size="md" paddingTop="3%">
            If you are opening smorgin for the first time, signup by clicking <Link href='/signup'>here</Link>.
          </Heading>
        }
      </VStack>
    </Flex>
  )
}

export default LogInAndSignUpForm;