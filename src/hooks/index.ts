import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { toggleFavorite } from "@/stores/favorites";

import { RootState } from "../stores";

export const useToggleFavorite = (id: string) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => state.favorites.ids.includes(id));

  const onToggleFavorite = () => {
    toast({
      id,
      title: isFavorite ? "Successfully removed from favorite" : "Successfully added to Favorite",
      status: "success",
      duration: 1500,
      isClosable: true,
    });

    dispatch(toggleFavorite(id));
  };

  return { onToggleFavorite, isFavorite };
};
