import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/index";
export default configureStore({
  reducer: {
    user: userSlice,
  },
});
