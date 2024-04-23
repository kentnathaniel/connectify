import { Avatar, Center, Circle, Flex, Icon, Input, Text, VStack } from "@/components/index";

import { useGetDetailContactQuery } from "@/services/index";
import { show } from "@/stores/popup";
import { PopupType } from "@/types/index.type";
import { ChakraProps, HStack } from "@chakra-ui/react";
import { IconCamera, IconHeart, IconPencil, IconTrash } from "@tabler/icons-react";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function ContactDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { contact } = useGetDetailContactQuery(id);

  const onDelete = useCallback(() => {
    dispatch(
      show({
        type: PopupType.DELETE,
        id,
      })
    );
  }, [dispatch, id]);

  const onEdit = useCallback(() => {
    dispatch(
      show({
        type: PopupType.UPDATE,
        id,
      })
    );
  }, [dispatch, id]);

  type Menu = {
    icon: typeof IconCamera;
    label: string;
    color?: ChakraProps["color"];
    onClick?: () => void;
  };

  const menu: Menu[] = useMemo(
    () => [
      {
        icon: IconPencil,
        label: "Edit Contact",
        onClick: () => onEdit(),
      },
      {
        icon: IconHeart,
        label: "Save as Favorite",
        color: "pink.300",
      },
      {
        icon: IconTrash,
        label: "Delete contact",
        color: "red.500",
        onClick: () => onDelete(),
      },
    ],
    [onDelete, onEdit]
  );

  return (
    <>
      <Center w="100%" flexDirection="column">
        <Flex position="relative" w="fit-content">
          <Avatar size="2xl" src={contact?.photo} />
          <Circle bg="blue.500" p={2} position="absolute" bottom="0" right="0">
            <Input type="file" w="100%" h="100%" display="none" />
            <Icon as={IconCamera} w={6} h={6} color="white" />
          </Circle>
        </Flex>
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
