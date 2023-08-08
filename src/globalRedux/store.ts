//store.jsx

"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import localeReducer from "./features/sidebar/localeSlice";
import ratingReducer from "./features/sidebar/ratingSlice";
import themeModeReducer from "./features/sidebar/themeModeSlice";
import authReducer from "./features/auth/authSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  locale: localeReducer,
  rating: ratingReducer,
  themeMode: themeModeReducer,
  auth: authReducer,
  //add all your reducers here
},);

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],  //add here all the actions that you don't want to be persisted
      },
    }),
});

export const persistor = persistStore(store);

 // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch