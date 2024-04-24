import { generateUserMock, renderWithProviders } from "@/utils/test-helper";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DeleteContact from "./";
import { PopupType } from "@/types/index.type";
import { DELETE_CONTACT_TEST_ID } from "./DeleteContact.const";

const data = generateUserMock();

describe("DeleteContact test", () => {
  beforeEach(() => {
    vi.mock("@/services/index", () => {
      return {
        useDeleteContact: () => ({
          mutateAsync: () => {},
        }),
      };
    });

    renderWithProviders(<DeleteContact />, {
      preloadedState: {
        popup: {
          type: PopupType.DELETE,
          data,
        },
      },
    });
  });

  it("should render DeleteContact with the correct data", () => {
    expect(screen.getByTestId(DELETE_CONTACT_TEST_ID.FULL_NAME)).toHaveTextContent(data.fullName);
  });

  it("should emit mutateAsync method", () => {
    expect(screen.getByTestId(DELETE_CONTACT_TEST_ID.DELETE_BUTTON));
  });
});
