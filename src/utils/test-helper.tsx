import React, { PropsWithChildren } from "react";
import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { faker } from "@faker-js/faker";

import { RootState, getTestingStore, persistor } from "../stores";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFullName } from "./string-helper";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof getTestingStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = getTestingStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

const getSingleMock = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    fullName: getFullName(firstName, lastName),
    firstName,
    lastName,
    age: faker.number.int(),
    photo: "https://picsum.photos/200",
  };
};

export function generateUserMock(): ReturnType<typeof getSingleMock>;
export function generateUserMock(count: number): ReturnType<typeof getSingleMock>[];
export function generateUserMock(count?: number) {
  if (!count) return getSingleMock();

  return [...Array(count)].map(() => getSingleMock());
}

export function generateDummyFile(args?: { name?: string; type?: string }) {
  const { name, type } = args || {};

  const file = new File([""], name ?? "dummy.jpg", { type: type ?? "image/jpeg" });

  return file;
}
