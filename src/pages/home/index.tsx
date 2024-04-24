import {
  Input,
  VStack,
  ContactCard,
  Flex,
  Tooltip,
  Icon,
  Navbar,
  Image,
  Center,
  Text,
} from "@/components/index";
import { useGetContactQuery } from "@/services/index";
import { toggleFilterFavorite } from "@/stores/favorites";
import { RootState } from "@/stores/index";
import { show } from "@/stores/popup";
import { PopupType } from "@/types/index.type";
import { useToken } from "@chakra-ui/react";
import { IconHeart, IconHeartFilled, IconMoodPlus } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyStateContactImg from "@/assets/empty-state-contact.png";

function HomeNavbarMenu() {
  const dispatch = useDispatch();
  const isViewFavorites = useSelector((state: RootState) => state.favorites.isFilterFavorites);

  const onCreate = useCallback(() => {
    dispatch(
      show({
        type: PopupType.CREATE,
      })
    );
  }, [dispatch]);

  const onToggleViewFavorites = useCallback(() => {
    dispatch(toggleFilterFavorite());
  }, [dispatch]);

  return (
    <Flex gap={4}>
      <Tooltip label="Add new contact">
        <Icon as={IconMoodPlus} w={8} h={8} color="blue.500" onClick={onCreate} cursor="pointer" />
      </Tooltip>
      <Tooltip label="View Favorites">
        <Icon
          as={isViewFavorites ? IconHeartFilled : IconHeart}
          w={8}
          h={8}
          color="pink.300"
          cursor="pointer"
          onClick={onToggleViewFavorites}
        />
      </Tooltip>
    </Flex>
  );
}

function Home() {
  const { contacts: _contacts } = useGetContactQuery();
  const [scrollbarColor] = useToken("colors", ["gray.200"]);
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const isViewFavorites = useSelector((state: RootState) => state.favorites.isFilterFavorites);

  const [searchValue, setSearchValue] = useState("");

  const contacts = _contacts?.filter((contact) => {
    const fullname = `${contact.firstName} ${contact.lastName}`;
    const isFavorite = favoriteIds.includes(contact.id);

    return (
      fullname.toLowerCase().includes(searchValue.toLowerCase()) &&
      ((isFavorite && isViewFavorites) || !isViewFavorites)
    );
  });

  const isContactNotFound = contacts?.length === 0;

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
        {isContactNotFound ? (
          <Center w="100%" flexDirection="column" mt={12}>
            <Image src={EmptyStateContactImg} />
            <Text fontSize="xl" mt={8} fontWeight="bold">
              No contacts match your criteria.
            </Text>
            <Text mt={2}>Let&apos;s try with another search criteria</Text>
          </Center>
        ) : (
          <>
            {contacts?.map((contact) => (
              <ContactCard key={contact.id} data={contact} />
            ))}
          </>
        )}
      </VStack>
    </>
  );
}

export default Home;
