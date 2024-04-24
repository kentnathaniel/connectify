import { generateDummyFile, generateUserMock, renderWithProviders } from "@/utils/test-helper";
import { screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { PHOTO_UPLOADER_TEST_ID } from "./PhotoUploader.const";
import PhotoUploader from "./";
import userEvent from "@testing-library/user-event";

const data = generateUserMock();

describe("DeleteContact test", () => {
  it("should render PhotoUploader with the correct data", () => {
    const onChangePhoto = vi.fn();

    renderWithProviders(
      <PhotoUploader
        id={PHOTO_UPLOADER_TEST_ID.UPLOADER}
        photo={data.photo}
        onChangePhoto={onChangePhoto}
      />
    );

    const file = generateDummyFile();
    const uploader = screen.getByTestId(PHOTO_UPLOADER_TEST_ID.UPLOADER);

    userEvent.upload(uploader, file);
  });
});
