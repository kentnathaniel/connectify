import { ChakraProps, useToast } from "@chakra-ui/react";
import {
  IconAddressBook,
  IconCamera,
  IconHeart,
  IconHeartFilled,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import {
  Center,
  Flex,
  Icon,
  Link,
  Navbar,
  PhotoUploader,
  Text,
  Tooltip,
  Skeleton,
  VStack,
} from "@/components/index";
import { MESSAGES } from "@/constants/messages";
import { PATH } from "@/constants/path";
import { useToggleFavorite } from "@/hooks/index";
import { useGetDetailContactQuery, useUpdateContact } from "@/services/index";
import { show } from "@/stores/popup";
import { PopupType } from "@/types/index.type";

type Menu = {
  icon: typeof IconCamera;
  label: string;
  color?: ChakraProps["color"];
  onClick?: () => void;
};

function ContactDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { contact, isLoading: isLoadingGetContact } = useGetDetailContactQuery(id);
  const { mutateAsync: updateContact, isPending: isPendingUpdateContact } = useUpdateContact();
  const { onToggleFavorite, isFavorite } = useToggleFavorite(id ?? "");
  const toast = useToast();

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
      toast({
        title: MESSAGES.REQUEST_ERROR,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
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
      <Center
        w="100%"
        flexDirection="column"
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <PhotoUploader
          id="update-photo-uploader"
          photo={contact.photo}
          onChangePhoto={onChangePhoto}
          loading={isPendingUpdateContact}
        />

        <VStack mt={4}>
          {isLoadingGetContact ? (
            <>
              <Skeleton w={48} h={6} />
              <Skeleton w={16} h={4} mt={4} />
            </>
          ) : (
            <>
              <Text fontWeight="bold" fontSize="2xl">
                {contact.fullName}
              </Text>
              <Text color="gray.500">{contact.age} y.o</Text>
            </>
          )}
        </VStack>

        <Flex mt={8} direction={["column", "row"]}>
          {menu.map((v, idx) => (
            <Flex
              key={idx}
              alignItems="center"
              justifyContent="center"
              gap={4}
              cursor="pointer"
              onClick={v.onClick}
              p={2}
              direction={["row", "column"]}
              w={["auto", "40"]}
            >
              <Icon w={6} h={6} as={v.icon} color={v.color} />
              <Text fontWeight="bold" color={v.color}>
                {v.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Center>
    </>
  );
}

export default ContactDetail;
