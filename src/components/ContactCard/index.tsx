import { Avatar, Flex, Text, Icon, Tooltip, Link } from "@/components/index";
import { Contact, PopupType } from "@/types/index.type";
import { IconTrash, IconHeart } from "@tabler/icons-react";
import { PATH } from "@/constants/path";
import { generatePath } from "react-router-dom";
import { useDispatch } from "react-redux";
import { show } from "@/stores/popup";
import { CONTACT_CARD_TEST_ID } from "./ContactCard.const";

type Props = {
  data: Contact;
};

function ContactCard(props: Props) {
  const {
    data: { id, age, photo, fullName },
  } = props;

  const dispatch = useDispatch();

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
    <Link w="100%" href={generatePath(PATH.CONTACT, { id })}>
      <Flex
        alignItems="center"
        width="100%"
        p={4}
        _hover={{
          cursor: "pointer",
          background: "gray.50",
          color: "blue.500",
        }}
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
              <Icon as={IconHeart} w={6} h={6} color="pink.300" />
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
