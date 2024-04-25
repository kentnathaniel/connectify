import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Flex, Text } from "@/components/index";
import { MESSAGES } from "@/constants/messages";
import { useDeleteContact } from "@/services/index";
import { RootState } from "@/stores/index";
import { hide } from "@/stores/popup";
import { PopupType } from "@/types/index.type";

import { DELETE_CONTACT_TEST_ID } from "./DeleteContact.const";


function ModalDeleteContact() {
  const { mutateAsync: deleteContact } = useDeleteContact();

  const show = useSelector((state: RootState) => state.popup.type === PopupType.DELETE);
  const data = useSelector((state: RootState) => state.popup.data);
  const dispatch = useDispatch();
  const toast = useToast();

  const onClose = () => {
    dispatch(hide());
  };

  const onDelete = async () => {
    try {
      if (data?.id) {
        await deleteContact(data.id);
      }
    } catch (e) {
      toast({
        title: MESSAGES.REQUEST_ERROR,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  return (
    <Drawer isOpen={show} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent w="container.md" mx="auto" boxShadow="2xl">
        <DrawerCloseButton />
        <DrawerHeader fontSize="xl">Are you sure to delete this contact?</DrawerHeader>
        <DrawerBody fontSize="sm">
          <Flex alignItems="center" gap={2} mb={4}>
            <Avatar src={data?.photo} w={8} h={8} />
            <Text fontWeight="semibold" data-testid={DELETE_CONTACT_TEST_ID.FULL_NAME}>
              {data?.fullName}
            </Text>
          </Flex>
          This action cannot be undone. This will permanently delete the contact.
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={onDelete}
            data-testid={DELETE_CONTACT_TEST_ID.DELETE_BUTTON}
          >
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ModalDeleteContact;
