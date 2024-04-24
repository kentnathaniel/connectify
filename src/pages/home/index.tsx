import { Input, VStack, ContactCard, Flex, Tooltip, Icon, Navbar } from "@/components/index";
import { useGetContactQuery } from "@/services/index";
import { show } from "@/stores/popup";
import { PopupType } from "@/types/index.type";
import { useToken } from "@chakra-ui/react";
import { IconHeart, IconMoodPlus } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

function HomeNavbarMenu() {
  const dispatch = useDispatch();

  const onCreate = useCallback(() => {
    dispatch(
      show({
        type: PopupType.CREATE,
      })
    );
  }, [dispatch]);

  return (
    <Flex gap={4}>
      <Tooltip label="Add new contact">
        <Icon as={IconMoodPlus} w={8} h={8} color="blue.500" onClick={onCreate} cursor="pointer" />
      </Tooltip>
      <Tooltip label="View Favorites">
        <Icon as={IconHeart} w={8} h={8} color="pink.300" cursor="pointer" />
      </Tooltip>
    </Flex>
  );
}

function Home() {
  const { contacts } = useGetContactQuery();
  const [scrollbarColor] = useToken("colors", ["gray.200"]);

  const [searchValue, setSearchValue] = useState("");

  const _contacts = contacts?.filter((contact) => {
    const fullname = `${contact.firstName} ${contact.lastName}`;

    return fullname.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <>
      <Navbar menu={<HomeNavbarMenu />} />
      <Input
        placeholder="Search contact"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <VStack
        mt={4}
        alignItems="flex-start"
        width="100%"
        h="calc(100vh - 11rem)"
        overflowY="scroll"
        css={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: scrollbarColor,
            borderRadius: "24px",
          },
        }}
      >
        {_contacts?.map((contact) => (
          <ContactCard key={contact.id} data={contact} />
        ))}
      </VStack>
    </>
  );
}

export default Home;
