import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/index";
import { PopupType } from "@/types/index.type";
import { hide } from "@/stores/popup";
import { useDeleteContact } from "@/services/index";

function ModalDeleteContact() {
  const { mutateAsync: deleteContact } = useDeleteContact();

  const show = useSelector((state: RootState) => state.popup.type === PopupType.DELETE);
  const id = useSelector((state: RootState) => state.popup.id);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(hide());
  };

  const onDelete = async () => {
    try {
      if (id) {
        await deleteContact(id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      onClose();
    }
  };

  return (
    <Drawer isOpen={show} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent w="container.md" mx="auto" boxShadow="2xl">
        <DrawerCloseButton />
        <DrawerHeader>Are you sure to delete this contact?</DrawerHeader>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onDelete}>
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ModalDeleteContact;
