import { Input, VStack, ContactCard } from "@/components/index";
import { useGetContactQuery } from "@/services/index";
import { useToken } from "@chakra-ui/react";
import { useState } from "react";

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
