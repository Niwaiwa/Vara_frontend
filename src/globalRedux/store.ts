//store.jsx

"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import localeReducer from "./features/sidebar/localeSlice";
import ratingReducer from "./features/sidebar/ratingSlice";
import themeModeReducer from "./features/sidebar/themeModeSlice";
import authReducer from "./features/auth/authSlice";


const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  locale: localeReducer,
  rating: ratingReducer,
  themeMode: themeModeReducer,
  auth: authReducer,
  //add all your reducers here
},);

export const store = configureStore({
  reducer: rootReducer,
});

 // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch