import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContactInfo {
    email: string;
    phoneNumber: string;
    fax?: string;
    linkedInUrl?: string;
  }
  
  const initialState: ContactInfo = {
    email: "",
    phoneNumber: "",
    fax: "",
    linkedInUrl: "",
  };
  
  const contactInfoSlice = createSlice({
    name: "contactInfo",
    initialState,
    reducers: {
      updateContactField: (state, action: PayloadAction<{ field: keyof ContactInfo; value: string }>) => {
        state[action.payload.field] = action.payload.value;
      },
    },
  });
  
  export const { updateContactField } = contactInfoSlice.actions;
  export default contactInfoSlice.reducer;
  