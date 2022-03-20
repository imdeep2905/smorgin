import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
  Spinner,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import httpClient from "../httpClient";

function validateAPIKey(value) {
  if (!value) return "API Key is required";
}

const BinanceNewCredsForm = (props) => {
  const toast = useToast();
  const redirectTo = props.redirectTo;

  function validateSecretKey(value) {
    if (!value) return "Secret Key is required";
  }

  async function handleSubmit(values) {
    try {
      await httpClient.post("/binance_creds", values);
      document.location.href = redirectTo;
    } catch (error) {
      let description = error.response.data.error;
      toast({
        description:
          description == undefined ? "Something went wrong." : description,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Formik
      initialValues={{ api_key: "", secret_key: "", testnet: false }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <Field name="api_key" validate={validateAPIKey}>
            {({ field, form }) => (
              <FormControl
                colorScheme="teal"
                isInvalid={form.errors.api_key && form.touched.api_key}
              >
                <FormLabel htmlFor="api_key">API Key</FormLabel>
                <Input {...field} id="api_key" placeholder="Your API Key" />
                <FormErrorMessage>{form.errors.api_key}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="secret_key" validate={validateSecretKey}>
            {({ field, form }) => (
              <FormControl
                colorScheme="teal"
                isInvalid={form.errors.secret_key && form.touched.secret_key}
              >
                <FormLabel htmlFor="secret_key" paddingTop={2}>
                  Secret Key
                </FormLabel>
                <Input
                  {...field}
                  type="password"
                  id="secret_key"
                  placeholder="Your Secret Key"
                />
                <FormErrorMessage>{form.errors.secret_key}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="testnet">
            {({ field }) => (
              <FormControl colorScheme="teal">
                <Checkbox {...field} id="testnet" paddingTop={2}>
                  Use Testnet
                </Checkbox>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            isLoading={props.isSubmitting}
            colorScheme="teal"
            type="submit"
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const BinanceDeleteCredsForm = (props) => {
  const toast = useToast();
  const apiKey = props.apiKey;
  const testnet = props.testnet;
  const redirectTo = props.redirectTo;

  async function handleSubmit() {
    try {
      await httpClient.delete("/binance_creds");
      document.location.href = redirectTo;
    } catch (error) {
      let description = error.response.data.error;
      toast({
        description:
          description == undefined ? "Something went wrong." : description,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Formik initialValues={{ api_key: apiKey }} onSubmit={handleSubmit}>
      {(props) => (
        <Form>
          <Field name="api_key" validate={validateAPIKey}>
            {({ field, form }) => (
              <FormControl
                colorScheme="teal"
                isInvalid={form.errors.api_key && form.touched.api_key}
              >
                <FormLabel htmlFor="api_key">
                  API Key {testnet ? "(Testnet)" : ""}
                </FormLabel>
                <Input {...field} id="api_key" disabled={true} />
                <FormErrorMessage>{form.errors.api_key}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            isLoading={props.isSubmitting}
            colorScheme="teal"
            type="submit"
          >
            Delete
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const BinanceConnectForm = (props) => {
  const toast = useToast();
  const redirectTo = props.redirectTo;
  const [savedCreds, setSavedCreds] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let resp = await httpClient.get("/binance_creds");
        setSavedCreds(resp.data);
      } catch (error) {
        let description = error.response.data.error;
        toast({
          description:
            description == undefined ? "Something went wrong." : description,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setSavedCreds("error");
      }
    })();
  }, []);

  if (savedCreds === null) {
    return (
      <>
        <Flex justifyContent={"center"}>
          <Spinner size={"lg"} color="teal" />
        </Flex>
      </>
    );
  } else if (savedCreds === "error") {
    return <></>;
  } else {
    return savedCreds.api_key == null ? (
      <BinanceNewCredsForm redirectTo={redirectTo} />
    ) : (
      <BinanceDeleteCredsForm
        redirectTo={redirectTo}
        apiKey={savedCreds.api_key}
        testnet={savedCreds.testnet}
      />
    );
  }
};

export default BinanceConnectForm;
