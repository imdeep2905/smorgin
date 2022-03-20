import {
  IconButton,
  useColorMode,
  Flex,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
      isRound="true"
      size="lg"
      onClick={toggleColorMode}
    />
  );
};

const FullPageSpinner = () => {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="80vh"
      justifyContent="center"
      alignItems="center"
    >
      <VStack>
        <Spinner size="xl" colorScheme="teal"></Spinner>
      </VStack>
    </Flex>
  );
};

export { ThemeToggleButton, FullPageSpinner };
