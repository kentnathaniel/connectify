import { useToast } from "@chakra-ui/react";
import { IconCamera } from "@tabler/icons-react";
import { ChangeEvent } from "react";

import { Avatar, Center, Circle, CircularProgress, Flex, Icon, Input } from "@/components/index";
import { MESSAGES } from "@/constants/messages";

type Props = Partial<{
  photo: string;
  onChangePhoto: (photo: string) => void;
  loading: boolean;
}> & { id: string };

function PhotoUploader(props: Props) {
  const { photo, onChangePhoto, loading, id } = props;

  const toast = useToast();

  const changePictureHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const result = e.target?.result as string;
          onChangePhoto?.(result);
        };

        reader.readAsDataURL(file);
      }
    } catch (err) {
      toast({
        title: MESSAGES.REQUEST_ERROR,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <Flex position="relative" w="fit-content">
      <Avatar size="2xl" src={photo} />
      {loading && (
        <Center position="absolute" width="100%" height="100%">
          <Center
            position="absolute"
            width="100%"
            height="100%"
            bgColor="gray.300"
            borderRadius="50%"
            opacity="0.7"
          />
          <CircularProgress isIndeterminate color="blue.500" />
        </Center>
      )}
      <Input
        data-testid={id}
        id={id}
        type="file"
        w="100%"
        h="100%"
        display="none"
        accept=".jpg,.png,.jpeg"
        onChange={changePictureHandler}
      />
      <label htmlFor={id}>
        <Circle bg="blue.500" p={2} position="absolute" bottom="0" right="0" cursor="pointer">
          <Icon as={IconCamera} w={6} h={6} color="white" />
        </Circle>
      </label>
    </Flex>
  );
}

export default PhotoUploader;
