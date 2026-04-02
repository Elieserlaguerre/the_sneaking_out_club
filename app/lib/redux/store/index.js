"use client";

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { multiTenantApi } from "../data-fetching/root-api";
import viewMailSlice from "../reducers/viewMailSlice";

const rootReducer = combineReducers({
	viewMailSlice
});

// ✅ Lazy load the `storage` only in the browser
let persistedReducer = rootReducer;
if (typeof window !== "undefined") {
	const createWebStorage = () => {
		try {
			const storage = require("redux-persist/lib/storage").default;
			return storage;
		} catch (e) {
			// fallback to a no-op if localStorage not available
			return {
				getItem: () => Promise.resolve(null),
				setItem: () => Promise.resolve(),
				removeItem: () => Promise.resolve()
			};
		}
	};

	const storage = createWebStorage();
	const persistConfig = { key: "root", storage };
	persistedReducer = persistReducer(persistConfig, rootReducer);
}

const store = configureStore({
	reducer: {
		persistedData: persistedReducer,
		[multiTenantApi.reducerPath]: multiTenantApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		}).concat(multiTenantApi.middleware)
});

setupListeners(store.dispatch);

export default store;
