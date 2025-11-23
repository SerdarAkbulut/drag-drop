import { configureStore } from "@reduxjs/toolkit";
import { builderSlice } from "./builder/builderSlice";

export const store = configureStore({
  reducer: { builder: builderSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
