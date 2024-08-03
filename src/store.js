import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./app/components/todo/todoSlice";
import travelReducer from "./app/components/Itinerary/traveSlice";
import userReducers from "./app/Authentication/userAuthSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    travel: travelReducer,
    user: userReducers,
  },
});

export default store;
