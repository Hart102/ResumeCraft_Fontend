import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {EducationInfo} from "../interface"


const initialState: EducationInfo = {
  schoolName: "",
  degree: "",
  fieldOfStudy: "",
  grade: "",
  startDate: "",
  endDate: "",
  activities: "",
  description: "",
};

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    updateEducationField: (state, action: PayloadAction<{ field: keyof EducationInfo; value: string }>) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateEducationField } = educationSlice.actions;
export default educationSlice.reducer;
