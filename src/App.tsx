import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, ContactDetail } from "./pages/index";
import { PATH } from "./constants";
import ModalDeleteContact from "./components/Drawers/DeleteContact";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./stores";
import ModalEditContact from "./components/Drawers/EditContact";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

const router = createBrowserRouter([
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
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Box bg="gray.700" w="100vw" h="100vh" overflow="hidden">
              <Container bg="white" py={2} px={4} h="100vh" maxW="container.md">
                <RouterProvider router={router} />
              </Container>
            </Box>
            <ModalEditContact />
            <ModalDeleteContact />
          </ChakraProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
