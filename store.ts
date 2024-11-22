import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userReducer from "./reducers/userReducer";
import genericSlice from "./reducers/genericReducer";

const persistConfig = {
    key: 'smashed',
    storage: AsyncStorage,
    blacklist: ['generic']
};


// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
    reducer: {
        user: persistedReducer,
        generic: genericSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
