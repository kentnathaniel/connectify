import { useToken } from "@chakra-ui/react";
import { IconHeart, IconHeartFilled, IconMoodPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EmptyStateContactImg from "@/assets/empty-state-contact.png";
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
  Skeleton,
  SkeletonCircle,
} from "@/components/index";
import { useGetContactQuery } from "@/services/index";
import { toggleFilterFavorite } from "@/stores/favorites";
import { RootState } from "@/stores/index";
import { show } from "@/stores/popup";
import { PopupType } from "@/types/index.type";

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

function ContactList({ searchValue }: { searchValue: string }) {
  const { contacts: _contacts, isLoading } = useGetContactQuery();

  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  const isViewFavorites = useSelector((state: RootState) => state.favorites.isFilterFavorites);

  const contacts = _contacts?.filter((contact) => {
    const fullname = `${contact.firstName} ${contact.lastName}`;
    const isFavorite = favoriteIds.includes(contact.id);

    return (
      fullname.toLowerCase().includes(searchValue.toLowerCase()) &&
      ((isFavorite && isViewFavorites) || !isViewFavorites)
    );
  });
  const isContactNotFound = contacts?.length === 0;

  if (isLoading)
    return (
      <VStack w="100%">
        {[...Array(6)].map((_, idx) => (
          <Flex key={idx} w="100%" alignItems="center" p={4} gap={4} overflowX="hidden">
            <SkeletonCircle size="12" flexShrink={0} />
            <Flex flexGrow={1} direction="column" gap={2} pr={4}>
              <Skeleton height={4} w="100%" />
              <Skeleton height={4} w="75%" />
            </Flex>
          </Flex>
        ))}
      </VStack>
    );

  if (isContactNotFound)
    return (
      <Center
        w="100%"
        flexDirection="column"
        mt={12}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Image src={EmptyStateContactImg} />
        <Text fontSize="xl" mt={8} fontWeight="bold">
          No contacts match your criteria.
        </Text>
        <Text mt={2}>Let&apos;s try with another search criteria</Text>
      </Center>
    );

  return (
    <>
      {contacts?.map((contact) => (
        <ContactCard key={contact.id} data={contact} />
      ))}
    </>
  );
}

function Home() {
  const [scrollbarColor] = useToken("colors", ["gray.200"]);
  const [searchValue, setSearchValue] = useState("");

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
        <ContactList searchValue={searchValue} />
      </VStack>
    </>
  );
}

export default Home;
