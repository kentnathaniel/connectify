import { Flex, Heading, Icon, Tooltip } from "@/components/index";
import { show } from "@/stores/popup";
import { PopupType } from "@/types/index.type";
import { IconHeart, IconMoodPlus } from "@tabler/icons-react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();

  const onCreate = useCallback(() => {
    dispatch(
      show({
        type: PopupType.CREATE,
      })
    );
  }, [dispatch]);

  return (
    <Flex pt={4} mx="auto" justifyContent="space-between">
      <Heading fontSize="xl">Connectify</Heading>
      <Flex gap={4}>
        <Tooltip label="Add new contact">
          <Icon
            as={IconMoodPlus}
            w={8}
            h={8}
            color="blue.500"
            onClick={onCreate}
            cursor="pointer"
          />
        </Tooltip>
        <Tooltip label="View Favorites">
          <Icon as={IconHeart} w={8} h={8} color="pink.300" cursor="pointer" />
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default Navbar;
