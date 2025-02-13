// store.ts
import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./personalInfoSlice";
import contactInfoReducer from "./contactInfoSlice"
import addressInfoReducer from "./addressSlice"
import educationReducer from "./educationSlice"

const store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    contactInfo: contactInfoReducer,
    addressInfo: addressInfoReducer,
    educationInfo: educationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
