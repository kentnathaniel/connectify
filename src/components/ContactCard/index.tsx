import { IconTrash, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { generatePath } from "react-router-dom";

import { Avatar, Flex, Text, Icon, Tooltip, Link } from "@/components/index";
import { PATH } from "@/constants/path";
import { useToggleFavorite } from "@/hooks/index";
import { show } from "@/stores/popup";
import { Contact, PopupType } from "@/types/index.type";



import { CONTACT_CARD_TEST_ID } from "./ContactCard.const";



type Props = {
  data: Contact;
};

function ContactCard(props: Props) {
  const {
    data: { id, age, photo, fullName },
  } = props;

  const dispatch = useDispatch();
  const { onToggleFavorite, isFavorite } = useToggleFavorite(id ?? "");

  const onDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();

    dispatch(
      show({
        type: PopupType.DELETE,
        data: props.data,
      })
    );
  };

  return (
    <Link w="100%" to={generatePath(PATH.CONTACT, { id })}>
      <Flex
        alignItems="center"
        width="100%"
        p={4}
        _hover={{
          cursor: "pointer",
          background: "gray.50",
          color: "blue.500",
        }}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Avatar size="md" src={photo} />
        <Flex px={4} alignItems="center" width="100%">
          <Flex direction="column">
            <Text fontWeight="bold" data-testid={CONTACT_CARD_TEST_ID.FULL_NAME}>
              {fullName}
            </Text>
            <Text color="gray.500" data-testid={CONTACT_CARD_TEST_ID.AGE}>
              {age} y.o
            </Text>
          </Flex>
          <Flex ml="auto" gap={4}>
            <Tooltip label="Save to favorites" aria-label="favorite-tooltip">
              <Icon
                as={isFavorite ? IconHeartFilled : IconHeart}
                w={6}
                h={6}
                color="pink.300"
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite();
                }}
              />
            </Tooltip>
            <Tooltip label="Delete contact" aria-label="delete-tooltip">
              <Icon
                as={IconTrash}
                w={6}
                h={6}
                color="red.500"
                onClick={onDelete}
                data-testid={CONTACT_CARD_TEST_ID.DELETE_ICON}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default ContactCard;
