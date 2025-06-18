import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import searchSlice from "./searchSlice";
import loadingSlice from "./loadingSlice";


const store = configureStore({
  reducer: { userSlice, searchSlice, loadingSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const RootReducer = combineReducers({ userSlice, searchSlice, loadingSlice });
export type TRootState = ReturnType<typeof RootReducer>; 
export default store;