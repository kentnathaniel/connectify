import { Link as ReactRouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

export function Link({
  children,
  ...rest
}: LinkProps & RouterLinkProps): ReturnType<typeof ChakraLink> {
  return (
    <ChakraLink as={ReactRouterLink} _hover={{ textDecoration: "none" }} {...rest}>
      {children}
    </ChakraLink>
  );
}

export {
  AspectRatio,
  Avatar,
  Text,
  Heading,
  Modal,
  Box,
  HStack,
  Center,
  VStack,
  Flex,
  Grid,
  Input,
  Icon,
  Tooltip,
  Circle,
  Container,
  CircularProgress,
  Image,
} from "@chakra-ui/react";

export { default as ContactCard } from "./ContactCard";
export { default as Navbar } from "./Navbar";
export { default as PhotoUploader } from "./PhotoUploader";
