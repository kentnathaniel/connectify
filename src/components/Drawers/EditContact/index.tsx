import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import { MESSAGES } from "@/constants/messages";
import { useCreateContact, useUpdateContact } from "@/services/index";
import { RootState } from "@/stores/index";
import { hide } from "@/stores/popup";
import { PopupType } from "@/types/index.type";

import { PhotoUploader } from "../..";

import { EDIT_CONTACT_TEST_ID } from "./EditContact.const";

const editSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  age: z
    .number({ invalid_type_error: "Age must be greater than 0" })
    .min(1, { message: "Age must be greater than 0" }),
  photo: z.string().min(1, { message: "Photo is required" }),
});

type EditSchema = z.infer<typeof editSchema>;

function ModalEditContact() {
  const { mutateAsync: updateContact } = useUpdateContact();
  const { mutateAsync: createContact } = useCreateContact();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
    clearErrors,
  } = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
  });

  const type = useSelector((state: RootState) => state.popup.type);
  const data = useSelector((state: RootState) => state.popup.data);
  const dispatch = useDispatch();
  const toast = useToast();

  const photo = watch("photo");
  const isEditPopup = type === PopupType.UPDATE;
  const isCreatePopup = type === PopupType.CREATE;

  const onClose = () => {
    dispatch(hide());
  };

  const onSubmit = async (value: EditSchema) => {
    try {
      if (data?.id) {
        await updateContact({
          contactId: data.id,
          payload: { ...value, photo: data.photo },
        });
      } else {
        await createContact(value);
      }

      toast({
        title: `Successfully ${isEditPopup ? "modified" : "created"} the contact`,
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: MESSAGES.REQUEST_ERROR,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    } finally {
      onClose();
      reset();
    }
  };

  useEffect(() => {
    register("photo");

    if (isEditPopup && !!data) {
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        photo: data.photo,
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        age: 0,
        photo: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, data]);

  return (
    <Drawer isOpen={isCreatePopup || isEditPopup} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent w="container.md" mx="auto" boxShadow="2xl">
        <DrawerCloseButton />
        <DrawerHeader>{isCreatePopup ? "Create" : "Edit"} Contact</DrawerHeader>
        <DrawerBody>
          <form>
            <VStack gap={4}>
              {isCreatePopup && (
                <FormControl isInvalid={!!errors.photo}>
                  <FormLabel>Profile Picture</FormLabel>
                  <PhotoUploader
                    id={EDIT_CONTACT_TEST_ID.UPLOAD_PHOTO_FIELD}
                    photo={photo}
                    onChangePhoto={(photo) => {
                      setValue("photo", photo);
                      clearErrors("photo");
                    }}
                  />
                  <FormErrorMessage>{errors.photo && errors.photo.message}</FormErrorMessage>
                </FormControl>
              )}

              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel>First Name</FormLabel>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      data-testid={EDIT_CONTACT_TEST_ID.FIRST_NAME_FIELD}
                      {...field}
                    />
                  )}
                  name="firstName"
                />
                <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter your last name"
                      data-testid={EDIT_CONTACT_TEST_ID.LAST_NAME_FIELD}
                      {...field}
                    />
                  )}
                  name="lastName"
                />
                <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.age}>
                <FormLabel>Age</FormLabel>
                <Controller
                  control={control}
                  render={({ field: { onChange, ...rest } }) => (
                    <Input
                      placeholder="Enter your age"
                      data-testid={EDIT_CONTACT_TEST_ID.AGE_FIELD}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);

                        onChange(value ? value : 0);
                      }}
                      {...rest}
                    />
                  )}
                  name="age"
                />
                <FormErrorMessage>{errors.age && errors.age.message}</FormErrorMessage>
              </FormControl>
            </VStack>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ModalEditContact;
