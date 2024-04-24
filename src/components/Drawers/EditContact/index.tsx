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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/index";
import { PopupType } from "@/types/index.type";
import { hide } from "@/stores/popup";
import { useCreateContact, useGetDetailContactQuery, useUpdateContact } from "@/services/index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { PhotoUploader } from "../..";

const editSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
  age: z
    .number({ invalid_type_error: "Age must be greater than 0" })
    .min(0, { message: "Age must be greater than 0" }),
  photo: z.string().optional(),
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
  } = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
  });

  const type = useSelector((state: RootState) => state.popup.type);
  const id = useSelector((state: RootState) => state.popup.id);
  const dispatch = useDispatch();
  const { contact, isFetched: contactIsFetched } = useGetDetailContactQuery(id);

  const photo = watch("photo");

  const onClose = () => {
    dispatch(hide());
  };

  const onSubmit = async (value: EditSchema) => {
    try {
      if (id) {
        await updateContact({
          contactId: id,
          payload: { ...value, photo: contact.photo },
        });
      } else {
        createContact(value);
      }
    } catch (e) {
      console.error(e);
    } finally {
      onClose();
      reset();
    }
  };

  useEffect(() => {
    register("photo");

    if (type === PopupType.UPDATE && contactIsFetched) {
      reset({
        firstName: contact.firstName,
        lastName: contact.lastName,
        age: contact.age,
        photo: contact.photo,
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
  }, [type, contactIsFetched]);

  return (
    <Drawer
      isOpen={type === PopupType.CREATE || type === PopupType.UPDATE}
      placement="bottom"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent w="container.md" mx="auto" boxShadow="2xl">
        <DrawerCloseButton />
        <DrawerHeader>{type === PopupType.CREATE ? "Create" : "Edit"} Contact</DrawerHeader>
        <DrawerBody>
          <form>
            <VStack gap={4}>
              {type === PopupType.CREATE && (
                <PhotoUploader
                  id="create-photo-uploader"
                  photo={photo}
                  onChangePhoto={(photo) => setValue("photo", photo)}
                />
              )}
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel>First Name</FormLabel>
                <Input type="text" placeholder="Enter your first name" {...register("firstName")} />
                <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" placeholder="Enter your last name" {...register("lastName")} />
                <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.age}>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your age"
                  {...register("age", {
                    valueAsNumber: true,
                  })}
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
