import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  occupation: string;
  profilePhoto?: File | null;
}

const initialState: UserInfo = {
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  occupation: "",
  profilePhoto: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateField: <T extends keyof Omit<UserInfo, "profilePhoto">>(
      state: UserInfo,
      action: PayloadAction<{ field: T; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    updateFile: (state: UserInfo, action: PayloadAction<File | null>) => {
      state.profilePhoto = action.payload;
    },
  },
});

export const { updateField, updateFile } = userInfoSlice.actions;
export default userInfoSlice.reducer;
