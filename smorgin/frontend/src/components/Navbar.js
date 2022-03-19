import {
  Box,
  IconButton,
  Stack,
  Flex,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import { ThemeToggleButton } from './common';
import { SiBinance } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import httpClient from '../httpClient';
import BinanceConnectForm from './BinanceConnectForm';

const Links = ['Dashboard', 'Rules', 'History'];

const NavLink = ({ children }) => {
  const location = useLocation();
  return(
    <Link
      bg={useColorModeValue( location.pathname ==  "/" + children.toLowerCase() ? "gray.50" : null, location.pathname ==  "/" + children.toLowerCase() ? "gray.700" : null)}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={location.pathname ==  "/" + children.toLowerCase() ? "#" : children.toLowerCase()}>
      {children}
    </Link>
  );
}

const Navbar = () => {
  const { isOpen: isOpenForNavbar, onOpen: onOpenForNavbar, onClose: onCloseForNavbar } = useDisclosure();
  const { isOpen: isOpenForModal, onOpen: onOpenForModal, onClose: onCloseForModal } = useDisclosure();
  const location = useLocation();

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
      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpenForNavbar ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpenForNavbar ? onCloseForNavbar : onOpenForNavbar}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <ThemeToggleButton/>
            &nbsp;&nbsp;
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                  <Avatar size="md"/>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onOpenForModal}><SiBinance/>&nbsp;&nbsp;Connect Binance account</MenuItem>
                <MenuItem onClick={logout}><FiLogOut/>&nbsp;&nbsp;Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpenForNavbar ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpenForModal} onClose={onCloseForModal} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect your Binance Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BinanceConnectForm redirectTo={location.pathname} />
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Navbar;