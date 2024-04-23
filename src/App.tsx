import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, ChakraProvider, Container, VStack, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Favorites, ContactDetail } from "./pages/index";
import { PATH } from "./constants";
import { Navbar } from "./components";
import ModalDeleteContact from "./components/Drawers/DeleteContact";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./stores";
import ModalEditContact from "./components/Drawers/EditContact";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: PATH.FAVORITES,
    element: <Favorites />,
  },
  {
    path: PATH.CONTACT,
    element: <ContactDetail />,
  },
  {
    path: PATH.HOME,
    element: <Home />,
  },
]);

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Box bg="gray.700" w="100vw" h="100vh" overflow="hidden">
            <Container bg="white" py={2} px={4} h="100vh" maxW="container.md">
              <Navbar />
              <VStack py={8} flexDirection="column" mx="auto" alignItems="flex-start">
                <RouterProvider router={router} />
              </VStack>
            </Container>
          </Box>
          <ModalEditContact />
          <ModalDeleteContact />
        </ChakraProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
