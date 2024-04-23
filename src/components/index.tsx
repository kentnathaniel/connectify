import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

export function Link({ children, onClick, ...rest }: LinkProps): ReturnType<typeof ChakraLink> {
  return (
    <ChakraLink
      _hover={{ textDecoration: "none" }}
      onClick={(e) => {
        e.preventDefault;
        onClick?.(e);
      }}
      {...rest}
    >
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
} from "@chakra-ui/react";

export { default as ContactCard } from "./ContactCard";
export { default as Navbar } from "./Navbar";
