import { Center, Flex, Icon, Link, Navbar, PhotoUploader, Text, Tooltip } from "@/components/index";
import { PATH } from "@/constants/path";
import { useToggleFavorite } from "@/hooks/index";
import { useGetDetailContactQuery, useUpdateContact } from "@/services/index";
import { toggleFavorite } from "@/stores/favorites";
import { show } from "@/stores/popup";
import { PopupType } from "@/types/index.type";
import { ChakraProps, HStack } from "@chakra-ui/react";
import {
  IconAddressBook,
  IconCamera,
  IconHeart,
  IconHeartFilled,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

type Menu = {
  icon: typeof IconCamera;
  label: string;
  color?: ChakraProps["color"];
  onClick?: () => void;
};

function ContactDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { contact } = useGetDetailContactQuery(id);
  const { mutateAsync: updateContact, isPending: isPendingUpdateContact } = useUpdateContact();
  const { onToggleFavorite, isFavorite } = useToggleFavorite(id ?? "");

  const onDelete = useCallback(() => {
    dispatch(
      show({
        type: PopupType.DELETE,
        data: contact,
      })
    );
  }, [dispatch, contact]);

  const onEdit = useCallback(() => {
    dispatch(
      show({
        type: PopupType.UPDATE,
        data: contact,
      })
    );
  }, [dispatch, contact]);

  const menu: Menu[] = useMemo(
    () => [
      {
        icon: IconPencil,
        label: "Edit Contact",
        onClick: () => onEdit(),
      },
      {
        icon: isFavorite ? IconHeartFilled : IconHeart,
        label: isFavorite ? "Unfavorite" : "Save as Favorite",
        color: "pink.300",
        onClick: () => onToggleFavorite(),
      },
      {
        icon: IconTrash,
        label: "Delete contact",
        color: "red.500",
        onClick: () => onDelete(),
      },
    ],
    [onDelete, onEdit, isFavorite, onToggleFavorite]
  );

  const onChangePhoto = async (photo: string) => {
    try {
      if (!id) {
        throw new Error("Contact ID is not found");
      }

      await updateContact({
        contactId: id,
        payload: { photo },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!id) return <Navigate to={PATH.HOME} replace={true} />;

  return (
    <>
      <Navbar
        menu={
          <Link to={PATH.HOME}>
            <Tooltip label="View Contacts">
              <Icon as={IconAddressBook} cursor="pointer" color="blue.700" w={8} h={8} />
            </Tooltip>
          </Link>
        }
      />
      <Center w="100%" flexDirection="column">
        <PhotoUploader
          id="update-photo-uploader"
          photo={contact.photo}
          onChangePhoto={onChangePhoto}
          loading={isPendingUpdateContact}
        />
        <Text fontWeight="bold" fontSize="2xl" mt={4}>
          {contact.fullName}
        </Text>
        <Text color="gray.500" mt={2}>
          {contact.age} y.o
        </Text>
        <HStack mt={8}>
          {menu.map((v, idx) => (
            <Flex
              key={idx}
              alignItems="center"
              gap={4}
              cursor="pointer"
              onClick={v.onClick}
              p={2}
              flexDirection="column"
              w="40"
            >
              <Icon w={6} h={6} as={v.icon} color={v.color} />
              <Text fontWeight="bold" color={v.color}>
                {v.label}
              </Text>
            </Flex>
          ))}
        </HStack>
      </Center>
    </>
  );
}

export default ContactDetail;
