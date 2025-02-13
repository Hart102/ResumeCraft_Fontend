import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {AddressInfo} from "../interface"

const initialState: AddressInfo = {
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddressField: (state, action: PayloadAction<{ field: keyof AddressInfo; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateAddressField } = addressSlice.actions;
export default addressSlice.reducer;
