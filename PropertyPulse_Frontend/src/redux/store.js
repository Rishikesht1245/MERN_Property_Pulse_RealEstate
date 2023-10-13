import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import adminReducer from "./admin/adminSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

//creating the root reducer
const rootReducer = combineReducers({ user: userReducer, admin: adminReducer });

// configuring the persist
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// create the persisted reducer from persistConfig and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
