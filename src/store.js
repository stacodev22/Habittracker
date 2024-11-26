import { configureStore } from "@reduxjs/toolkit";

import { habitsReducer } from "./Redux/HabitsToolkit.js";

import { userReducer } from "./Redux/UserToolKit.js";

export const store = configureStore({
  reducer: { userReducer, habitsReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
