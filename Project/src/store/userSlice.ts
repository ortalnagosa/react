import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Tsignup } from "../types/signupType";


const initialState = {
  user: null as Tsignup | null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, data) => {
      state.user = data.payload;
      toast.success("כניסה מוצלחת!!");
    },
    logout: (state) => {
      state.user = null;
      toast.success("התנתק בהצלחה");
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
      toast.success("הפרופיל עודכן!");
    },
    setUser: (state, action) => {
      state.user = action.payload;
  },
}});

export const userActions = userSlice.actions; 
export default userSlice.reducer; 
