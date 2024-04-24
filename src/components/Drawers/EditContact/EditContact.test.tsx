import { generateUserMock, renderWithProviders } from "@/utils/test-helper";
import { screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EditContact from "./";
import { PopupType } from "@/types/index.type";
import { EDIT_CONTACT_TEST_ID } from "./EditContact.const";

const data = generateUserMock();

describe("EditContact test", () => {
  it("should render with the correct initial data when in create mode", async () => {
    renderWithProviders(<EditContact />, {
      preloadedState: {
        popup: {
          type: PopupType.CREATE,
        },
      },
    });

    expect(screen.getByTestId(EDIT_CONTACT_TEST_ID.UPLOAD_PHOTO_FIELD)).toBeInTheDocument();
    expect(screen.getByTestId(EDIT_CONTACT_TEST_ID.FIRST_NAME_FIELD)).toHaveValue("");
    expect(screen.getByTestId(EDIT_CONTACT_TEST_ID.LAST_NAME_FIELD)).toHaveValue("");
    expect(screen.getByTestId(EDIT_CONTACT_TEST_ID.AGE_FIELD)).toHaveValue("0");
  });

  it("should render with the correct initial data when in update mode", async () => {
    renderWithProviders(<EditContact />, {
      preloadedState: {
        popup: {
          type: PopupType.UPDATE,
          data,
        },
      },
    });

    expect(screen.getByTestId(EDIT_CONTACT_TEST_ID.FIRST_NAME_FIELD)).toHaveValue(data.firstName);
    expect(screen.getByTestId(EDIT_CONTACT_TEST_ID.LAST_NAME_FIELD)).toHaveValue(data.lastName);
    expect(screen.getByTestId(EDIT_CONTACT_TEST_ID.AGE_FIELD)).toHaveValue(data.age.toString());
  });
});
