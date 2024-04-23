import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PopupType } from "@/types/index.type";

type PopupState = {
  type: PopupType | null;
  id?: string;
};

const initialState: PopupState = {
  type: null,
};

export const popupSlice = createSlice({
  name: "popup-slice",
  initialState,
  reducers: {
    show: (state, action: PayloadAction<PopupState>) => {
      state.type = action.payload.type;

      switch (action.payload.type) {
        case PopupType.DELETE:
        case PopupType.UPDATE:
          state.id = action.payload.id;
          break;
        case PopupType.CREATE:
        default:
          break;
      }
    },
    hide: (state) => {
      state.type = null;
      state.id = undefined;
    },
  },
});

export const { show, hide } = popupSlice.actions;

export default popupSlice.reducer;
