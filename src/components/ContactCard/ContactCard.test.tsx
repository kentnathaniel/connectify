import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import ContactCard from ".";
import { generateUserMock, renderWithProviders } from "@/utils/test-helper";
import "@testing-library/jest-dom/vitest";
import { CONTACT_CARD_TEST_ID } from "./ContactCard.const";

const data = generateUserMock();

describe("ContactCard test", () => {
  it("should render ContactCard with the correct data", () => {
    renderWithProviders(<ContactCard data={data} />);

    expect(screen.getByTestId(CONTACT_CARD_TEST_ID.FULL_NAME)).toHaveTextContent(data.fullName);
    expect(screen.getByTestId(CONTACT_CARD_TEST_ID.AGE)).toHaveTextContent(`${data.age} y.o`);
  });
});
